import { ValidationError } from '../core/errors';

/**
 * Valid NHL team abbreviations (2025-26 season)
 */
const VALID_TEAMS = [
  'ANA', // Anaheim Ducks
  'BOS', // Boston Bruins
  'BUF', // Buffalo Sabres
  'CAR', // Carolina Hurricanes
  'CBJ', // Columbus Blue Jackets
  'CGY', // Calgary Flames
  'CHI', // Chicago Blackhawks
  'COL', // Colorado Avalanche
  'DAL', // Dallas Stars
  'DET', // Detroit Red Wings
  'EDM', // Edmonton Oilers
  'FLA', // Florida Panthers
  'LAK', // Los Angeles Kings
  'MIN', // Minnesota Wild
  'MTL', // Montreal Canadiens
  'NJD', // New Jersey Devils
  'NSH', // Nashville Predators
  'NYI', // New York Islanders
  'NYR', // New York Rangers
  'OTT', // Ottawa Senators
  'PHI', // Philadelphia Flyers
  'PIT', // Pittsburgh Penguins
  'SEA', // Seattle Kraken
  'SJS', // San Jose Sharks
  'STL', // St. Louis Blues
  'TBL', // Tampa Bay Lightning
  'TOR', // Toronto Maple Leafs
  'UTA', // Utah Hockey Club
  'VAN', // Vancouver Canucks
  'VGK', // Vegas Golden Knights
  'WPG', // Winnipeg Jets
  'WSH'  // Washington Capitals
] as const;

/**
 * Normalize and validate a team abbreviation
 * @param team - Team abbreviation to normalize (case-insensitive)
 * @returns Normalized team abbreviation in uppercase
 * @throws ValidationError if team abbreviation is invalid
 */
export function normalizeTeamAbbr(team: string): string {
  if (!team || typeof team !== 'string') {
    throw new ValidationError('Team abbreviation is required and must be a string');
  }

  const normalized = team.trim().toUpperCase();

  if (!VALID_TEAMS.includes(normalized as any)) {
    throw new ValidationError(
      `Invalid team abbreviation: "${team}". Must be one of: ${VALID_TEAMS.join(', ')}`
    );
  }

  return normalized;
}

/**
 * Check if a team abbreviation is valid
 * @param team - Team abbreviation to check
 * @returns true if valid, false otherwise
 */
export function isValidTeamAbbr(team: string): boolean {
  if (!team || typeof team !== 'string') {
    return false;
  }

  const normalized = team.trim().toUpperCase();
  return VALID_TEAMS.includes(normalized as any);
}
