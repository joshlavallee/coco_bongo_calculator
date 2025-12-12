import { useMemo } from 'react';
import { getTeamLogoUrl } from '../utils';

/**
 * Hook to get team logo URL
 * Memoized for consistency
 */
export const useTeamLogoUrl = (abbreviation: string): string => {
  return useMemo(() => getTeamLogoUrl(abbreviation), [abbreviation]);
};
