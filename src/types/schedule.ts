import { TeamWithScore, TvBroadcast } from './common';

/**
 * Schedule response from the API
 */
export interface ScheduleResponse {
  nextStartDate: string;
  previousStartDate: string;
  gameWeek: GameWeek[];
  preSeasonStartDate?: string;
  regularSeasonStartDate?: string;
  regularSeasonEndDate?: string;
  playoffEndDate?: string;
  numberOfGames?: number;
}

/**
 * Game week containing games for each day
 */
export interface GameWeek {
  date: string; // YYYY-MM-DD
  dayAbbrev: string;
  numberOfGames: number;
  games: ScheduleGame[];
}

/**
 * Individual game in the schedule
 */
export interface ScheduleGame {
  id: number;
  season: number;
  gameType: number;
  gameDate: string;
  venue?: string;
  neutralSite?: boolean;
  startTimeUTC: string;
  easternUTCOffset?: string;
  venueUTCOffset?: string;
  venueTimezone?: string;
  gameState: string;
  gameScheduleState?: string;
  tvBroadcasts?: TvBroadcast[];
  awayTeam: TeamWithScore;
  homeTeam: TeamWithScore;
  gameOutcome?: GameOutcome;
  winningGoalie?: PlayerSummary;
  winningGoalScorer?: PlayerSummary;
  specialEvent?: string;
  gameCenterLink?: string;
  ticketsLink?: string;
}

/**
 * Game outcome information
 */
export interface GameOutcome {
  lastPeriodType: string;
}

/**
 * Player summary (used in schedule for winning goalie/scorer)
 */
export interface PlayerSummary {
  playerId: number;
  firstInitial: string;
  lastName: string;
}

/**
 * Team schedule response (for team-specific schedules)
 */
export interface TeamScheduleResponse {
  previousSeason?: number;
  currentSeason?: number;
  clubTimezone?: string;
  clubUTCOffset?: string;
  games: ScheduleGame[];
}
