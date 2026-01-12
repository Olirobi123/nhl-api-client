import { API_ENDPOINTS } from './api-config';
import {
  NetworkError,
  NotFoundError,
  RateLimitError,
  ServerError,
  NHLClientError
} from './errors';
import { HttpClientOptions } from './types';

/**
 * Base HTTP client for making requests to the NHL API
 */
export class HttpClient {
  private timeout: number;

  constructor(options?: HttpClientOptions) {
    this.timeout = options?.timeout || 10000; // 10 second default timeout
  }

  /**
   * Make a GET request to the NHL API
   */
  async get<T>(endpoint: string): Promise<T> {
    const baseUrl = this.getBaseUrl(endpoint);
    const url = `${baseUrl}${endpoint}`;

    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), this.timeout);

      const response = await fetch(url, {
        method: 'GET',
        headers: {
          'Accept': 'application/json',
          'User-Agent': 'nhl-api-client'
        },
        signal: controller.signal
      });

      clearTimeout(timeoutId);

      if (!response.ok) {
        this.handleHttpError(response.status, endpoint);
      }

      const data = await response.json();
      return data as T;
    } catch (error) {
      if (error instanceof NHLClientError) {
        throw error;
      }
      this.handleError(error, endpoint);
    }
  }

  /**
   * Determine the correct base URL based on the endpoint
   */
  private getBaseUrl(endpoint: string): string {
    if (endpoint.includes('/search/player')) {
      return API_ENDPOINTS.NHL_SEARCH;
    }
    // Default to NHL Web API
    return API_ENDPOINTS.NHL_WEB;
  }

  /**
   * Handle HTTP errors based on status code
   */
  private handleHttpError(status: number, endpoint: string): never {
    switch (status) {
      case 404:
        throw new NotFoundError(
          `Resource not found at endpoint: ${endpoint}`,
          endpoint
        );
      case 429:
        throw new RateLimitError(
          'Rate limit exceeded. Please slow down your requests.',
          endpoint
        );
      case 500:
      case 502:
      case 503:
      case 504:
        throw new ServerError(
          `NHL API server error (${status}). Please try again later.`,
          status,
          endpoint
        );
      default:
        throw new NHLClientError(
          `HTTP error ${status} at endpoint: ${endpoint}`,
          status,
          endpoint
        );
    }
  }

  /**
   * Handle generic errors (network, timeout, etc.)
   */
  private handleError(error: unknown, endpoint: string): never {
    if (error instanceof Error) {
      if (error.name === 'AbortError') {
        throw new NetworkError(
          `Request timeout after ${this.timeout}ms`,
          endpoint,
          error
        );
      }
      throw new NetworkError(
        `Network error: ${error.message}`,
        endpoint,
        error
      );
    }
    throw new NetworkError(
      'Unknown network error occurred',
      endpoint,
      error
    );
  }
}
