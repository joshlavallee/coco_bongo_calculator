import { useMemo } from 'react';
import { Game } from '../../../types';
import { DOME_TEAMS } from '../constants';

/**
 * Hook to check if a game is in a dome
 */
export const useIsDomeGame = (game: Game): boolean => {
  return useMemo(() => {
    return DOME_TEAMS.includes(game.homeTeam.abbreviation);
  }, [game.homeTeam.abbreviation]);
};
