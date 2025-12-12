import { useMemo } from 'react';

/**
 * Hook to determine if net profit is positive
 */
export const useIsNetProfitPositive = (netProfit: number): boolean => {
  return useMemo(() => netProfit >= 0, [netProfit]);
};
