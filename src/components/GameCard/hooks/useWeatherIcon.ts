import { useMemo } from 'react';
import { getWeatherIcon } from '../utils';

/**
 * Hook to get weather icon
 * Memoized to prevent recreating the component on every render
 */
export const useWeatherIcon = (isWeatherAvailable: boolean, condition: string): JSX.Element => {
  return useMemo(() => getWeatherIcon(isWeatherAvailable, condition), [isWeatherAvailable, condition]);
};
