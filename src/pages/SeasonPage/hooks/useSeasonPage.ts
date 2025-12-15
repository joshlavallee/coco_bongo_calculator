import { useState } from "react";
import { getCurrentWeek } from "../../../services/nflApi";
import { useWeekGames } from "./useWeekGames";

export const useSeasonPage = (season: number) => {
  const currentWeek = getCurrentWeek();
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);
  const { data: games, isLoading, error } = useWeekGames(season, selectedWeek);

  return {
    currentWeek,
    selectedWeek,
    setSelectedWeek,
    games,
    isLoading,
    error,
  };
};
