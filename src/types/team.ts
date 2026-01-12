/**
 * Team-related types
 */

/**
 * Roster response
 */
export interface RosterResponse {
  forwards?: PlayerRosterEntry[];
  defensemen?: PlayerRosterEntry[];
  goalies?: PlayerRosterEntry[];
}

/**
 * Player roster entry
 */
export interface PlayerRosterEntry {
  id: number;
  headshot?: string;
  firstName?: { default: string };
  lastName?: { default: string };
  sweaterNumber?: number;
  positionCode?: string;
  shootsCatches?: string;
  heightInInches?: number;
  weightInPounds?: number;
  heightInCentimeters?: number;
  weightInKilograms?: number;
  birthDate?: string;
  birthCity?: { default: string };
  birthCountry?: string;
  birthStateProvince?: { default: string };
}

/**
 * Team stats response
 */
export interface TeamStatsResponse {
  seasonId?: number;
  gamesPlayed?: number;
  wins?: number;
  losses?: number;
  otLosses?: number;
  pts?: number;
  ptPctg?: number;
  goalsFor?: number;
  goalsForPerGame?: number;
  goalsAgainst?: number;
  goalsAgainstPerGame?: number;
  evGGARatio?: number;
  powerPlayPct?: number;
  powerPlayGoals?: number;
  powerPlayGoalsAgainst?: number;
  powerPlayOpportunities?: number;
  penaltyKillPct?: number;
  shotsForPerGame?: number;
  shotsAgainstPerGame?: number;
  winScoreFirst?: number;
  winOppScoreFirst?: number;
  winLeadFirstPer?: number;
  winLeadSecondPer?: number;
  winOutshootOpp?: number;
  winOutshotByOpp?: number;
  faceoffWinPct?: number;
  shootingPct?: number;
  savePct?: number;
}
