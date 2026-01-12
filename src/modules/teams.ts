import { HttpClient } from '../core/http-client';
import { RosterResponse, TeamStatsResponse } from '../types/team';
import { normalizeTeamAbbr } from '../utils/team-normalizer';
import { getCurrentSeasonId } from '../utils/season-calculator';

/**
 * Teams module for team information
 */
export class TeamsModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get team-specific data
   * @param teamAbbr - Team abbreviation (case-insensitive)
   * @returns TeamBuilder for fluent API
   */
  get(teamAbbr: string): TeamBuilder {
    return new TeamBuilder(this.httpClient, teamAbbr);
  }
}

/**
 * Builder for team-specific queries
 */
export class TeamBuilder {
  constructor(
    private httpClient: HttpClient,
    private teamAbbr: string
  ) {}

  /**
   * Get team roster
   * @param seasonId - Optional season ID (defaults to current season)
   * @returns Promise with roster response
   */
  async roster(seasonId?: number): Promise<RosterResponse> {
    const normalizedTeam = normalizeTeamAbbr(this.teamAbbr);
    const season = seasonId || getCurrentSeasonId();
    return this.httpClient.get<RosterResponse>(`/roster/${normalizedTeam}/${season}`);
  }

  /**
   * Get team season stats
   * @returns Promise with team stats response
   */
  async stats(): Promise<TeamStatsResponse> {
    const normalizedTeam = normalizeTeamAbbr(this.teamAbbr);
    return this.httpClient.get<TeamStatsResponse>(`/club-stats-season/${normalizedTeam}`);
  }
}
