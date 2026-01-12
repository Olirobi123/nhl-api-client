/**
 * NHL API base URLs
 */
export const API_ENDPOINTS = {
  NHL_WEB: 'https://api-web.nhle.com/v1',
  NHL_STATS: 'https://api.nhle.com/stats/rest/en',
  NHL_SEARCH: 'https://search.d3.nhle.com/api/v1'
} as const;

/**
 * NHL API endpoint patterns
 */
export const ENDPOINTS = {
  // Schedule endpoints
  SCHEDULE_NOW: '/schedule/now',
  SCHEDULE_DATE: '/schedule/:date',
  TEAM_SCHEDULE_SEASON: '/club-schedule-season/:team/now',
  TEAM_SCHEDULE_WEEK: '/club-schedule/:team/week/now',
  TEAM_SCHEDULE_MONTH: '/club-schedule/:team/month/now',

  // Score endpoints
  SCORE_NOW: '/score/now',

  // Game center endpoints
  GAMECENTER_BOXSCORE: '/gamecenter/:gameId/boxscore',
  GAMECENTER_PLAY_BY_PLAY: '/gamecenter/:gameId/play-by-play',

  // Roster endpoints
  ROSTER: '/roster/:team/:season',

  // Team stats endpoints
  CLUB_STATS: '/club-stats-season/:team',

  // Player endpoints
  PLAYER_SEARCH: '/search/player',
  PLAYER_LANDING: '/player/:playerId/landing',

  // Standings endpoints
  STANDINGS_NOW: '/standings/now',
  STANDINGS_SEASON: '/standings-season'
} as const;
