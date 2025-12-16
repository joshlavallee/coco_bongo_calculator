import { createContext, useContext } from "react";
import { Game } from "../../../types";

interface GameContextType {
  game: Game;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{
  game: Game;
  children: React.ReactNode;
}> = ({ game, children }) => {
  return (
    <GameContext.Provider value={{ game }}>{children}</GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) {
    throw new Error("useGame must be used within a GameProvider");
  }

  const { game } = context;

  return {
    game,
    weather: game.weather,
    isCompleted: game.isCompleted,
    homeScore: game.homeScore,
    awayScore: game.awayScore,
    overUnder: game.overUnder,
    homeTeam: game.homeTeam,
    awayTeam: game.awayTeam,
    week: game.week,
    gameTime: game.gameTime,
  };
};
