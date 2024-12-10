import * as Sentry from '@sentry/node';

export class ApplicationError extends Error {
  public code: string;
  public statusCode: number;

  constructor(message: string, code: string, statusCode: number = 400) {
    super(message);
    this.code = code;
    this.statusCode = statusCode;
    this.name = 'ApplicationError';
  }
}

export class AuthenticationError extends ApplicationError {
  constructor(message: string = 'Not authenticated') {
    super(message, 'UNAUTHENTICATED', 401);
    this.name = 'AuthenticationError';
  }
}

export class AuthorizationError extends ApplicationError {
  constructor(message: string = 'Not authorized') {
    super(message, 'UNAUTHORIZED', 403);
    this.name = 'AuthorizationError';
  }
}

export class ValidationError extends ApplicationError {
  constructor(message: string) {
    super(message, 'VALIDATION_ERROR', 400);
    this.name = 'ValidationError';
  }
}

export class NotFoundError extends ApplicationError {
  constructor(resource: string) {
    super(`${resource} not found`, 'NOT_FOUND', 404);
    this.name = 'NotFoundError';
  }
}

export function handleError(error: Error) {
  if (error instanceof ApplicationError) {
    // Log application errors but don't send to Sentry
    console.error(`[${error.name}] ${error.message}`);
    return error;
  }

  // Log unexpected errors to Sentry
  console.error('[UnexpectedError]', error);
  Sentry.captureException(error);

  return new ApplicationError(
    'An unexpected error occurred',
    'INTERNAL_SERVER_ERROR',
    500
  );
}