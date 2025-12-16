import { useRecommendedPlayers } from "./useRecommendedPlayers";
import { useTopPick } from "./useTopPick";
import { useHeadToHeadDisplay } from "./useHeadToHeadDisplay";

/**
 * Combined hook that returns all game card data
 * Use this for a simpler API if you need multiple pieces of data
 */
export const useGameCardData = () => {
  const recommendedPlayers = useRecommendedPlayers();
  const topPick = useTopPick();
  const headToHeadDisplay = useHeadToHeadDisplay();

  return {
    recommendedPlayers,
    topPick,
    headToHeadDisplay,
  };
};
