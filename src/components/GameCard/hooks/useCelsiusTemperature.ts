import { useMemo } from 'react';
import { fahrenheitToCelsius } from '../utils';

/**
 * Hook to convert temperature to Celsius
 * Memoized for consistency
 */
export const useCelsiusTemperature = (fahrenheit: number): number => {
  return useMemo(() => fahrenheitToCelsius(fahrenheit), [fahrenheit]);
};
