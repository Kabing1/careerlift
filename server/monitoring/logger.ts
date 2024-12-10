import winston from 'winston';
import * as Sentry from '@sentry/node';

const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  defaultMeta: { service: 'careerlift-api' },
  transports: [
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' })
  ]
});

if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: winston.format.simple()
  }));
}

export function logError(error: Error, context?: any) {
  logger.error({
    message: error.message,
    stack: error.stack,
    context
  });

  if (process.env.NODE_ENV === 'production') {
    Sentry.captureException(error, {
      extra: context
    });
  }
}

export function logInfo(message: string, meta?: any) {
  logger.info(message, meta);
}

export function logWarning(message: string, meta?: any) {
  logger.warn(message, meta);
}

export default logger;