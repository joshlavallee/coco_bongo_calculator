import { useMemo } from 'react';

/**
 * Hook to check if a week is the selected week
 */
export const useIsWeekSelected = (week: number, selectedWeek: number): boolean => {
  return useMemo(() => week === selectedWeek, [week, selectedWeek]);
};
