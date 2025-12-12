import { useMemo } from 'react';
import { Game, Player } from '../../../types';
import { useRecommendedPlayers } from './useRecommendedPlayers';

/**
 * Hook to get the top pick for a game
 */
export const useTopPick = (game: Game): Player | undefined => {
  const recommendedPlayers = useRecommendedPlayers(game);
  return useMemo(() => recommendedPlayers[0], [recommendedPlayers]);
};
