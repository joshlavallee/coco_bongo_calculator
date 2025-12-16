import { CloudSun, CloudRain, CloudSnow } from "lucide-react";

export const formatGameTime = (isoTime: string) => {
  const date = new Date(isoTime);
  return date.toLocaleString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
    timeZoneName: "short",
  });
};

export const getTeamName = (fullName: string) => {
  const parts = fullName.split(" ");
  return parts[parts.length - 1];
};

export const getTeamLogoUrl = (abbreviation: string) => {
  return `https://a.espncdn.com/i/teamlogos/nfl/500/${abbreviation}.png`;
};

export const getWeeklyTDs = (currentWeek: number) => {
  const weeklyTDs: (number | null)[] = [];
  for (let i = 1; i <= 18; i++) {
    if (i < currentWeek) {
      weeklyTDs.push(Math.floor(Math.random() * 4));
    } else {
      weeklyTDs.push(null);
    }
  }
  return weeklyTDs;
};

export const getWeatherIcon = (
  temperatureValue = 0,
  precipitationValue = 0
) => {
  if (precipitationValue > 0) {
    if (temperatureValue < 0) {
      return <CloudSnow size={20} />;
    } else {
      return <CloudRain size={20} />;
    }
  }

  return <CloudSun size={20} />;
};
