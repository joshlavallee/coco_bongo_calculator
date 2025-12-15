import { Warehouse } from "lucide-react";
import {
  StatCard,
  StatLabel,
  StatValue,
  WeatherIcon,
  StatDetail,
} from "../../../../styles";
import {
  WEATHER_TITLE,
  DOME_TEXT,
  INDOOR_STADIUM_TEXT,
  NOT_AVAILABLE_TEXT,
} from "./constants";
import { fahrenheitToCelsius, getWeatherIcon } from "../../../../utils";
import { useGame } from "../../../../context";

interface TemperatureCardProps {
  isDomeGame: boolean;
  isWeatherAvailable: boolean;
}

export const TemperatureCard: React.FC<TemperatureCardProps> = ({
  isDomeGame,
  isWeatherAvailable,
}) => {
  const { weather } = useGame();
  const { temperature = 0, condition = "" } = weather;
  return (
    <StatCard>
      <StatLabel>{WEATHER_TITLE}</StatLabel>
      {isDomeGame ? (
        <>
          <StatValue>
            <WeatherIcon>
              <Warehouse size={20} />
            </WeatherIcon>
            <span>{DOME_TEXT}</span>
          </StatValue>
          <StatDetail>{INDOOR_STADIUM_TEXT}</StatDetail>
        </>
      ) : !isWeatherAvailable ? (
        <>
          <StatValue>
            <WeatherIcon>
              {getWeatherIcon(isWeatherAvailable, condition)}
            </WeatherIcon>
            <span>-</span>
          </StatValue>
          <StatDetail>{NOT_AVAILABLE_TEXT}</StatDetail>
        </>
      ) : (
        <>
          <StatValue>
            <WeatherIcon>
              {getWeatherIcon(isWeatherAvailable, condition)}
            </WeatherIcon>
            <span>{fahrenheitToCelsius(temperature)}°C</span>
          </StatValue>
          <StatDetail>{condition}</StatDetail>
        </>
      )}
    </StatCard>
  );
};
