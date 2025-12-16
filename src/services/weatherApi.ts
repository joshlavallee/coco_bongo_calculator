import axios from "axios";

// 1. Define Types for API Safety
interface GeocodingResult {
  latitude: number;
  longitude: number;
  name: string;
  admin1?: string;
}

interface WeatherResponse {
  hourly: {
    time: string[];
    temperature_2m: number[];
    precipitation: number[];
    wind_speed_10m: number[];
  };
  hourly_units: {
    temperature_2m: string;
    precipitation: string;
    wind_speed_10m: string;
  };
}

export interface GameWeather {
  location: string;
  time: string;
  temperatureText: string;
  temperatureValue: number;
  windText: string;
  windValue: number;
  precipitationText: string;
  precipitationValue: number;
  precipitationType: string | null;
  isDomeGame?: boolean;
}

export const getKickoffWeather = async (
  city: string,
  timestamp: string
): Promise<GameWeather | string> => {
  try {
    const geoUrl = `https://geocoding-api.open-meteo.com/v1/search?name=${city}&count=1&format=json`;
    const geoRes = await axios.get<{ results: GeocodingResult[] }>(geoUrl);

    if (!geoRes.data.results) return "City not found.";
    const { latitude, longitude, name, admin1 } = geoRes.data.results[0];

    const dateOnly = timestamp.split("T")[0];
    const weatherUrl = `https://api.open-meteo.com/v1/forecast`;

    const weatherRes = await axios.get<WeatherResponse>(weatherUrl, {
      params: {
        latitude,
        longitude,
        start_date: dateOnly,
        end_date: dateOnly,
        hourly: "temperature_2m,precipitation,wind_speed_10m",
        timezone: "auto",
      },
    });

    const kickoffHour = timestamp.substring(0, 13); // "2025-12-18T17"
    const { hourly, hourly_units } = weatherRes.data;
    const index = hourly.time.findIndex((t) => t.startsWith(kickoffHour));

    if (index === -1) return "No data found for that hour.";

    const endIndex = Math.min(index + 3, hourly.time.length);
    const hoursToAverage = endIndex - index;

    const avgTemperature =
      hourly.temperature_2m
        .slice(index, endIndex)
        .reduce((sum, temp) => sum + temp, 0) / hoursToAverage;

    const avgPrecipitation =
      hourly.precipitation
        .slice(index, endIndex)
        .reduce((sum, precip) => sum + precip, 0) / hoursToAverage;

    const avgWind =
      hourly.wind_speed_10m
        .slice(index, endIndex)
        .reduce((sum, wind) => sum + wind, 0) / hoursToAverage;

    return {
      location: `${name}, ${admin1}`,
      time: hourly.time[index],
      temperatureText: `${Math.round(avgTemperature)}${
        hourly_units.temperature_2m
      }`,
      temperatureValue: Math.round(avgTemperature),
      windText: `${Math.round(avgWind)} ${hourly_units.wind_speed_10m}`,
      windValue: Math.round(avgWind),
      precipitationText: `${avgPrecipitation.toFixed(1)} ${
        hourly_units.precipitation
      }`,
      precipitationValue: parseFloat(avgPrecipitation.toFixed(1)),
      precipitationType:
        avgPrecipitation > 0 ? (avgTemperature < 0 ? "Snow" : "Rain") : null,
    };
  } catch (error) {
    console.error("Error fetching weather:", error);
    return "Failed to retrieve weather data.";
  }
};
