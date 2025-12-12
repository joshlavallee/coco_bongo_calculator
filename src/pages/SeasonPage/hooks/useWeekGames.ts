import { useQuery } from "@tanstack/react-query";
import { fetchWeekGames, fetchHeadToHeadTDs } from "../../../services/nflApi";

export const useWeekGames = (season: number, selectedWeek: number) => {
  return useQuery({
    queryKey: ["games", season, selectedWeek],
    queryFn: async () => {
      const games = await fetchWeekGames(season, selectedWeek);

      const gamesWithTDs = await Promise.all(
        games.map(async (game) => {
          const headToHeadTDs = await fetchHeadToHeadTDs(
            game.homeTeam.id,
            game.awayTeam.id,
            season
          );
          return {
            ...game,
            headToHeadTDs,
          };
        })
      );

      return gamesWithTDs;
    },
    refetchInterval: 5 * 60 * 1000,
  });
};
