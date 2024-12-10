import express from 'express';
import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { WebSocketServer } from 'ws';
import { useServer } from 'graphql-ws/lib/use/ws';
import { createServer } from 'http';
import { PrismaClient } from '@prisma/client';
import * as Sentry from '@sentry/node';
import rateLimit from 'express-rate-limit';
import { typeDefs } from './schema/typeDefs';
import { resolvers } from './schema/resolvers';
import { authenticateUser } from './middleware/auth';
import { handleError } from './utils/errors';
import { checkRateLimit } from './utils/rateLimiter';

// Initialize Sentry
Sentry.init({
  dsn: process.env.SENTRY_DSN,
  environment: process.env.NODE_ENV,
});

const prisma = new PrismaClient();
const app = express();

// Rate limiting middleware
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
});

app.use(limiter);
app.use(Sentry.Handlers.requestHandler());
app.use(express.json());

async function startServer() {
  const httpServer = createServer(app);

  // WebSocket server for subscriptions
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/graphql',
  });

  const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: (error) => {
      const formattedError = handleError(error.originalError || error);
      return {
        message: formattedError.message,
        code: formattedError instanceof Error ? formattedError.name : 'INTERNAL_SERVER_ERROR',
        locations: error.locations,
        path: error.path,
      };
    },
  });

  await server.start();

  // WebSocket subscription server
  useServer(
    {
      schema: server.schema,
      context: async (ctx) => {
        const token = ctx.connectionParams?.token as string;
        const user = token ? await authenticateUser(token) : null;
        return { user, prisma };
      },
      onConnect: async (ctx) => {
        const token = ctx.connectionParams?.token as string;
        const user = token ? await authenticateUser(token) : null;
        
        if (!user) {
          throw new Error('Unauthorized');
        }

        const canConnect = await checkRateLimit(user.id);
        if (!canConnect) {
          throw new Error('Too many connections');
        }

        return true;
      },
    },
    wsServer
  );

  // GraphQL middleware
  app.use(
    '/graphql',
    expressMiddleware(server, {
      context: async ({ req }) => {
        const token = req.headers.authorization?.split(' ')[1];
        const user = token ? await authenticateUser(token) : null;
        return { user, prisma };
      },
    })
  );

  app.use(Sentry.Handlers.errorHandler());

  const PORT = process.env.PORT || 4000;
  httpServer.listen(PORT, () => {
    console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
    console.log(`🔌 WebSocket server ready at ws://localhost:${PORT}/graphql`);
  });
}

startServer().catch((error) => {
  console.error('Failed to start server:', error);
  Sentry.captureException(error);
  process.exit(1);
});