import { Game, Player, Weather } from '../types';

/**
 * Player Recommendation Algorithm
 *
 * This service analyzes game conditions, team statistics, and player data
 * to recommend touchdown scorers with the best odds for parlays.
 *
 * ALGORITHM CUSTOMIZATION POINTS:
 * ================================
 * 1. Weather Impact (lines 25-50)
 *    - Adjust how weather conditions affect player scores
 *    - Cold/snow favors run game, wind affects passing
 *
 * 2. Matchup Analysis (lines 52-80)
 *    - Customize how defensive rankings impact offensive player selection
 *    - Consider offensive line rankings, injury reports
 *
 * 3. Recent Usage Patterns (lines 82-110)
 *    - Factor in snap counts, recent carries, targets
 *    - Identify trending backup RBs with increased workload
 *
 * 4. Scoring Weights (lines 112-140)
 *    - Adjust multipliers for different factors
 *    - Balance between safe picks and high-value opportunities
 */

interface PlayerData {
  id: string;
  name: string;
  team: string;
  position: 'QB' | 'RB' | 'WR' | 'TE';
  odds: number;
  recentCarries?: number;
  recentTargets?: number;
  recentTouchdowns?: number;
  snapPercentage?: number;
}

/**
 * Calculate weather impact on player scoring probability
 * TODO: Customize these multipliers based on your analysis
 */
const calculateWeatherImpact = (weather: Weather, position: string): number => {
  let impact = 1.0;

  // Cold weather and precipitation favor running game
  if (weather.temperature < 35) {
    impact *= position === 'RB' ? 1.2 : 0.9;
  }

  // High wind affects passing game
  if (weather.windSpeed > 15) {
    impact *= position === 'QB' || position === 'WR' ? 0.85 : 1.1;
  }

  // Precipitation favors ground game
  if (weather.precipitation > 30) {
    impact *= position === 'RB' ? 1.25 : 0.88;
  }

  // TODO: Add more weather condition logic here
  // - Consider dome vs outdoor stadiums
  // - Factor in temperature extremes (very hot or very cold)
  // - Account for specific player performance in weather

  return impact;
};

/**
 * Analyze defensive matchup for player
 * TODO: Expand this to include more defensive metrics
 */
const calculateMatchupScore = (
  player: PlayerData,
  opposingDefensePassRank: number,
  opposingDefenseRushRank: number
): number => {
  let score = 0;

  // Lower rank number = better defense, so inverse for scoring
  const passDefenseScore = (33 - opposingDefensePassRank) / 32;
  const rushDefenseScore = (33 - opposingDefenseRushRank) / 32;

  if (player.position === 'RB') {
    score = rushDefenseScore * 100;
    // TODO: Add additional factors:
    // - Opponent's yards per carry allowed
    // - Red zone defense statistics
    // - Recent trend (last 3 games performance)
  } else if (player.position === 'WR' || player.position === 'TE') {
    score = passDefenseScore * 100;
    // TODO: Add additional factors:
    // - Slot vs outside WR matchups
    // - CB rankings for specific matchups
    // - Zone vs man coverage tendencies
  } else if (player.position === 'QB') {
    score = passDefenseScore * 80 + rushDefenseScore * 20;
    // TODO: Add QB rushing touchdown probability
  }

  return score;
};

/**
 * Calculate recent usage trend score
 * TODO: Implement actual historical data fetching
 */
const calculateUsageTrend = (player: PlayerData): number => {
  let score = 50;

  // Recent carries for RBs
  if (player.position === 'RB' && player.recentCarries) {
    if (player.recentCarries > 15) score += 30;
    else if (player.recentCarries > 10) score += 20;
    else if (player.recentCarries < 5) score -= 20;

    // TODO: Implement backup RB logic
    // - Detect if this is a backup getting increased workload
    // - Factor in starter injury status
    // - Consider goal-line usage specifically
  }

  // Recent targets for pass catchers
  if ((player.position === 'WR' || player.position === 'TE') && player.recentTargets) {
    if (player.recentTargets > 8) score += 25;
    else if (player.recentTargets > 5) score += 15;
    else if (player.recentTargets < 3) score -= 15;

    // TODO: Add red zone target tracking
  }

  // Recent touchdown rate
  if (player.recentTouchdowns) {
    score += player.recentTouchdowns * 15;
  }

  return score;
};

/**
 * Calculate overall player score for touchdown probability
 * TODO: Adjust these weights based on your analysis and tracking data
 */
