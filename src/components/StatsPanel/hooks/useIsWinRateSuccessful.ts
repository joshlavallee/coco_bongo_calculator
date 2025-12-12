import { useMemo } from 'react';

/**
 * Hook to determine if win rate is successful (>= 50%)
 */
export const useIsWinRateSuccessful = (winRate: number): boolean => {
  return useMemo(() => winRate >= 50, [winRate]);
};
