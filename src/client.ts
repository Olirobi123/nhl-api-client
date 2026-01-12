import { HttpClient } from './core/http-client';
import { ScheduleModule } from './modules/schedule';
import { GamesModule } from './modules/games';
import { TeamsModule } from './modules/teams';
import { PlayersModule } from './modules/players';
import { StandingsModule } from './modules/standings';

/**
 * Configuration options for the NHL client
 */
export interface ClientOptions {
  /**
   * Request timeout in milliseconds (default: 10000)
   */
  timeout?: number;
}

/**
 * Main NHL API client
 *
 * @example
 * ```typescript
 * const client = new NHLClient();
 *
 * // Get today's games
 * const games = await client.schedule.today();
 *
 * // Get live scores
 * const scores = await client.games.scores();
 *
 * // Get team roster
 * const roster = await client.teams.get("WPG").roster();
 *
 * // Search for a player
 * const players = await client.players.search("Connor McDavid");
 *
 * // Get standings
 * const standings = await client.standings.current();
 * ```
 */
export class NHLClient {
  private httpClient: HttpClient;

  /**
   * Schedule operations (today's games, dates, team schedules)
   */
  public readonly schedule: ScheduleModule;

  /**
   * Live game data (scores, boxscores, play-by-play)
   */
  public readonly games: GamesModule;

  /**
   * Team information (rosters, stats)
   */
  public readonly teams: TeamsModule;

  /**
   * Player information (search, stats)
   */
  public readonly players: PlayersModule;

  /**
   * League standings
   */
  public readonly standings: StandingsModule;

  /**
   * Create a new NHL API client
   * @param options - Optional configuration options
   */
  constructor(options?: ClientOptions) {
    this.httpClient = new HttpClient(options);

    // Initialize all modules with the shared HTTP client
    this.schedule = new ScheduleModule(this.httpClient);
    this.games = new GamesModule(this.httpClient);
    this.teams = new TeamsModule(this.httpClient);
    this.players = new PlayersModule(this.httpClient);
    this.standings = new StandingsModule(this.httpClient);
  }
}
