# NHL API Client - Implementation Plan

## Overview

Build a TypeScript/Node.js library that wraps the NHL's web API, making it simple to fetch schedules, live scores, player stats, and team information. The goal is "From URL chaos to clean data in one line of code."

## Project Configuration

### Technology Stack
- **Language:** TypeScript
- **Runtime:** Node.js 18+ (native fetch support)
- **Dependencies:** Zero runtime dependencies
- **Build Tool:** TypeScript compiler (tsc)
- **Package Manager:** npm

### Project Structure

```
nhl-api-client/
├── src/
│   ├── index.ts                      # Main entry point
│   ├── client.ts                     # NHLClient class
│   ├── core/
│   │   ├── http-client.ts            # Base HTTP client
│   │   ├── api-config.ts             # API URLs and endpoints
│   │   ├── errors.ts                 # Custom error classes
│   │   └── types.ts                  # Shared utility types
│   ├── modules/
│   │   ├── schedule.ts               # Schedule operations
│   │   ├── games.ts                  # Live game data
│   │   ├── teams.ts                  # Team information
│   │   ├── players.ts                # Player information
│   │   └── standings.ts              # Standings
│   ├── types/
│   │   ├── schedule.ts               # Schedule-related interfaces
│   │   ├── game.ts                   # Game-related interfaces
│   │   ├── team.ts                   # Team-related interfaces
│   │   ├── player.ts                 # Player-related interfaces
│   │   ├── standings.ts              # Standings interfaces
│   │   └── common.ts                 # Common interfaces
│   └── utils/
│       ├── team-normalizer.ts        # Team abbreviation validation
│       ├── date-formatter.ts         # Date formatting utilities
│       └── season-calculator.ts      # Current season calculation
├── package.json
├── tsconfig.json
└── .gitignore
```

## Implementation Steps

### Phase 1: Project Setup & Configuration ✅

#### 1.1 Initialize Project Files
- ✅ Create `package.json` with TypeScript and Node.js type dependencies
- ✅ Create `tsconfig.json` with strict mode enabled
- ✅ Create `.gitignore` to exclude `node_modules/` and `dist/`

**Key package.json settings:**
- Node engine: `>=18.0.0`
- Main entry: `dist/index.js`
- Types entry: `dist/index.d.ts`
- Zero runtime dependencies

**Key tsconfig.json settings:**
- Target: ES2020
- Module: CommonJS
- Strict mode: enabled
- Generate declaration files: true

### Phase 2: Core Foundation Layer ✅

#### 2.1 API Configuration ([src/core/api-config.ts](src/core/api-config.ts)) ✅

Define all API base URLs and endpoint patterns:

```typescript
export const API_ENDPOINTS = {
  NHL_WEB: 'https://api-web.nhle.com/v1',
  NHL_STATS: 'https://api.nhle.com/stats/rest/en',
  NHL_SEARCH: 'https://search.d3.nhle.com/api/v1'
}

export const ENDPOINTS = {
  SCHEDULE_NOW: '/schedule/now',
  SCHEDULE_DATE: '/schedule/:date',
  TEAM_SCHEDULE_SEASON: '/club-schedule-season/:team/now',
  TEAM_SCHEDULE_WEEK: '/club-schedule/:team/week/now',
  TEAM_SCHEDULE_MONTH: '/club-schedule/:team/month/now',
  SCORE_NOW: '/score/now',
  GAMECENTER_BOXSCORE: '/gamecenter/:gameId/boxscore',
  GAMECENTER_PLAY_BY_PLAY: '/gamecenter/:gameId/play-by-play',
  ROSTER: '/roster/:team/:season',
  CLUB_STATS: '/club-stats-season/:team',
  PLAYER_SEARCH: '/search/player',
  PLAYER_LANDING: '/player/:playerId/landing',
  STANDINGS_NOW: '/standings/now',
  STANDINGS_SEASON: '/standings-season'
}
```

#### 2.2 Error Handling ([src/core/errors.ts](src/core/errors.ts)) ✅

Create custom error class hierarchy:

```typescript
class NHLClientError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public endpoint?: string,
    public originalError?: unknown
  )
}

// Specific error types:
- NetworkError (connection issues)
- NotFoundError (404 responses)
- ValidationError (invalid parameters)
- RateLimitError (429 responses)
- ServerError (5xx responses)
```

**Error handling strategy:**
- Validate inputs immediately (throw ValidationError)
- Map HTTP status codes to specific error types
- Include contextual information (endpoint, parameters)
- Provide developer-friendly messages

#### 2.3 HTTP Client ([src/core/http-client.ts](src/core/http-client.ts)) ✅

Implement base HTTP client using native fetch:

**Responsibilities:**
- Handle GET requests with generic type support
- Route requests to correct base URL (api-web.nhle.com, api.nhle.com/stats, search.d3.nhle.com)
- Parse JSON responses
- Transform HTTP errors to custom error classes
- Set appropriate headers (User-Agent, Accept)
- Implement timeout handling

