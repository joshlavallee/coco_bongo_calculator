import axios from 'axios';
import { Weather } from '../types';

/**
 * Weather API Service
 *
 * TODO: Integrate with real weather API
 * Options:
 * 1. OpenWeatherMap API: https://openweathermap.org/api
 * 2. WeatherAPI: https://www.weatherapi.com/
 * 3. Weather.gov (free for US locations)
 *
 * You'll need to map stadium locations to coordinates or zip codes
 * and fetch weather forecasts for game times
 */

export const fetchWeatherForGame = async (
  location: string,
  gameTime: string
): Promise<Weather> => {
  // TODO: Replace with real API call
  // Example:
  // const response = await axios.get(
  //   `https://api.openweathermap.org/data/2.5/forecast`,
  //   {
  //     params: {
  //       q: location,
  //       appid: process.env.VITE_WEATHER_API_KEY,
  //       units: 'imperial'
  //     }
  //   }
  // );

  // Mock data - in production, this would come from a real weather API
  await new Promise(resolve => setTimeout(resolve, 200));

  return {
    temperature: Math.floor(Math.random() * 50) + 20,
    condition: ['Clear', 'Cloudy', 'Rain', 'Snow', 'Partly Cloudy'][
      Math.floor(Math.random() * 5)
    ],
    windSpeed: Math.floor(Math.random() * 20),
    precipitation: Math.floor(Math.random() * 100),
  };
};
