import { useMemo } from 'react';
import { getTeamName } from '../utils';

/**
 * Hook to get team name
 * Memoized to prevent string manipulation on each render
 */
export const useTeamName = (fullName: string): string => {
  return useMemo(() => getTeamName(fullName), [fullName]);
};
