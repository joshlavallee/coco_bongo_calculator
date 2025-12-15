import { useMemo } from "react";
import { Game } from "../../../types";

/**
 * Hook to check if weather data is available
 */
export const useIsWeatherAvailable = (game: Game): boolean => {
  console.log("WEATHER", game);
  return useMemo(() => {
    return (
      game.weather.condition !== "Clear" ||
      game.weather.temperature !== 70 ||
      game.weather.windSpeed > 0
    );
  }, [
    game.weather.condition,
    game.weather.temperature,
    game.weather.windSpeed,
  ]);
};
