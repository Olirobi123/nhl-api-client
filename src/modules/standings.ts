import { HttpClient } from '../core/http-client';
import { StandingsResponse } from '../types/standings';

/**
 * Standings module
 */
export class StandingsModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get current NHL standings
   * @returns Promise with standings response
   */
  async current(): Promise<StandingsResponse> {
    return this.httpClient.get<StandingsResponse>('/standings/now');
  }

  /**
   * Get season standings
   * @returns Promise with standings response
   */
  async season(): Promise<StandingsResponse> {
    return this.httpClient.get<StandingsResponse>('/standings-season');
  }
}
