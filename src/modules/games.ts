import { HttpClient } from '../core/http-client';
import { ScoreResponse, BoxscoreResponse, PlayByPlayResponse } from '../types/game';
import { ValidationError } from '../core/errors';

/**
 * Games module for live game data
 */
export class GamesModule {
  constructor(private httpClient: HttpClient) {}

  /**
   * Get current scores for all games
   * @returns Promise with score response
   */
  async scores(): Promise<ScoreResponse> {
    return this.httpClient.get<ScoreResponse>('/score/now');
  }

  /**
   * Get detailed boxscore for a specific game
   * @param gameId - Game ID
   * @returns Promise with boxscore response
   */
  async boxscore(gameId: number): Promise<BoxscoreResponse> {
    this.validateGameId(gameId);
    return this.httpClient.get<BoxscoreResponse>(`/gamecenter/${gameId}/boxscore`);
  }

  /**
   * Get play-by-play data for a specific game
   * @param gameId - Game ID
   * @returns Promise with play-by-play response
   */
  async playByPlay(gameId: number): Promise<PlayByPlayResponse> {
    this.validateGameId(gameId);
    return this.httpClient.get<PlayByPlayResponse>(`/gamecenter/${gameId}/play-by-play`);
  }

  /**
   * Validate game ID
   * @param gameId - Game ID to validate
   * @throws ValidationError if game ID is invalid
   */
  private validateGameId(gameId: number): void {
    if (!gameId || !Number.isInteger(gameId) || gameId <= 0) {
      throw new ValidationError(
        `Invalid game ID: ${gameId}. Must be a positive integer.`
      );
    }

    // Game IDs are typically 10 digits (e.g., 2025020711)
    const gameIdStr = gameId.toString();
    if (gameIdStr.length < 8 || gameIdStr.length > 10) {
      throw new ValidationError(
        `Invalid game ID format: ${gameId}. Game IDs should be 8-10 digits.`
      );
    }
  }
}
