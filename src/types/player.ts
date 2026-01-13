/**
 * Player-related types
 */

/**
 * Player search response
 */
export interface PlayerSearchResponse {
  players?: PlayerSearchResult[];
}

/**
 * Individual player search result
 */
export interface PlayerSearchResult {
  playerId: number;
  name: string;
  positionCode?: string;
  teamId?: number;
  teamAbbrev?: string;
  lastTeamId?: number;
  lastTeamAbbrev?: string;
  lastSeasonId?: number;
  sweaterNumber?: number;
  active?: boolean;
  height?: string;
  heightInInches?: number;
  heightInCentimeters?: number;
  weightInPounds?: number;
  weightInKilograms?: number;
  birthDate?: string;
  birthCity?: string;
  birthStateProvince?: string;
  birthCountry?: string;
}


/**
 * Player stats response (from landing page)
 */
export interface PlayerStatsResponse {
  playerId?: number;
  isActive?: boolean;
  currentTeamId?: number;
  currentTeamAbbrev?: string;
  fullTeamName?: { default: string };
  firstName?: { default: string };
  lastName?: { default: string };
  teamLogo?: string;
  sweaterNumber?: number;
  position?: string;
  headshot?: string;
  heroImage?: string;
  heightInInches?: number;
  heightInCentimeters?: number;
  weightInPounds?: number;
  weightInKilograms?: number;
  birthDate?: string;
  birthCity?: { default: string };
  birthCountry?: string;
  birthStateProvince?: { default: string };
  shootsCatches?: string;
  draftDetails?: DraftDetails;
  playerSlug?: string;
  inTop100AllTime?: number;
  inHHOF?: number;
  featuredStats?: FeaturedStats;
  careerTotals?: CareerTotals;
  shopLink?: string;
  twitterLink?: string;
  watchLink?: string;
  last5Games?: Last5Game[];
  seasonTotals?: SeasonTotals[];
  awards?: Award[];
  currentTeamRoster?: TeamRosterPlayer[];
}

/**
 * Draft details
 */
export interface DraftDetails {
  year?: number;
  teamAbbrev?: string;
  round?: number;
  pickInRound?: number;
  overallPick?: number;
}

/**
 * Featured statistics
 */
export interface FeaturedStats {
  season?: number;
  regularSeason?: {
    subSeason?: SeasonStats;
    career?: CareerStats;
  };
}

/**
 * Season statistics
 */
export interface SeasonStats {
  gamesPlayed?: number;
  goals?: number;
  assists?: number;
  points?: number;
  plusMinus?: number;
  pim?: number;
  gameWinningGoals?: number;
  otGoals?: number;
  shots?: number;
  shootingPctg?: number;
  powerPlayGoals?: number;
  powerPlayPoints?: number;
  shorthandedGoals?: number;
  shorthandedPoints?: number;
  // Goalie stats
  wins?: number;
  losses?: number;
  otLosses?: number;
  shotsAgainst?: number;
  goalsAgainst?: number;
  goalsAgainstAvg?: number;
  savePctg?: number;
  shutouts?: number;
  timeOnIce?: string;
}

/**
 * Career statistics
 */
export interface CareerStats extends SeasonStats {
  // Career stats inherit from season stats
}

/**
 * Career totals
 */
export interface CareerTotals {
  regularSeason?: CareerStats;
  playoffs?: CareerStats;
}

/**
 * Last 5 games
 */
export interface Last5Game {
  gameId?: number;
  gameDate?: string;
  homeRoadFlag?: string;
  opponentAbbrev?: string;
  teamAbbrev?: string;
  goals?: number;
  assists?: number;
  points?: number;
  plusMinus?: number;
  powerPlayGoals?: number;
  shots?: number;
  pim?: number;
  toi?: string;
  gameWinningGoals?: number;
  otGoals?: number;
  // Goalie stats
  goalsAgainst?: number;
  goalsAgainstAverage?: number;
  savePctg?: number;
  shotsAgainst?: number;
  saves?: number;
  decision?: string;
}

/**
 * Season totals
 */
export interface SeasonTotals {
  season?: number;
  gameTypeId?: number;
  leagueAbbrev?: string;
  teamName?: { default: string };
  sequence?: number;
  gamesPlayed?: number;
  goals?: number;
  assists?: number;
  points?: number;
  plusMinus?: number;
  pim?: number;
  gameWinningGoals?: number;
  otGoals?: number;
  shots?: number;
  shootingPctg?: number;
  powerPlayGoals?: number;
  powerPlayPoints?: number;
  shorthandedGoals?: number;
  shorthandedPoints?: number;
  avgToi?: string;
  faceoffWinningPctg?: number;
  // Goalie stats
  wins?: number;
  losses?: number;
  ties?: number;
  otLosses?: number;
  shotsAgainst?: number;
  goalsAgainst?: number;
  goalsAgainstAvg?: number;
  savePctg?: number;
  shutouts?: number;
  timeOnIce?: string;
}

/**
 * Award
 */
export interface Award {
  trophy?: { default: string };
  seasons?: AwardSeason[];
}

/**
 * Award season
 */
export interface AwardSeason {
  seasonId?: number;
  gamesPlayed?: number;
  gameTypeId?: number;
  goals?: number;
  assists?: number;
  points?: number;
  plusMinus?: number;
  hits?: number;
  blockedShots?: number;
  pim?: number;
}

/**
 * Team roster player
 */
export interface TeamRosterPlayer {
  playerId?: number;
  firstName?: { default: string };
  lastName?: { default: string };
  sweaterNumber?: number;
  positionCode?: string;
  headshot?: string;
}
