import { Parlay, Bet } from "../types";
import betsHistoryData from "../data/betsHistory.json";

/**
 * Bet Tracking Service
 *
 * Currently uses local JSON file for bet history.
 *
 * TODO: Future enhancements:
 * 1. Migrate to Supabase database for persistence
 * 2. Add ability to create new parlays through UI
 * 3. Implement automatic result tracking via API
 * 4. Add analytics and pattern recognition
 * 5. Calculate ROI and other betting metrics
 *
 * Database Schema (when ready to migrate):
 * - parlays table: id, week, season, total_odds, total_amount, result, payout
 * - bets table: id, parlay_id, player_name, odds, bet_amount, result, scored
 */

export const getBetHistory = (): Parlay[] => {
  return betsHistoryData.parlays as Parlay[];
};

export const getParlaysByWeek = (week: number, season: number): Parlay[] => {
  return getBetHistory().filter(
    (parlay) => parlay.week === week && parlay.season === season
  );
};

export const getParlaysBySeason = (season: number): Parlay[] => {
  return getBetHistory().filter((parlay) => parlay.season === season);
};

/**
 * Calculate success rate for a given season
 */
export const calculateSeasonStats = (season: number) => {
  const parlays = getParlaysBySeason(season);

  const totalParlays = parlays.length;
  const wins = parlays.filter((p) => p.result === "win").length;
  const losses = parlays.filter((p) => p.result === "loss").length;
  const pending = parlays.filter((p) => p.result === "pending").length;

  const totalWagered = parlays.reduce((sum, p) => sum + p.totalAmount, 0);
  const totalPayout = parlays.reduce((sum, p) => sum + (p.payout || 0), 0);
  const netProfit = totalPayout - totalWagered;

  const winRate = totalParlays > 0 ? (wins / totalParlays) * 100 : 0;

  return {
    totalParlays,
    wins,
    losses,
    pending,
    winRate: Math.round(winRate * 10) / 10,
    totalWagered,
    totalPayout,
    netProfit,
    roi:
      totalWagered > 0 ? ((netProfit / totalWagered) * 100).toFixed(2) : "0.00",
  };
};

/**
 * Analyze patterns in betting history
 * TODO: Implement more sophisticated pattern recognition
 */
export const analyzePatterns = (season: number) => {
  const parlays = getParlaysBySeason(season);
  const allBets: Bet[] = parlays.flatMap((p) => p.bets);

  // Calculate success rate by position
  const positionStats = new Map<string, { total: number; wins: number }>();

  allBets.forEach((bet) => {
    // Extract position from player name (this is mock logic, real implementation needs actual position data)
    const position = "Unknown"; // TODO: Get actual position from player data

    if (!positionStats.has(position)) {
      positionStats.set(position, { total: 0, wins: 0 });
    }

    const stats = positionStats.get(position)!;
    stats.total++;
    if (bet.scored) stats.wins++;
  });

  // Calculate success rate by odds range
  const oddsRanges = [
    { min: 0, max: 500, label: "Heavy Favorites (< +500)" },
    { min: 500, max: 1000, label: "Moderate (+500 to +1000)" },
    { min: 1000, max: Infinity, label: "Longshots (+1000+)" },
  ];

  const oddsStats = oddsRanges.map((range) => {
    const betsInRange = allBets.filter(
      (bet) => bet.odds >= range.min && bet.odds < range.max
    );
    const wins = betsInRange.filter((bet) => bet.scored).length;

    return {
      label: range.label,
      total: betsInRange.length,
      wins,
      winRate:
        betsInRange.length > 0
          ? Math.round((wins / betsInRange.length) * 100)
          : 0,
    };
  });

  return {
    positionStats: Array.from(positionStats.entries()).map(
      ([position, stats]) => ({
        position,
        total: stats.total,
        wins: stats.wins,
        winRate:
          stats.total > 0 ? Math.round((stats.wins / stats.total) * 100) : 0,
      })
    ),
    oddsStats,
  };
};

/**
 * TODO: Add function to save new parlays
 * This will need to write to database when that's implemented
 */
export const saveParlayToHistory = (parlay: Parlay): void => {
  // TODO: Implement database save
  // For now, you'll need to manually add to betsHistory.json
};
