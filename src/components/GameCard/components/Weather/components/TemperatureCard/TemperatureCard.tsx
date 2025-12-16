import { Home, ThermometerSnowflake } from "lucide-react";
import {
  StatCard,
  StatLabel,
  StatValue,
  WeatherIcon,
  StatDetail,
  Warning,
} from "../../../../styles";
import { TEMPERATURE_TITLE, INDOOR_STADIUM_TEXT } from "./constants";
import { getWeatherIcon } from "../../../../utils";
import { LoadingSpinner } from "./styles";
import { GameWeather } from "../../../../../../services/weatherApi";

interface TemperatureCardProps {
  weather?: GameWeather | null;
  isLoading: boolean;
  error: Error | null;
}

export const TemperatureCard: React.FC<TemperatureCardProps> = ({
  weather = null,
  isLoading,
  error,
}) => {
  const {
    temperatureText,
    temperatureValue,
    precipitationText,
    precipitationValue,
    precipitationType,
    isDomeGame,
  } = weather || {};

  // TODO: Add the UI for the error state here
  if (error) return null;

  return (
    <StatCard>
      <StatLabel>{TEMPERATURE_TITLE}</StatLabel>
      <StatValue>
        {isLoading ? (
          <LoadingSpinner />
        ) : (
          <>
            <WeatherIcon>
              {isDomeGame ? (
                <Home size={24} />
              ) : (
                getWeatherIcon(temperatureValue, precipitationValue)
              )}
            </WeatherIcon>
            <span>{temperatureText}</span>
          </>
        )}
      </StatValue>
      {precipitationType ? (
        <StatDetail>
          {precipitationText} {precipitationType}
        </StatDetail>
      ) : null}
      {/* TODO: The magic numbers like this 5 (mm) should be updated to be a slider eventually so the user can update it and get their own warnings for what they think is extreme cold */}
      {temperatureValue && precipitationValue && precipitationValue > 5 ? (
        <Warning>
          <WeatherIcon>
            {getWeatherIcon(temperatureValue, precipitationValue)}
          </WeatherIcon>
          <span>Heavy {precipitationType}</span>
        </Warning>
      ) : null}
      {/* TODO: The magic numbers like this -10 (degrees) should be updated to be a slider eventually so the user can update it and get their own warnings for what they think is extreme cold */}
      {temperatureValue && temperatureValue < -10 ? (
        <Warning>
          <WeatherIcon>
            <ThermometerSnowflake size={14} />
          </WeatherIcon>
          <span>Extreme Cold</span>
        </Warning>
      ) : null}
      {!temperatureValue && !isLoading && (
        <StatDetail>{INDOOR_STADIUM_TEXT}</StatDetail>
      )}
    </StatCard>
  );
};
