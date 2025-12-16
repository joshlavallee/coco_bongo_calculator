import { WindCard, TemperatureCard } from "./components";
import { useWeatherData } from "./hooks/useWeatherData";

export const Weather: React.FC = () => {
  const { data: weatherData, isLoading, error } = useWeatherData();

  return (
    <>
      <TemperatureCard
        weather={weatherData}
        isLoading={isLoading}
        error={error}
      />
      <WindCard weather={weatherData} isLoading={isLoading} error={error} />
    </>
  );
};
