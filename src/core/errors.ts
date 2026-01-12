/**
 * Base error class for all NHL API client errors
 */
export class NHLClientError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string,
    public originalError?: unknown
  ) {
    super(message);
    this.name = 'NHLClientError';
    Object.setPrototypeOf(this, NHLClientError.prototype);
  }
}

/**
 * Network-related errors (connection issues, timeouts)
 */
export class NetworkError extends NHLClientError {
  constructor(message: string, endpoint?: string, originalError?: unknown) {
    super(message, undefined, endpoint, originalError);
    this.name = 'NetworkError';
    Object.setPrototypeOf(this, NetworkError.prototype);
  }
}

/**
 * 404 Not Found errors
 */
export class NotFoundError extends NHLClientError {
  constructor(message: string, endpoint?: string) {
    super(message, 404, endpoint);
    this.name = 'NotFoundError';
    Object.setPrototypeOf(this, NotFoundError.prototype);
  }
}

/**
 * Validation errors for invalid input parameters
 */
export class ValidationError extends NHLClientError {
  constructor(message: string) {
    super(message);
    this.name = 'ValidationError';
    Object.setPrototypeOf(this, ValidationError.prototype);
  }
}

/**
 * 429 Rate Limiting errors
 */
export class RateLimitError extends NHLClientError {
  constructor(message: string, endpoint?: string) {
    super(message, 429, endpoint);
    this.name = 'RateLimitError';
    Object.setPrototypeOf(this, RateLimitError.prototype);
  }
}

/**
 * 5xx Server errors
 */
export class ServerError extends NHLClientError {
  constructor(message: string, statusCode: number, endpoint?: string) {
    super(message, statusCode, endpoint);
    this.name = 'ServerError';
    Object.setPrototypeOf(this, ServerError.prototype);
  }
}
