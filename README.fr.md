# Client API NHL

**[English Documentation](README.md)**

Une bibliothèque client TypeScript légère et conviviale pour l'API web de la LNH. Obtenez les calendriers de matchs, les scores en direct, les statistiques des joueurs et les informations des équipes sans avoir à gérer les requêtes HTTP brutes ou à comprendre les schémas d'endpoints complexes.

## Fonctionnalités

- **Zéro dépendance** - Utilise fetch natif, fonctionne avec Node.js 18+ et les navigateurs
- **Type-safe** - Support complet de TypeScript avec des définitions de types détaillées
- **API fluide** - Méthodes intuitives et chaînables pour un code lisible
- **Valeurs par défaut intelligentes** - Détecte automatiquement la saison actuelle, normalise les abréviations des équipes
- **Gestion des erreurs** - Messages d'erreur significatifs avec contexte
- **Simple** - Aucune configuration nécessaire, il suffit d'installer et d'utiliser

## Installation

```bash
npm install @olirobi/nhl-api-client
```

## Démarrage rapide

```typescript
import { NHLClient } from '@olirobi/nhl-api-client';

const client = new NHLClient();

// Obtenir les matchs d'aujourd'hui
const games = await client.schedule.today();

// Obtenir les scores en direct
const scores = await client.games.scores();

// Obtenir l'alignement d'une équipe (insensible à la casse, utilise automatiquement la saison en cours)
const roster = await client.teams.get("wpg").roster();

// Rechercher un joueur
const players = await client.players.search("Connor McDavid");

// Obtenir le classement actuel
const standings = await client.standings.current();
```

## Documentation de l'API

### Opérations de calendrier

Obtenez les calendriers de matchs pour aujourd'hui, des dates spécifiques ou des équipes.

```typescript
// Matchs d'aujourd'hui
const today = await client.schedule.today();

// Matchs à une date spécifique
const date = await client.schedule.getDate("2026-01-11");
// Ou avec un objet Date
const date = await client.schedule.getDate(new Date());

// Calendrier complet de la saison d'une équipe
const season = await client.schedule.team("TOR").season();
// Saison spécifique
const season = await client.schedule.team("TOR").season(20242025);

// Calendrier hebdomadaire d'une équipe
const week = await client.schedule.team("TOR").week();

// Calendrier mensuel d'une équipe
const month = await client.schedule.team("TOR").month();
```

### Données de match en direct

Obtenez les scores en temps réel, les feuilles de match et les données jeu par jeu.

```typescript
// Scores actuels pour tous les matchs
const scores = await client.games.scores();

// Feuille de match détaillée pour un match spécifique
const boxscore = await client.games.boxscore(2025020711);

// Événements jeu par jeu
const plays = await client.games.playByPlay(2025020711);
```

### Information sur les équipes

Accédez aux alignements et aux statistiques des équipes.

```typescript
// Alignement de l'équipe (utilise automatiquement la saison en cours)
const roster = await client.teams.get("WPG").roster();

// Alignement pour une saison spécifique
const roster = await client.teams.get("WPG").roster(20242025);

// Statistiques de la saison de l'équipe
const stats = await client.teams.get("WPG").stats();
```

**Abréviations d'équipes valides:** ANA, BOS, BUF, CAR, CBJ, CGY, CHI, COL, DAL, DET, EDM, FLA, LAK, MIN, MTL, NJD, NSH, NYI, NYR, OTT, PHI, PIT, SEA, SJS, STL, TBL, TOR, UTA, VAN, VGK, WPG, WSH

### Information sur les joueurs

Recherchez des joueurs et obtenez leurs statistiques.

```typescript
// Rechercher des joueurs par nom
const results = await client.players.search("Matthews");

// Obtenir les statistiques et informations d'un joueur
const player = await client.players.get(8478402).stats();
```

### Classements

Obtenez les classements actuels de la ligue.

```typescript
// Classements actuels
const standings = await client.standings.current();

// Classements de la saison
const standings = await client.standings.season();
```

## Gestion des erreurs

