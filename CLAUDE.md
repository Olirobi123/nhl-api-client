# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

A lightweight TypeScript client library for the NHL's web API. Zero runtime dependencies, uses native fetch. The design philosophy is "From URL chaos to clean data in one line of code."

## Build Commands

```bash
# Build the project (cleans dist/ then compiles TypeScript)
npm run build

# Watch mode for development
npm run watch

# Type check without emitting
npx tsc --noEmit
```

## Architecture

### Core Design Pattern

The client uses a **modular architecture with builder pattern** for fluent API:
- `NHLClient` is the main entry point that orchestrates all modules
- Each module (schedule, games, teams, players, standings) is independent
- All modules share a single `HttpClient` instance for request handling
- Builder classes (e.g., `TeamScheduleBuilder`) enable method chaining

### Module Structure

```
src/
├── client.ts                 # Main NHLClient class - orchestrates all modules
├── index.ts                  # Public API exports
├── core/                     # Foundation layer (shared by all modules)
│   ├── http-client.ts        # Fetch wrapper with error handling & timeout
│   ├── api-config.ts         # API endpoints and base URLs
│   ├── errors.ts             # Custom error class hierarchy
│   └── types.ts              # Shared utility types
├── modules/                  # Feature modules (schedule, games, teams, players, standings)
│   └── [module].ts           # Each module handles its domain (may include builder classes)
├── types/                    # TypeScript interfaces per domain
│   └── [domain].ts           # Response shape definitions from NHL API
└── utils/                    # Pure utility functions
    ├── team-normalizer.ts    # Validates & normalizes team abbreviations
    ├── season-calculator.ts  # Computes current NHL season ID
    └── date-formatter.ts     # Converts Date objects to YYYY-MM-DD
```

### HTTP Client Routing

The `HttpClient` routes requests to different base URLs based on endpoint:
- `/search/player` → `https://search.d3.nhle.com/api/v1`
- All other endpoints → `https://api-web.nhle.com/v1`

### Error Handling Strategy

All errors inherit from `NHLClientError`:
- `ValidationError` - Invalid input (thrown immediately before requests)
- `NotFoundError` - HTTP 404
- `NetworkError` - Connection issues, timeouts
- `RateLimitError` - HTTP 429
- `ServerError` - HTTP 5xx

Validation happens **before** HTTP requests (fail fast).

### Critical Architectural Files

These files are foundational and changes here affect all modules:

1. **src/core/http-client.ts** - All API communication goes through this class. Changes affect timeout handling, error mapping, base URL routing.

2. **src/core/errors.ts** - Error hierarchy. Adding new error types requires updating http-client error handling.

3. **src/client.ts** - Main orchestrator. Adding new modules requires:
   - Import the module class
   - Add property to `NHLClient`
   - Initialize in constructor
   - Export types from index.ts

4. **src/utils/team-normalizer.ts** - Team validation used by schedule, teams, and other modules. Update `VALID_TEAMS` when NHL adds/removes teams (e.g., UTA is Utah Hockey Club).

## NHL Season ID Format

Season IDs are 8-digit numbers: `YYYYZZZZ` where `YYYY` is start year and `ZZZZ` is end year.
- Example: 2025-26 season = `20252026`
- NHL season runs October to June (cutoff is September/October)

The `getCurrentSeasonId()` utility handles this calculation automatically.

## Team Abbreviations

The client accepts case-insensitive team abbreviations and normalizes to uppercase. Valid teams are hardcoded in `src/utils/team-normalizer.ts`:

```
ANA BOS BUF CAR CBJ CGY CHI COL DAL DET EDM FLA LAK MIN MTL
NJD NSH NYI NYR OTT PHI PIT SEA SJS STL TBL TOR UTA VAN VGK WPG WSH
```

**Note:** UTA is Utah Hockey Club (formerly Arizona Coyotes).

## Testing the Library

The `test/` directory contains a simple manual test harness using ES modules:

```bash
cd test
node index.js
```

Edit `test/index.js` to uncomment different client methods for testing against live NHL API.

## Design Constraints

- **Zero runtime dependencies** - Uses native Node.js fetch (requires Node 18+)
- **No caching** - Every request hits the NHL API
- **CommonJS output** - TypeScript compiles to CommonJS in dist/
- **Fail fast validation** - Invalid inputs throw immediately before making HTTP requests
- **Type-safe responses** - All NHL API responses have TypeScript interfaces

## Adding New Endpoints

1. Add endpoint pattern to `src/core/api-config.ts`
2. Create/update types in `src/types/[domain].ts`
3. Add method to appropriate module in `src/modules/[module].ts`
4. If creating a new module:
   - Create module class file
   - Update `src/client.ts` to initialize the module
   - Export types from `src/index.ts`

## Common Issues

**Import errors in test/** - The test directory uses ES modules (`"type": "module"`) but the compiled library is CommonJS. This is intentional for npm package compatibility.

**Date format errors** - NHL API expects `YYYY-MM-DD`. The `formatDate()` utility handles both string and Date object inputs.

**Team abbreviation rejections** - Team abbreviations are validated against a hardcoded list. If NHL adds/removes teams, update `VALID_TEAMS` in `src/utils/team-normalizer.ts`.
