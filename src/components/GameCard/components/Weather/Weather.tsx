import { WindCard, TemperatureCard } from "./components";

interface WeatherProps {
  isDomeGame: boolean;
  isWeatherAvailable: boolean;
}

export const Weather: React.FC<WeatherProps> = ({
  isDomeGame,
  isWeatherAvailable,
}) => {
  return (
    <>
      <TemperatureCard
        isDomeGame={isDomeGame}
        isWeatherAvailable={isWeatherAvailable}
      />
      <WindCard
        isDomeGame={isDomeGame}
        isWeatherAvailable={isWeatherAvailable}
      />
    </>
  );
};