Le client fournit des types d'erreurs spécifiques pour une meilleure gestion des erreurs:

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
    // Entrée invalide (ex: mauvaise abréviation d'équipe, format de date invalide)
    console.error('Entrée invalide:', error.message);
  } else if (error instanceof NotFoundError) {
    // Ressource non trouvée (404)
    console.error('Non trouvé:', error.message);
  } else if (error instanceof NetworkError) {
    // Problèmes de réseau (timeout, erreur de connexion)
    console.error('Erreur réseau:', error.message);
  }
}
```

**Types d'erreurs:**
- `ValidationError` - Paramètres d'entrée invalides
- `NotFoundError` - Réponses 404
- `NetworkError` - Problèmes de connexion/timeout
- `RateLimitError` - Limite de taux dépassée (429)
- `ServerError` - Erreurs serveur (5xx)
- `NHLClientError` - Classe d'erreur de base pour toutes les erreurs

## Configuration

```typescript
const client = new NHLClient({
  timeout: 15000  // Délai d'expiration de la requête en millisecondes (par défaut: 10000)
});
```

## Support de TypeScript

Toutes les réponses de l'API sont entièrement typées:

```typescript
import { ScheduleResponse, GameScore, PlayerStatsResponse } from '@olirobi/nhl-api-client';

const games: ScheduleResponse = await client.schedule.today();
const scores: ScoreResponse = await client.games.scores();
const player: PlayerStatsResponse = await client.players.get(8478402).stats();
```

## Utilisation avancée

### Fonctions utilitaires

Le client exporte des fonctions utilitaires pour des cas d'utilisation avancés:

```typescript
import {
  normalizeTeamAbbr,
  getCurrentSeasonId,
  formatDate
} from '@olirobi/nhl-api-client';

// Valider et normaliser les abréviations d'équipes
const team = normalizeTeamAbbr("wpg"); // Retourne "WPG"

// Obtenir l'ID de la saison NHL actuelle
const season = getCurrentSeasonId(); // Retourne 20252026 pour la saison 2025-26

// Formater les dates
const date = formatDate(new Date()); // Retourne "2026-01-11"
```

## Exemples

### Créer un tableau de scores en direct

```typescript
const client = new NHLClient();

async function displayScoreboard() {
  const scores = await client.games.scores();

  for (const game of scores.games || []) {
    console.log(`${game.awayTeam.abbrev} ${game.awayTeam.score} @ ${game.homeTeam.abbrev} ${game.homeTeam.score}`);
    console.log(`Période ${game.period} - ${game.gameState}`);
    console.log('---');
  }
}

displayScoreboard();
```

### Obtenir le calendrier d'une équipe

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

### Trouver les statistiques d'un joueur

```typescript
const client = new NHLClient();

async function findPlayerStats(name: string) {
  // Rechercher le joueur
  const searchResults = await client.players.search(name);

  if (!searchResults.players || searchResults.players.length === 0) {
    console.log('Joueur non trouvé');
    return;
  }

  // Obtenir les statistiques du premier résultat
  const player = searchResults.players[0];
  const stats = await client.players.get(player.playerId).stats();

  console.log(`${stats.firstName?.default} ${stats.lastName?.default}`);
  console.log(`Équipe: ${stats.currentTeamAbbrev}`);
  console.log(`Position: ${stats.position}`);

  if (stats.featuredStats?.regularSeason?.subSeason) {
    const season = stats.featuredStats.regularSeason.subSeason;
    console.log(`Buts: ${season.goals}`);
    console.log(`Passes: ${season.assists}`);
    console.log(`Points: ${season.points}`);
  }
}

findPlayerStats("Auston Matthews");
```

## Exigences

- Node.js 18.0.0 ou supérieur (pour le support de fetch natif)
- TypeScript 5.0+ (pour les utilisateurs de TypeScript)

## Licence

MIT

## Contribuer

Les contributions sont les bienvenues! N'hésitez pas à soumettre une Pull Request.

## Support

Pour les problèmes et questions, veuillez utiliser le [suivi des problèmes GitHub](https://github.com/Olirobi123/nhl-api-client/issues).

## Remerciements

Cette bibliothèque utilise l'API web non officielle de la LNH. Elle n'est pas affiliée à la Ligue nationale de hockey ni approuvée par celle-ci.

Un merci spécial à [Drew Hynes](https://gitlab.com/dword4/nhlapi) pour sa documentation complète de l'API NHL, qui a été inestimable dans le développement de ce client.
