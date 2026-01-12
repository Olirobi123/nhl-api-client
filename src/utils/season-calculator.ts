/**
 * Calculate the current NHL season ID based on the current date
 * @returns Season ID in format YYYYYYYY (e.g., 20252026 for 2025-26 season)
 */
export function getCurrentSeasonId(): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-11

  // NHL season runs from October (month 9) to June (month 5)
  // Season ID format: YYYYYYYY (start year + end year)
  // e.g., 2024-25 season = 20242025
  if (month >= 9) {
    // October-December: current year is start year
    return parseInt(`${year}${year + 1}`, 10);
  } else {
    // January-September: previous year is start year
    return parseInt(`${year - 1}${year}`, 10);
  }
}

/**
 * Format a season ID for display (e.g., 20252026 -> "2025-26")
 * @param seasonId - Season ID in format YYYYYYYY
 * @returns Formatted season string
 */
export function formatSeasonId(seasonId: number): string {
  const seasonStr = seasonId.toString();
  if (seasonStr.length !== 8) {
    return seasonStr;
  }

  const startYear = seasonStr.substring(0, 4);
  const endYear = seasonStr.substring(6, 8);
  return `${startYear}-${endYear}`;
}

/**
 * Parse a season string (e.g., "2025-26") to season ID format
 * @param season - Season string in format "YYYY-YY"
 * @returns Season ID in format YYYYYYYY
 */
export function parseSeasonString(season: string): number {
  const parts = season.split('-');
  if (parts.length !== 2) {
    throw new Error(`Invalid season format: ${season}. Expected format: YYYY-YY`);
  }

  const startYear = parts[0];
  let endYear = parts[1];

  // Handle 2-digit end year
  if (endYear.length === 2) {
    const startYearPrefix = startYear.substring(0, 2);
    endYear = startYearPrefix + endYear;
  }

  return parseInt(`${startYear}${endYear}`, 10);
}
