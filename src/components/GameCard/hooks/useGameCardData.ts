import { Game } from "../../../types";
import { useRecommendedPlayers } from "./useRecommendedPlayers";
import { useTopPick } from "./useTopPick";
import { useHeadToHeadDisplay } from "./useHeadToHeadDisplay";

/**
 * Combined hook that returns all game card data
 * Use this for a simpler API if you need multiple pieces of data
 */
export const useGameCardData = (game: Game) => {
  const recommendedPlayers = useRecommendedPlayers(game);
  const topPick = useTopPick(game);
  const headToHeadDisplay = useHeadToHeadDisplay(game);

  return {
    recommendedPlayers,
    topPick,
    headToHeadDisplay,
  };
};
