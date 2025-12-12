import { useMemo } from 'react';
import { Game, Player } from '../../../types';
import { getRecommendedPlayers } from '../../../services/playerRecommendations';

/**
 * Hook to get recommended players for a game
 * Memoized to prevent recalculation on every render
 */
export const useRecommendedPlayers = (game: Game): Player[] => {
  return useMemo(() => {
    return getRecommendedPlayers(game);
  }, [game]);
};
