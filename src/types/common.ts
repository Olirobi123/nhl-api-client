/**
 * Common types shared across multiple modules
 */

/**
 * Team information
 */
export interface Team {
  id: number;
  name?: string;
  city?: string;
  abbrev: string;
  logo?: string;
}

/**
 * Team with score information (used in games)
 */
export interface TeamWithScore extends Team {
  score?: number;
  awaySplitSquad?: boolean;
  homeSplitSquad?: boolean;
}

/**
 * Game date information
 */
export interface GameDate {
  date: string; // YYYY-MM-DD
  dayAbbrev: string;
  numberOfGames: number;
}

/**
 * Score information
 */
export interface Score {
  home: number;
  away: number;
}

/**
 * Game clock information
 */
export interface GameClock {
  timeRemaining: string;
  secondsRemaining: number;
  running: boolean;
  inIntermission: boolean;
}

/**
 * Period information
 */
export interface Period {
  number: number;
  periodType: string;
}

/**
 * Venue information
 */
export interface Venue {
  default: string;
}

/**
 * TV Broadcast information
 */
export interface TvBroadcast {
  id: number;
  market: string;
  countryCode: string;
  network: string;
}
