import { useMemo } from 'react';
import { formatGameTime } from '../utils';

/**
 * Hook to format game time
 * Memoized to prevent unnecessary date parsing
 */
export const useFormattedGameTime = (gameTime: string): string => {
  return useMemo(() => formatGameTime(gameTime), [gameTime]);
};
