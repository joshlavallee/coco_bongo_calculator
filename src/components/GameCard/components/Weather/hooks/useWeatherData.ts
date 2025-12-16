import { useQuery, UseQueryResult } from "@tanstack/react-query";
import {
  GameWeather,
  getKickoffWeather,
} from "../../../../../services/weatherApi";
import { useGame } from "../../../context/GameContext";
import { DOME_TEAMS } from "../../../constants";

export const useWeatherData = (): UseQueryResult<GameWeather | null> => {
  const { homeTeam, gameTime } = useGame();

  const city = homeTeam.name.split(" ").slice(0, -1).join(" ");
  const formattedGameTime = new Date(gameTime).toISOString();

  const isDomeTeam = DOME_TEAMS.includes(homeTeam.abbreviation);

  return useQuery({
    queryKey: ["weather", city, formattedGameTime],
    queryFn: async () => {
      const result = await getKickoffWeather(city, formattedGameTime);
      return typeof result === "string" ? null : result;
    },
    enabled: !isDomeTeam,
    staleTime: 5 * 60 * 1000,
    refetchInterval: isDomeTeam ? false : 5 * 60 * 1000,
    select: (data) => (isDomeTeam ? null : data),
  });
};