**Key methods:**
```typescript
class HttpClient {
  async get<T>(endpoint: string, params?: Record<string, string>): Promise<T>
  private getBaseUrl(endpoint: string): string
  private handleError(error: unknown, endpoint: string): never
}
```

**Base URL routing logic:**
- If endpoint contains `/search/player` → use NHL_SEARCH
- Otherwise → use NHL_WEB (default)

### Phase 3: Type Definitions ✅

#### 3.1 Common Types ([src/types/common.ts](src/types/common.ts)) ✅

Define shared interfaces used across all modules:

```typescript
interface Team {
  id: number;
  name?: string;
  city?: string;
  abbrev: string;
  logo?: string;
}

interface GameDate {
  date: string;              // YYYY-MM-DD
  dayAbbrev: string;
  numberOfGames: number;
}

interface Score {
  home: number;
  away: number;
}
```

#### 3.2 Schedule Types ([src/types/schedule.ts](src/types/schedule.ts)) ✅
#### 3.3 Game Types ([src/types/game.ts](src/types/game.ts)) ✅
#### 3.4 Team Types ([src/types/team.ts](src/types/team.ts)) ✅
#### 3.5 Player Types ([src/types/player.ts](src/types/player.ts)) ✅
#### 3.6 Standings Types ([src/types/standings.ts](src/types/standings.ts)) ✅

### Phase 4: Utility Functions ✅

#### 4.1 Team Normalizer ([src/utils/team-normalizer.ts](src/utils/team-normalizer.ts)) ✅

```typescript
const VALID_TEAMS = [
  'ANA', 'BOS', 'BUF', 'CAR', 'CBJ', 'CGY', 'CHI', 'COL', 'DAL', 'DET',
  'EDM', 'FLA', 'LAK', 'MIN', 'MTL', 'NJD', 'NSH', 'NYI', 'NYR', 'OTT',
  'PHI', 'PIT', 'SEA', 'SJS', 'STL', 'TBL', 'TOR', 'UTA', 'VAN', 'VGK',
  'WPG', 'WSH'
];

export function normalizeTeamAbbr(team: string): string {
  const normalized = team.toUpperCase();

  if (!VALID_TEAMS.includes(normalized)) {
    throw new ValidationError(
      `Invalid team abbreviation: "${team}". Must be one of: ${VALID_TEAMS.join(', ')}`
    );
  }

  return normalized;
}
```

#### 4.2 Season Calculator ([src/utils/season-calculator.ts](src/utils/season-calculator.ts)) ✅

```typescript
export function getCurrentSeasonId(): number {
  const now = new Date();
  const year = now.getFullYear();
  const month = now.getMonth(); // 0-11

  // NHL season runs from October (month 9) to June (month 5)
  if (month >= 9) {
    return parseInt(`${year}${year + 1}`);
  } else {
    return parseInt(`${year - 1}${year}`);
  }
}
```

#### 4.3 Date Formatter ([src/utils/date-formatter.ts](src/utils/date-formatter.ts)) ✅

```typescript
export function formatDate(date: string | Date): string {
  if (typeof date === 'string') {
    // Validate YYYY-MM-DD format
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      throw new ValidationError(
        `Invalid date format: "${date}". Expected YYYY-MM-DD`
      );
    }
    return date;
  }

  // Convert Date object to YYYY-MM-DD
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');

  return `${year}-${month}-${day}`;
}
```

### Phase 5: Module Implementation ✅

#### 5.1 Schedule Module ([src/modules/schedule.ts](src/modules/schedule.ts)) ✅
#### 5.2 Games Module ([src/modules/games.ts](src/modules/games.ts)) ✅
#### 5.3 Teams Module ([src/modules/teams.ts](src/modules/teams.ts)) ✅
#### 5.4 Players Module ([src/modules/players.ts](src/modules/players.ts)) ✅
#### 5.5 Standings Module ([src/modules/standings.ts](src/modules/standings.ts)) ✅

### Phase 6: Main Client & Entry Point ✅

#### 6.1 Main Client ([src/client.ts](src/client.ts)) ✅

```typescript
export interface ClientOptions {
  timeout?: number;
}

export class NHLClient {
  private httpClient: HttpClient;

  public readonly schedule: ScheduleModule;
  public readonly games: GamesModule;
  public readonly teams: TeamsModule;
  public readonly players: PlayersModule;
  public readonly standings: StandingsModule;

  constructor(options?: ClientOptions) {
    this.httpClient = new HttpClient(options);

    this.schedule = new ScheduleModule(this.httpClient);
    this.games = new GamesModule(this.httpClient);
    this.teams = new TeamsModule(this.httpClient);
    this.players = new PlayersModule(this.httpClient);
    this.standings = new StandingsModule(this.httpClient);
  }
}
```

#### 6.2 Public API Exports ([src/index.ts](src/index.ts)) ✅

