import { useSeasonStats } from './useSeasonStats';
import { useIsWinRateSuccessful } from './useIsWinRateSuccessful';
import { useIsNetProfitPositive } from './useIsNetProfitPositive';

/**
 * Combined hook that returns all stats panel data
 * Use this for a simpler API if you need multiple pieces of data
 */
export const useStatsPanelData = (season: number) => {
  const stats = useSeasonStats(season);
  const isWinRateSuccessful = useIsWinRateSuccessful(stats.winRate);
  const isNetProfitPositive = useIsNetProfitPositive(stats.netProfit);

  return {
    stats,
    isWinRateSuccessful,
    isNetProfitPositive,
  };
};
