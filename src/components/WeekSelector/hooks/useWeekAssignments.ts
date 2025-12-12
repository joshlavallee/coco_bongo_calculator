import { useMemo } from 'react';
import weekAssignments from '../../../data/weekAssignments.json';

/**
 * Hook to get week assignments for a specific season
 * Memoized based on season
 */
export const useWeekAssignments = (season: number): Record<string, string> => {
  return useMemo(() => {
    return weekAssignments[season.toString() as keyof typeof weekAssignments] || {};
  }, [season]);
};
