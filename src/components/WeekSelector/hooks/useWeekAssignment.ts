import { useMemo } from 'react';
import { useWeekAssignments } from './useWeekAssignments';

/**
 * Hook to get the assigned name for a specific week
 * Returns undefined if no assignment exists
 */
export const useWeekAssignment = (season: number, week: number): string | undefined => {
  const assignments = useWeekAssignments(season);
  
  return useMemo(() => {
    return assignments[week.toString()];
  }, [assignments, week]);
};