const calculatePlayerScore = (
  player: PlayerData,
  game: Game,
  isHome: boolean
): number => {
  const opposingTeam = isHome ? game.awayTeam : game.homeTeam;

  // Base scores
  const weatherImpact = calculateWeatherImpact(game.weather, player.position);
  const matchupScore = calculateMatchupScore(
    player,
    opposingTeam.passDefenseRank,
    opposingTeam.rushDefenseRank
  );
  const usageTrend = calculateUsageTrend(player);

  // Odds value calculation (higher odds = better value if they hit)
  const oddsValue = player.odds > 0 ? Math.log(player.odds / 100) * 10 : 0;

  // TODO: Customize these weights based on your historical data
  const WEIGHTS = {
    matchup: 0.35,
    weather: 0.20,
    usage: 0.30,
    odds: 0.15,
  };

  const totalScore =
    matchupScore * WEIGHTS.matchup * weatherImpact +
    usageTrend * WEIGHTS.usage +
    oddsValue * WEIGHTS.odds;

  return totalScore;
};

/**
 * Determine if a player is a high-value pick
 * High-value = high scoring game potential + high odds
 */
const isHighValuePick = (player: Player, game: Game): boolean => {
  // TODO: Customize these thresholds based on your strategy
  const HIGH_TOTAL_THRESHOLD = 50;
  const HIGH_ODDS_THRESHOLD = 800;

  return game.overUnder !== null && game.overUnder >= HIGH_TOTAL_THRESHOLD && player.odds >= HIGH_ODDS_THRESHOLD;
};

/**
 * Main function to get recommended players for a game
 */
export const getRecommendedPlayers = (game: Game): Player[] => {
  // TODO: Replace with real player data from API or database
  // This should fetch actual player stats, recent performance, and odds

  const mockPlayers: PlayerData[] = [
    // Home team players
    { id: '1', name: `${game.homeTeam.name} RB1`, team: game.homeTeam.abbreviation, position: 'RB', odds: 350, recentCarries: 18, recentTouchdowns: 2 },
    { id: '2', name: `${game.homeTeam.name} RB2`, team: game.homeTeam.abbreviation, position: 'RB', odds: 900, recentCarries: 8, recentTouchdowns: 0 },
    { id: '3', name: `${game.homeTeam.name} WR1`, team: game.homeTeam.abbreviation, position: 'WR', odds: 400, recentTargets: 10, recentTouchdowns: 1 },
    { id: '4', name: `${game.homeTeam.name} WR2`, team: game.homeTeam.abbreviation, position: 'WR', odds: 650, recentTargets: 6, recentTouchdowns: 1 },
    { id: '5', name: `${game.homeTeam.name} TE`, team: game.homeTeam.abbreviation, position: 'TE', odds: 550, recentTargets: 7, recentTouchdowns: 0 },
    { id: '6', name: `${game.homeTeam.name} QB`, team: game.homeTeam.abbreviation, position: 'QB', odds: 1200, recentTouchdowns: 3 },
    // Away team players
    { id: '7', name: `${game.awayTeam.name} RB1`, team: game.awayTeam.abbreviation, position: 'RB', odds: 400, recentCarries: 16, recentTouchdowns: 1 },
    { id: '8', name: `${game.awayTeam.name} RB2`, team: game.awayTeam.abbreviation, position: 'RB', odds: 1100, recentCarries: 12, recentTouchdowns: 1 },
    { id: '9', name: `${game.awayTeam.name} WR1`, team: game.awayTeam.abbreviation, position: 'WR', odds: 350, recentTargets: 12, recentTouchdowns: 2 },
    { id: '10', name: `${game.awayTeam.name} WR2`, team: game.awayTeam.abbreviation, position: 'WR', odds: 700, recentTargets: 5, recentTouchdowns: 0 },
  ];

  const scoredPlayers: Player[] = mockPlayers.map(playerData => {
    const isHome = playerData.team === game.homeTeam.abbreviation;
    const score = calculatePlayerScore(playerData, game, isHome);

    const player: Player = {
      id: playerData.id,
      name: playerData.name,
      team: playerData.team,
      position: playerData.position,
      odds: playerData.odds,
      recentCarries: playerData.recentCarries,
      recentTargets: playerData.recentTargets,
      score: Math.round(score),
      isHighValue: false,
    };

    player.isHighValue = isHighValuePick(player, game);

    return player;
  });

  // Sort by score descending
  return scoredPlayers.sort((a, b) => b.score - a.score);
};

/**
 * Get the top recommended player for a game (for parlay building)
 */
export const getTopPick = (game: Game): Player => {
  const players = getRecommendedPlayers(game);
  return players[0];
};