```typescript
export { NHLClient } from './client';
export type { ClientOptions } from './client';

// Export error classes
export {
  NHLClientError,
  NetworkError,
  NotFoundError,
  ValidationError,
  RateLimitError,
  ServerError
} from './core/errors';

// Export all type interfaces
export * from './types/common';
export * from './types/schedule';
export * from './types/game';
export * from './types/team';
export * from './types/player';
export * from './types/standings';
```

### Phase 7: Documentation ✅

#### 7.1 Update README ([README.md](README.md)) ✅

Comprehensive documentation including:
- Installation instructions
- Quick start example
- API documentation for all modules
- Error handling examples
- TypeScript usage examples
- Three complete usage examples

## Critical Files

The following files are foundational and were implemented first:

1. ✅ **[src/core/http-client.ts](src/core/http-client.ts)** - Base HTTP client handling all API communication
2. ✅ **[src/core/errors.ts](src/core/errors.ts)** - Error class hierarchy for consistent error handling
3. ✅ **[src/types/common.ts](src/types/common.ts)** - Shared interfaces used across all modules
4. ✅ **[src/utils/team-normalizer.ts](src/utils/team-normalizer.ts)** - Team validation used by multiple modules
5. ✅ **[src/client.ts](src/client.ts)** - Main NHLClient orchestrating all modules

## Implementation Status

### ✅ COMPLETED

All phases have been successfully implemented:

1. ✅ **Configuration** - tsconfig.json, package.json, .gitignore
2. ✅ **Core layer** - api-config.ts, errors.ts, http-client.ts, types.ts
3. ✅ **Type definitions** - All type files (common, schedule, game, team, player, standings)
4. ✅ **Utilities** - team-normalizer.ts, season-calculator.ts, date-formatter.ts
5. ✅ **Modules** - schedule.ts, games.ts, teams.ts, players.ts, standings.ts
6. ✅ **Main client** - client.ts, index.ts
7. ✅ **Documentation** - README.md with comprehensive examples
8. ✅ **Build** - Project successfully compiles with TypeScript

## Verification

### Build Verification ✅

```bash
npm run build        # ✅ Compiles without errors
```

Build output verified in `dist/` directory with:
- JavaScript files (.js)
- TypeScript declaration files (.d.ts)
- Source maps (.js.map, .d.ts.map)

### Next Steps

To fully verify the implementation:

1. **Manual Testing** - Test against live NHL API endpoints:
   ```bash
   # Create a test script and run:
   npm run build && node dist/test-client.js
   ```

2. **Package Verification**:
   ```bash
   npm pack             # Create a .tgz package for distribution
   ```

3. **Type Checking**:
   ```bash
   npx tsc --noEmit     # Verify no type errors
   ```

## Key Design Decisions

1. ✅ **Zero dependencies** - Uses native fetch for maximum compatibility
2. ✅ **Fluent API** - Builder pattern for readable, chained calls
3. ✅ **No caching** - Kept MVP simple as requested
4. ✅ **Fail fast** - Validates inputs immediately with clear error messages
5. ✅ **TypeScript-first** - All responses fully typed for excellent DX
6. ✅ **Modular architecture** - Easy to extend with new endpoints/features

## Success Criteria

- ✅ Developer can fetch any schedule in ≤2 lines of code
- ✅ Can build a live scoreboard with <10 lines of code
- ✅ Access team data using just team abbreviation
- ✅ Search and retrieve player data in 1 API call
- ✅ Latest standings in 1 line of code
- ✅ Meaningful error messages (not just HTTP codes)
- ✅ Type-safe responses for all endpoints
- ✅ Zero runtime dependencies

## Files Created

### Configuration Files
- `package.json` - Project metadata and dependencies
- `tsconfig.json` - TypeScript compiler configuration
- `.gitignore` - Git ignore patterns

### Core Layer (src/core/)
- `api-config.ts` - API endpoints and base URLs
- `errors.ts` - Custom error classes
- `http-client.ts` - HTTP client with fetch
- `types.ts` - Shared utility types

### Type Definitions (src/types/)
- `common.ts` - Common interfaces (Team, GameDate, Score, etc.)
- `schedule.ts` - Schedule-related types
- `game.ts` - Game-related types (scores, boxscores, play-by-play)
- `team.ts` - Team-related types (rosters, stats)
- `player.ts` - Player-related types (search, stats)
- `standings.ts` - Standings types

### Utilities (src/utils/)
- `team-normalizer.ts` - Team abbreviation validation
- `season-calculator.ts` - Current season calculation
- `date-formatter.ts` - Date formatting utilities

### Modules (src/modules/)
- `schedule.ts` - Schedule operations
- `games.ts` - Live game data
- `teams.ts` - Team information
- `players.ts` - Player information
- `standings.ts` - Standings

### Main Entry Points (src/)
- `client.ts` - Main NHLClient class
- `index.ts` - Public API exports

### Documentation
- `README.md` - Comprehensive user documentation
