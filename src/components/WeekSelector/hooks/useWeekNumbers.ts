import { useMemo } from 'react';
import { NUMBER_OF_WEEKS } from '../constants';

/**
 * Hook to generate array of week numbers
 * Memoized to prevent array recreation on every render
 */
export const useWeekNumbers = (): number[] => {
  return useMemo(() => {
    return Array.from({ length: NUMBER_OF_WEEKS }, (_, i) => i + 1);
  }, []);
};
