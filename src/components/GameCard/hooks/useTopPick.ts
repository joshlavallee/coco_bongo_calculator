import { useMemo } from "react";
import { Player } from "../../../types";
import { useRecommendedPlayers } from "./useRecommendedPlayers";

/**
 * Hook to get the top pick for a game
 */
export const useTopPick = (): Player | undefined => {
  const recommendedPlayers = useRecommendedPlayers();
  return useMemo(() => recommendedPlayers[0], [recommendedPlayers]);
};
