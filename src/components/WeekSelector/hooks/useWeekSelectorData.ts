import { useWeekNumbers } from './useWeekNumbers';
import { useWeekAssignments } from './useWeekAssignments';

/**
 * Combined hook that returns all week selector data
 * Use this for a simpler API if you need multiple pieces of data
 */
export const useWeekSelectorData = (season: number) => {
  const weekNumbers = useWeekNumbers();
  const assignments = useWeekAssignments(season);

  return {
    weekNumbers,
    assignments,
  };
};
