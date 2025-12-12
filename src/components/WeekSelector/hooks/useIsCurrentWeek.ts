import { useMemo } from 'react';

/**
 * Hook to check if a week is the current week
 */
export const useIsCurrentWeek = (week: number, currentWeek: number): boolean => {
  return useMemo(() => week === currentWeek, [week, currentWeek]);
};
