/**
 * NHL API Client
 * A lightweight, developer-friendly client library for the NHL's web API
 */

// Export main client
export { NHLClient } from './client';
export type { ClientOptions } from './client';

// Export error classes
export {
  NHLClientError,
  NetworkError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError
} from './core/errors';

// Export all type interfaces
export * from './types/common';
export * from './types/schedule';
export * from './types/game';
export * from './types/team';
export * from './types/player';
export * from './types/standings';

// Export utility functions (for advanced usage)
export { normalizeTeamAbbr, isValidTeamAbbr } from './utils/team-normalizer';
export { getCurrentSeasonId, formatSeasonId, parseSeasonString } from './utils/season-calculator';
export { formatDate, getTodayDate, parseDate } from './utils/date-formatter';
