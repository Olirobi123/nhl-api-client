import { HttpClient } from '../core/http-client';
import { PlayerSearchResponse, PlayerStatsResponse } from '../types/player';
import { ValidationError } from '../core/errors';

/**
 * Players module for player information
 */
export class PlayersModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Search for players by name
   * @param query - Search query (player name)
   * @returns Promise with player search response
   */
  async search(query: string): Promise<PlayerSearchResponse> {
    if (!query || typeof query !== 'string' || query.trim().length === 0) {
      throw new ValidationError('Search query cannot be empty');
    }

    const encodedQuery = encodeURIComponent(query.trim());
    return this.httpClient.get<PlayerSearchResponse>(
      `/search/player?culture=en-us&limit=20&q=${encodedQuery}`
    );
  }

  /**
   * Get player-specific data
   * @param playerId - Player ID
   * @returns PlayerBuilder for fluent API
   */
  get(playerId: number): PlayerBuilder {
    return new PlayerBuilder(this.httpClient, playerId);
  }
}

/**
 * Builder for player-specific queries
 */
export class PlayerBuilder {
  constructor(
    private httpClient: HttpClient,
    private playerId: number
  ) {}

  /**
   * Get player stats and information
   * @returns Promise with player stats response
   */
  async stats(): Promise<PlayerStatsResponse> {
    this.validatePlayerId();
    return this.httpClient.get<PlayerStatsResponse>(`/player/${this.playerId}/landing`);
  }

  /**
   * Validate player ID
   * @throws ValidationError if player ID is invalid
   */
  private validatePlayerId(): void {
    if (!this.playerId || !Number.isInteger(this.playerId) || this.playerId <= 0) {
      throw new ValidationError(
        `Invalid player ID: ${this.playerId}. Must be a positive integer.`
      );
    }

    // Player IDs are typically 7 digits (e.g., 8478402)
    const playerIdStr = this.playerId.toString();
    if (playerIdStr.length < 6 || playerIdStr.length > 8) {
      throw new ValidationError(
        `Invalid player ID format: ${this.playerId}. Player IDs should be 6-8 digits.`
      );
    }
  }
}
