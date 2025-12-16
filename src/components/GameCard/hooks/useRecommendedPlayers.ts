import { useMemo } from "react";
import { Player } from "../../../types";
import { getRecommendedPlayers } from "../../../services/playerRecommendations";
import { useGame } from "../context";

/**
 * Hook to get recommended players for a game
 * Memoized to prevent recalculation on every render
 */
export const useRecommendedPlayers = (): Player[] => {
  const { game } = useGame();
  return useMemo(() => {
    return getRecommendedPlayers(game);
  }, [game]);
};
