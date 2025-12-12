import { useMemo } from 'react';
import { calculateSeasonStats } from '../../../services/betTracking';

/**
 * Hook to calculate season statistics
 * Memoized to prevent recalculation on every render
 */
export const useSeasonStats = (season: number) => {
  return useMemo(() => {
    return calculateSeasonStats(season);
  }, [season]);
};
