import { Cloud, CloudRain, CloudSnow, Sun } from 'lucide-react';

export const formatGameTime = (isoTime: string) => {
  const date = new Date(isoTime);
  return date.toLocaleString('en-US', {
    weekday: 'short',
    month: 'short',
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit',
    timeZoneName: 'short',
  });
};

export const fahrenheitToCelsius = (fahrenheit: number) => {
  return Math.round((fahrenheit - 32) * 5 / 9);
};

export const getTeamName = (fullName: string) => {
  const parts = fullName.split(' ');
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

export const getWeatherIcon = (isWeatherAvailable: boolean, condition: string) => {
  if (!isWeatherAvailable) return <Cloud size={20} />;
  const lowerCondition = condition.toLowerCase();
  if (lowerCondition.includes('snow')) return <CloudSnow size={20} />;
  if (lowerCondition.includes('rain')) return <CloudRain size={20} />;
  if (lowerCondition.includes('cloud') || lowerCondition.includes('overcast')) return <Cloud size={20} />;
  if (lowerCondition.includes('clear') || lowerCondition.includes('sunny')) return <Sun size={20} />;
  return <Cloud size={20} />;
};
