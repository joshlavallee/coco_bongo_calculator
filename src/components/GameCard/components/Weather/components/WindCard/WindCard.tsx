import { Wind } from "lucide-react";
import {
  StatCard,
  StatLabel,
  StatValue,
  WeatherIcon,
  StatDetail,
  WindWarning,
} from "../../../../styles";
import {
  WIND_TITLE,
  MPH_TEXT,
  NOT_AVAILABLE_TEXT,
  HIGH_WIND_TEXT,
} from "./constants";
import { useGame } from "../../../../context";

interface WindCardProps {
  isDomeGame: boolean;
  isWeatherAvailable: boolean;
}

export const WindCard: React.FC<WindCardProps> = ({
  isDomeGame,
  isWeatherAvailable,
}) => {
  const { weather } = useGame();
  const { windSpeed = 0 } = weather;
  return (
    <StatCard>
      <StatLabel>{WIND_TITLE}</StatLabel>
      {isDomeGame ? (
        <>
          <StatValue>
            <WeatherIcon>
              <Wind size={20} />
            </WeatherIcon>
            <span>0</span>
          </StatValue>
          <StatDetail>{MPH_TEXT}</StatDetail>
        </>
      ) : !isWeatherAvailable ? (
        <>
          <StatValue>
            <WeatherIcon>
              <Wind size={20} />
            </WeatherIcon>
            <span>-</span>
          </StatValue>
          <StatDetail>{NOT_AVAILABLE_TEXT}</StatDetail>
        </>
      ) : (
        <>
          <StatValue large={windSpeed > 15}>{windSpeed}</StatValue>
          <StatDetail>{MPH_TEXT}</StatDetail>
          {windSpeed > 15 && (
            <WindWarning>
              <Wind size={14} />
              <span>{HIGH_WIND_TEXT}</span>
            </WindWarning>
          )}
        </>
      )}
    </StatCard>
  );
};
