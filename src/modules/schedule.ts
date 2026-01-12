import { HttpClient } from '../core/http-client';
import { ScheduleGame, ScheduleResponse, TeamScheduleResponse } from '../types/schedule';
import { formatDate } from '../utils/date-formatter';
import { normalizeTeamAbbr } from '../utils/team-normalizer';

/**
 * Schedule operations module
 */
export class ScheduleModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get today's game schedule
   * @returns Promise with schedule response
   */
  async today(): Promise<ScheduleGame[]> {
    let games: ScheduleGame[];

    const response: ScheduleResponse = await this.httpClient.get<ScheduleResponse>('/schedule/now');
    games = response.gameWeek[0].games;
    return games;
  }

  /**
   * Get game schedule for a specific date
   * @param date - Date string (YYYY-MM-DD) or Date object
   * @returns Promise with schedule response
   */
  async getDate(date: string | Date): Promise<ScheduleResponse> {
    const formattedDate = formatDate(date);
    return this.httpClient.get<ScheduleResponse>(`/schedule/${formattedDate}`);
  }


  /**
   * Get team-specific schedule
   * @param teamAbbr - Team abbreviation (case-insensitive)
   * @returns TeamScheduleBuilder for fluent API
   */
  team(teamAbbr: string): TeamScheduleBuilder {
    return new TeamScheduleBuilder(this.httpClient, teamAbbr);
  }
}

/**
 * Builder for team-specific schedule queries
 */
export class TeamScheduleBuilder {
  constructor(
    private httpClient: HttpClient,
    private teamAbbr: string
  ) {}

  /**
   * Get team's full season schedule
   * @param _seasonId - Optional season ID (currently not used by API, reserved for future)
   * @returns Promise with team schedule response
   */
  async season(_seasonId?: number): Promise<TeamScheduleResponse> {
    const normalizedTeam = normalizeTeamAbbr(this.teamAbbr);
    return this.httpClient.get<TeamScheduleResponse>(
      `/club-schedule-season/${normalizedTeam}/now`
    );
  }

  /**
   * Get team's weekly schedule
   * @returns Promise with team schedule response
   */
  async week(): Promise<TeamScheduleResponse> {
    const normalizedTeam = normalizeTeamAbbr(this.teamAbbr);
    return this.httpClient.get<TeamScheduleResponse>(
      `/club-schedule/${normalizedTeam}/week/now`
    );
  }

  /**
   * Get team's monthly schedule
   * @returns Promise with team schedule response
   */
  async month(): Promise<TeamScheduleResponse> {
    const normalizedTeam = normalizeTeamAbbr(this.teamAbbr);
    return this.httpClient.get<TeamScheduleResponse>(
      `/club-schedule/${normalizedTeam}/month/now`
    );
  }
}
