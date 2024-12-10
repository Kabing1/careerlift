import client from 'prom-client';

// Create a Registry to register the metrics
const register = new client.Registry();

// Add a default label which is added to all metrics
register.setDefaultLabels({
  app: 'careerlift-api'
});

// Enable the collection of default metrics
client.collectDefaultMetrics({ register });

// Custom metrics
export const httpRequestDurationMicroseconds = new client.Histogram({
  name: 'http_request_duration_seconds',
  help: 'Duration of HTTP requests in seconds',
  labelNames: ['method', 'route', 'code'],
  buckets: [0.1, 0.5, 1, 2, 5]
});

export const wsConnectionsGauge = new client.Gauge({
  name: 'ws_connections_total',
  help: 'Total number of active WebSocket connections'
});

export const aiProcessingDurationSeconds = new client.Histogram({
  name: 'ai_processing_duration_seconds',
  help: 'Duration of AI processing tasks in seconds',
  labelNames: ['model', 'task'],
  buckets: [0.1, 0.5, 1, 2, 5, 10]
});

register.registerMetric(httpRequestDurationMicroseconds);
register.registerMetric(wsConnectionsGauge);
register.registerMetric(aiProcessingDurationSeconds);

export { register };