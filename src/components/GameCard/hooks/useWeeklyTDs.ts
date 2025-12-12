import { useMemo } from 'react';
import { getWeeklyTDs } from '../utils';

/**
 * Hook to get weekly TDs
 * Memoized to prevent regenerating the array on every render
 * Note: This currently uses random data - in production, this should fetch real data
 */
export const useWeeklyTDs = (currentWeek: number): (number | null)[] => {
  return useMemo(() => getWeeklyTDs(currentWeek), [currentWeek]);
};
