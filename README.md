# NHL API Client

**[Documentation en français](README.fr.md)**

A lightweight, developer-friendly TypeScript client library for the NHL's web API. Get game schedules, live scores, player stats, and team information without dealing with raw HTTP requests or understanding complex endpoint patterns.

## Features

- **Zero dependencies** - Uses native fetch, works in Node.js 18+ and browsers
- **Type-safe** - Full TypeScript support with detailed type definitions
- **Fluent API** - Intuitive, chainable methods for readable code
- **Smart defaults** - Auto-detects current season, normalizes team abbreviations
- **Error handling** - Meaningful error messages with context
- **Simple** - No configuration needed, just install and use

## Installation

```bash
npm install @olirobi/nhl-api-client
```

## Quick Start

```typescript
import { NHLClient } from '@olirobi/nhl-api-client';

const client = new NHLClient();

// Get today's games
const games = await client.schedule.today();

// Get live scores
const scores = await client.games.scores();

// Get team roster (case-insensitive, auto-uses current season)
const roster = await client.teams.get("wpg").roster();

// Search for a player
const players = await client.players.search("Connor McDavid");

// Get current standings
const standings = await client.standings.current();
```

## API Documentation

### Schedule Operations

Get game schedules for today, specific dates, or teams.

```typescript
// Today's games
const today = await client.schedule.today();

// Games on a specific date
const date = await client.schedule.getDate("2026-01-11");
// Or with a Date object
const date = await client.schedule.getDate(new Date());

// Team's full season schedule
const season = await client.schedule.team("TOR").season();
// Specific season
const season = await client.schedule.team("TOR").season(20242025);

// Team's weekly schedule
const week = await client.schedule.team("TOR").week();

// Team's monthly schedule
const month = await client.schedule.team("TOR").month();
```

### Live Game Data

Get real-time scores, boxscores, and play-by-play data.

```typescript
// Current scores for all games
const scores = await client.games.scores();

// Detailed boxscore for a specific game
const boxscore = await client.games.boxscore(2025020711);

// Play-by-play events
const plays = await client.games.playByPlay(2025020711);
```

### Team Information

Access team rosters and statistics.

```typescript
// Team roster (auto-uses current season)
const roster = await client.teams.get("WPG").roster();

// Roster for a specific season
const roster = await client.teams.get("WPG").roster(20242025);

// Team season stats
const stats = await client.teams.get("WPG").stats();
```

**Valid team abbreviations:** ANA, BOS, BUF, CAR, CBJ, CGY, CHI, COL, DAL, DET, EDM, FLA, LAK, MIN, MTL, NJD, NSH, NYI, NYR, OTT, PHI, PIT, SEA, SJS, STL, TBL, TOR, UTA, VAN, VGK, WPG, WSH

### Player Information

Search for players and get their stats.

```typescript
// Search for players by name
const results = await client.players.search("Matthews");

// Get player stats and info
const player = await client.players.get(8478402).stats();
```

### Standings

Get current league standings.

```typescript
// Current standings
const standings = await client.standings.current();

// Season standings
const standings = await client.standings.season();
```

## Error Handling

The client provides specific error types for better error handling:

```typescript
import {
  NHLClient,
  ValidationError,
  NotFoundError,
  NetworkError
} from '@olirobi/nhl-api-client';

const client = new NHLClient();

try {
  const roster = await client.teams.get("INVALID").roster();
} catch (error) {
  if (error instanceof ValidationError) {
    // Invalid input (e.g., bad team abbreviation, invalid date format)
    console.error('Invalid input:', error.message);
  } else if (error instanceof NotFoundError) {
    // Resource not found (404)
    console.error('Not found:', error.message);
  } else if (error instanceof NetworkError) {
    // Network issues (timeout, connection error)
    console.error('Network error:', error.message);
  }
}
```

**Error Types:**
- `ValidationError` - Invalid input parameters
- `NotFoundError` - 404 responses
- `NetworkError` - Connection/timeout issues
- `RateLimitError` - Rate limit exceeded (429)
- `ServerError` - Server errors (5xx)
- `NHLClientError` - Base error class for all errors

## Configuration

```typescript
const client = new NHLClient({
  timeout: 15000  // Request timeout in milliseconds (default: 10000)
});
```

## TypeScript Support

All API responses are fully typed:

```typescript
import { ScheduleResponse, GameScore, PlayerStatsResponse } from '@olirobi/nhl-api-client';

const games: ScheduleResponse = await client.schedule.today();
const scores: ScoreResponse = await client.games.scores();
const player: PlayerStatsResponse = await client.players.get(8478402).stats();
```

## Advanced Usage

### Utility Functions

The client exports utility functions for advanced use cases:

```typescript
import {
  normalizeTeamAbbr,
  getCurrentSeasonId,
  formatDate
} from '@olirobi/nhl-api-client';

// Validate and normalize team abbreviations
const team = normalizeTeamAbbr("wpg"); // Returns "WPG"

// Get current NHL season ID
const season = getCurrentSeasonId(); // Returns 20252026 for 2025-26 season

// Format dates
const date = formatDate(new Date()); // Returns "2026-01-11"
```

## Examples

### Building a Live Scoreboard

```typescript
const client = new NHLClient();

async function displayScoreboard() {
  const scores = await client.games.scores();

  for (const game of scores.games || []) {
    console.log(`${game.awayTeam.abbrev} ${game.awayTeam.score} @ ${game.homeTeam.abbrev} ${game.homeTeam.score}`);
    console.log(`Period ${game.period} - ${game.gameState}`);
    console.log('---');
  }
}

displayScoreboard();
```

### Getting Team Schedule

```typescript
const client = new NHLClient();

async function getNextGames(teamAbbr: string) {
  const schedule = await client.schedule.team(teamAbbr).week();

  for (const game of schedule.games) {
    const opponent = game.homeTeam.abbrev === teamAbbr
      ? game.awayTeam.abbrev
      : game.homeTeam.abbrev;
    console.log(`${game.gameDate}: vs ${opponent}`);
  }
}

getNextGames("TOR");
```

### Finding a Player's Stats

```typescript
const client = new NHLClient();

async function findPlayerStats(name: string) {
  // Search for the player
  const searchResults = await client.players.search(name);

  if (!searchResults.players || searchResults.players.length === 0) {
    console.log('Player not found');
    return;
  }

  // Get stats for the first result
  const player = searchResults.players[0];
  const stats = await client.players.get(player.playerId).stats();

  console.log(`${stats.firstName?.default} ${stats.lastName?.default}`);
  console.log(`Team: ${stats.currentTeamAbbrev}`);
  console.log(`Position: ${stats.position}`);

  if (stats.featuredStats?.regularSeason?.subSeason) {
    const season = stats.featuredStats.regularSeason.subSeason;
    console.log(`Goals: ${season.goals}`);
    console.log(`Assists: ${season.assists}`);
    console.log(`Points: ${season.points}`);
  }
}

findPlayerStats("Auston Matthews");
```

## Requirements

- Node.js 18.0.0 or higher (for native fetch support)
- TypeScript 5.0+ (for TypeScript users)

## License

MIT

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## Support

For issues and questions, please use the [GitHub issue tracker](https://github.com/olirobi/nhl-api-client/issues).

## Acknowledgments

This library uses the unofficial NHL web API. It is not affiliated with or endorsed by the National Hockey League.

Special thanks to [Drew Hynes](https://gitlab.com/dword4/nhlapi) for his comprehensive NHL API documentation, which was invaluable in developing this client.