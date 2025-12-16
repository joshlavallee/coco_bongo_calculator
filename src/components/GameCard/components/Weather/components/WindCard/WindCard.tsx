import { Wind } from "lucide-react";
import { StatCard, StatLabel, StatValue, Warning } from "../../../../styles";
import { WIND_TITLE, HIGH_WIND_TEXT, NOT_AVAILABLE_TEXT } from "./constants";
import { LoadingSpinner } from "./styles";
import { GameWeather } from "../../../../../../services/weatherApi";

interface WindCardProps {
  weather?: GameWeather | null;
  isLoading: boolean;
  error: Error | null;
}

export const WindCard: React.FC<WindCardProps> = ({
  weather,
  isLoading,
  error,
}) => {
  const { windText, windValue } = weather || {};

  // TODO: Add the UI for the error state here
  if (error) return null;

  return (
    <StatCard>
      <StatLabel>{WIND_TITLE}</StatLabel>
      <StatValue>
        {isLoading ? <LoadingSpinner /> : windText || NOT_AVAILABLE_TEXT}
      </StatValue>
      {/* TODO: The magic numbers like this 15 (km/h) should be updated to be a slider eventually so the user can update it and get their own warnings for what they think is high wind */}
      {windValue && windValue > 15 && (
        <Warning>
          <Wind size={14} />
          <span>{HIGH_WIND_TEXT}</span>
        </Warning>
      )}
    </StatCard>
  );
};
