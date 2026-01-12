import { TeamWithScore, GameClock, Period, TvBroadcast } from './common';

/**
 * Score response containing current game scores
 */
export interface ScoreResponse {
  prevDate?: string;
  currentDate?: string;
  nextDate?: string;
  gameWeek?: ScoreGameWeek[];
  games?: GameScore[];
}

/**
 * Game week for score response
 */
export interface ScoreGameWeek {
  date: string;
  dayAbbrev: string;
  numberOfGames: number;
  games: GameScore[];
}

/**
 * Individual game score
 */
export interface GameScore {
  id: number;
  season: number;
  gameType: number;
  gameDate: string;
  venue?: string;
  startTimeUTC: string;
  easternUTCOffset?: string;
  venueUTCOffset?: string;
  venueTimezone?: string;
  tvBroadcasts?: TvBroadcast[];
  gameState: string;
  gameScheduleState?: string;
  period?: number;
  periodDescriptor?: Period;
  awayTeam: TeamWithScore;
  homeTeam: TeamWithScore;
  clock?: GameClock;
  neutralSite?: boolean;
  gameCenterLink?: string;
}

/**
 * Boxscore response
 */
export interface BoxscoreResponse {
  id?: number;
  season?: number;
  gameType?: number;
  gameDate?: string;
  venue?: string;
  startTimeUTC?: string;
  easternUTCOffset?: string;
  venueTimezone?: string;
  gameState?: string;
  gameScheduleState?: string;
  tvBroadcasts?: TvBroadcast[];
  awayTeam?: TeamBoxscore;
  homeTeam?: TeamBoxscore;
  periodDescriptor?: Period;
  gameOutcome?: GameOutcomeBoxscore;
  summary?: GameSummary;
  gameVideo?: GameVideo;
}

/**
 * Team boxscore information
 */
export interface TeamBoxscore extends TeamWithScore {
  sog?: number; // Shots on goal
}

/**
 * Game outcome for boxscore
 */
export interface GameOutcomeBoxscore {
  lastPeriodType?: string;
  otPeriods?: number;
}

/**
 * Game summary
 */
export interface GameSummary {
  linescore?: Linescore;
  teamGameStats?: TeamGameStatsContainer;
  scoring?: ScoringPeriod[];
  penalties?: PenaltyPeriod[];
  shootout?: Shootout[];
  gameInfo?: GameInfo;
}

/**
 * Linescore information
 */
export interface Linescore {
  byPeriod?: PeriodScore[];
  totals?: TeamTotals;
}

/**
 * Period score
 */
export interface PeriodScore {
  period: number;
  periodDescriptor?: Period;
  away?: number;
  home?: number;
}

/**
 * Team totals
 */
export interface TeamTotals {
  away?: number;
  home?: number;
}

/**
 * Container for team game stats
 */
export interface TeamGameStatsContainer {
  awayTeam?: TeamGameStats;
  homeTeam?: TeamGameStats;
}

/**
 * Team game statistics
 */
export interface TeamGameStats {
  category: string;
  sog?: number;
  faceoffWinningPctg?: number;
  powerPlay?: PowerPlayStats;
  pim?: number;
  hits?: number;
  blocks?: number;
}

/**
 * Power play statistics
 */
export interface PowerPlayStats {
  goals: number;
  opportunities: number;
  percentage: number;
}

/**
 * Scoring information for a period
 */
export interface ScoringPeriod {
  periodDescriptor: Period;
  goals: Goal[];
}

/**
 * Goal information
 */
export interface Goal {
  period: number;
  timeInPeriod: string;
  team: string;
  goalieInNet: GoalieInNet;
  scoredBy: string;
  assists?: string[];
  awayScore: number;
  homeScore: number;
  strength?: string;
  highlightReelLink?: string;
}

/**
 * Goalie in net during goal
 */
export interface GoalieInNet {
  playerId: number;
  name: string;
}

/**
 * Penalty information for a period
 */
export interface PenaltyPeriod {
  periodDescriptor: Period;
  penalties: Penalty[];
}

/**
 * Individual penalty
 */
export interface Penalty {
  period: number;
  timeInPeriod: string;
  type: string;
  duration: number;
  committedBy: string;
  drawnBy?: string;
  descKey?: string;
}

/**
 * Shootout information
 */
export interface Shootout {
  sequence: number;
  teamAbbrev: string;
  playerName: string;
  result: string;
}

/**
 * Game info
 */
export interface GameInfo {
  referees?: Official[];
  linesmen?: Official[];
  awayTeam?: TeamGameInfo;
  homeTeam?: TeamGameInfo;
}

/**
 * Official information
 */
export interface Official {
  default: string;
}

/**
 * Team game info
 */
export interface TeamGameInfo {
  headCoach?: {
    default: string;
  };
  scratches?: PlayerInfo[];
}

/**
 * Player info
 */
export interface PlayerInfo {
  id: number;
  firstName?: { default: string };
  lastName?: { default: string };
}

/**
 * Game video
 */
export interface GameVideo {
  threeMinRecap?: string;
  condensedGame?: string;
}

/**
 * Play-by-play response
 */
export interface PlayByPlayResponse {
  id?: number;
  season?: number;
  gameType?: number;
  gameDate?: string;
  venue?: string;
  startTimeUTC?: string;
  easternUTCOffset?: string;
  venueTimezone?: string;
  gameState?: string;
  gameScheduleState?: string;
  periodDescriptor?: Period;
  awayTeam?: TeamWithScore;
  homeTeam?: TeamWithScore;
  clock?: GameClock;
  rosterSpots?: RosterSpot[];
  plays?: Play[];
}

/**
 * Roster spot (player on ice)
 */
export interface RosterSpot {
  playerId: number;
  firstName?: { default: string };
  lastName?: { default: string };
  sweaterNumber?: number;
  positionCode?: string;
  teamId?: number;
  teamTriCode?: string;
  headshot?: string;
}

/**
 * Play event
 */
export interface Play {
  eventId: number;
  period: number;
  periodDescriptor?: Period;
  timeInPeriod: string;
  timeRemaining?: string;
  situationCode?: string;
  homeTeamDefendingSide?: string;
  typeCode?: number;
  typeDescKey?: string;
  sortOrder?: number;
  details?: PlayDetails;
}

/**
 * Play details
 */
export interface PlayDetails {
  xCoord?: number;
  yCoord?: number;
  zoneCode?: string;
  reason?: string;
  eventOwnerTeamId?: number;
  losingPlayerId?: number;
  winningPlayerId?: number;
  playerId?: number;
  shotType?: string;
  scoringPlayerId?: number;
  scoringPlayerTotal?: number;
  assist1PlayerId?: number;
  assist1PlayerTotal?: number;
  assist2PlayerId?: number;
  assist2PlayerTotal?: number;
  awayScore?: number;
  homeScore?: number;
  hittingPlayerId?: number;
  hitteePlayerId?: number;
  duration?: number;
  committedByPlayerId?: number;
  drawnByPlayerId?: number;
  descKey?: string;
  typeCode?: string;
  shootingPlayerId?: number;
  goalieInNetId?: number;
  awaySOG?: number;
  homeSOG?: number;
}
