import { useMemo } from "react";
import { Game } from "../../../types";

export const useSortedGames = (games: Game[] | undefined) => {
  return useMemo(() => {
    if (!games) return games;

    return [...games].sort((a, b) => {
      const dateA = new Date(a.gameTime);
      const dateB = new Date(b.gameTime);

      const dayA = dateA.getDay();
      const dayB = dateB.getDay();
      const hourA = dateA.getHours();
      const hourB = dateB.getHours();

      const getPriority = (day: number, hour: number) => {
        if (day === 4) return 1;
        if (day === 0) {
          if (hour < 15) return 2;
          if (hour < 18) return 3;
          return 4;
        }
        if (day === 1) return 5;
        return 6;
      };

      const priorityA = getPriority(dayA, hourA);
      const priorityB = getPriority(dayB, hourB);

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      const overUnderA = a.overUnder ?? Infinity;
      const overUnderB = b.overUnder ?? Infinity;

      if (overUnderA !== overUnderB) {
        return overUnderA - overUnderB;
      }

      return dateA.getTime() - dateB.getTime();
    });
  }, [games]);
};
