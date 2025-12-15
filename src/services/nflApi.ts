import axios from "axios";
import { Game, Team, Weather, HeadToHeadTDs, TDScorer } from "../types";

/**
 * NFL API Service - Using ESPN's unofficial API
 *
 * ESPN API provides real-time NFL game data including:
 * - Schedules and scores
 * - Team information
 * - Basic weather data
 * - Odds/betting lines
 *
 * Note: Team rankings (pass/rush offense/defense) are currently mock data.
 * TODO: Integrate with a stats API for real-time rankings (e.g., NFL.com, Pro Football Reference)
 */

const ESPN_API_BASE =
  "https://site.api.espn.com/apis/site/v2/sports/football/nfl";

interface ESPNGame {
  id: string;
  date: string;
  season: {
    year: number;
    type: number;
  };
  week: {
    number: number;
  };
  competitions: Array<{
    id: string;
    competitors: Array<{
      id: string;
      team: {
        id: string;
        displayName: string;
        abbreviation: string;
        logo: string;
      };
      homeAway: "home" | "away";
      score?: string;
    }>;
    odds?: Array<{
      details?: string;
      overUnder?: number;
    }>;
    weather?: {
      displayValue: string;
      temperature: number;
      conditionId: string;
    };
  }>;
  status: {
    type: {
      name: string;
      completed: boolean;
    };
  };
}

/**
 * Mock team rankings - TODO: Replace with real stats API
 * These should be fetched from a statistics API and updated regularly
 */
const TEAM_RANKINGS: Record<
  string,
  {
    passOffenseRank: number;
    rushOffenseRank: number;
    passDefenseRank: number;
    rushDefenseRank: number;
  }
> = {
  KC: {
    passOffenseRank: 3,
    rushOffenseRank: 12,
    passDefenseRank: 8,
    rushDefenseRank: 15,
  },
  BUF: {
    passOffenseRank: 2,
    rushOffenseRank: 18,
    passDefenseRank: 5,
    rushDefenseRank: 10,
  },
  SF: {
    passOffenseRank: 5,
    rushOffenseRank: 4,
    passDefenseRank: 3,
    rushDefenseRank: 7,
  },
  DAL: {
    passOffenseRank: 1,
    rushOffenseRank: 15,
    passDefenseRank: 12,
    rushDefenseRank: 20,
  },
  PHI: {
    passOffenseRank: 8,
    rushOffenseRank: 2,
    passDefenseRank: 6,
    rushDefenseRank: 4,
  },
  MIA: {
    passOffenseRank: 4,
    rushOffenseRank: 22,
    passDefenseRank: 18,
    rushDefenseRank: 25,
  },
  BAL: {
    passOffenseRank: 10,
    rushOffenseRank: 1,
    passDefenseRank: 14,
    rushDefenseRank: 12,
  },
  DET: {
    passOffenseRank: 6,
    rushOffenseRank: 5,
    passDefenseRank: 22,
    rushDefenseRank: 28,
  },
  GB: {
    passOffenseRank: 11,
    rushOffenseRank: 8,
    passDefenseRank: 9,
    rushDefenseRank: 11,
  },
  LAR: {
    passOffenseRank: 7,
    rushOffenseRank: 19,
    passDefenseRank: 15,
    rushDefenseRank: 16,
  },
  CIN: {
    passOffenseRank: 9,
    rushOffenseRank: 20,
    passDefenseRank: 19,
    rushDefenseRank: 17,
  },
  LAC: {
    passOffenseRank: 12,
    rushOffenseRank: 13,
    passDefenseRank: 10,
    rushDefenseRank: 13,
  },
  TB: {
    passOffenseRank: 13,
    rushOffenseRank: 16,
    passDefenseRank: 16,
    rushDefenseRank: 18,
  },
  MIN: {
    passOffenseRank: 14,
    rushOffenseRank: 14,
    passDefenseRank: 11,
    rushDefenseRank: 14,
  },
  ATL: {
    passOffenseRank: 15,
    rushOffenseRank: 11,
    passDefenseRank: 20,
    rushDefenseRank: 21,
  },
  SEA: {
    passOffenseRank: 16,
    rushOffenseRank: 10,
    passDefenseRank: 17,
    rushDefenseRank: 19,
  },
  PIT: {
    passOffenseRank: 17,
    rushOffenseRank: 17,
    passDefenseRank: 7,
    rushDefenseRank: 8,
  },
  HOU: {
    passOffenseRank: 18,
    rushOffenseRank: 9,
    passDefenseRank: 13,
    rushDefenseRank: 9,
  },
  NO: {
    passOffenseRank: 19,
    rushOffenseRank: 21,
    passDefenseRank: 21,
    rushDefenseRank: 22,
  },
  IND: {
    passOffenseRank: 20,
    rushOffenseRank: 7,
    passDefenseRank: 23,
    rushDefenseRank: 23,
  },
  ARI: {
    passOffenseRank: 21,
    rushOffenseRank: 23,
    passDefenseRank: 24,
    rushDefenseRank: 24,
  },
  WAS: {
    passOffenseRank: 22,
    rushOffenseRank: 6,
    passDefenseRank: 25,
    rushDefenseRank: 26,
  },
  JAX: {
    passOffenseRank: 23,
    rushOffenseRank: 24,
    passDefenseRank: 26,
    rushDefenseRank: 27,
  },
  DEN: {
    passOffenseRank: 24,
    rushOffenseRank: 25,
    passDefenseRank: 4,
    rushDefenseRank: 6,
  },
  CLE: {
    passOffenseRank: 25,
    rushOffenseRank: 26,
    passDefenseRank: 2,
    rushDefenseRank: 3,
  },
  TEN: {
    passOffenseRank: 26,
    rushOffenseRank: 27,
    passDefenseRank: 27,
    rushDefenseRank: 29,
  },
  CHI: {
    passOffenseRank: 27,
    rushOffenseRank: 28,
    passDefenseRank: 28,
    rushDefenseRank: 30,
  },
  LV: {
    passOffenseRank: 28,
    rushOffenseRank: 29,
    passDefenseRank: 29,
    rushDefenseRank: 31,
  },
  NYJ: {
    passOffenseRank: 29,
    rushOffenseRank: 30,
    passDefenseRank: 1,
    rushDefenseRank: 2,
  },
  NYG: {
    passOffenseRank: 30,
    rushOffenseRank: 31,
    passDefenseRank: 30,
    rushDefenseRank: 32,
  },
  NE: {
    passOffenseRank: 31,
    rushOffenseRank: 32,
    passDefenseRank: 31,
    rushDefenseRank: 5,
  },
  CAR: {
    passOffenseRank: 32,
    rushOffenseRank: 3,
    passDefenseRank: 32,
    rushDefenseRank: 1,
  },
};

const getTeamRankings = (abbreviation: string) => {
  return (
    TEAM_RANKINGS[abbreviation] || {
      passOffenseRank: 16,
      rushOffenseRank: 16,
      passDefenseRank: 16,
      rushDefenseRank: 16,
    }
  );
};

/**
 * Parse weather condition from ESPN data
 */
const parseWeather = (espnWeather?: {
  displayValue: string;
  temperature: number;
  conditionId: string;
}): Weather => {
  if (!espnWeather) {
    return {
      temperature: 70,
      condition: "Clear",
      windSpeed: 0,
      precipitation: 0,
    };
  }

  const condition = espnWeather.displayValue || "Clear";
  const temp = espnWeather.temperature || 70;

  let windSpeed = 0;
  let precipitation = 0;

  if (condition.toLowerCase().includes("wind")) {
    windSpeed = 15;
  }
  if (condition.toLowerCase().includes("rain")) {
    precipitation = 50;
    windSpeed = 10;
  }
  if (condition.toLowerCase().includes("snow")) {
    precipitation = 60;
    windSpeed = 12;
  }

  return {
    temperature: temp,
    condition: condition,
    windSpeed: windSpeed,
    precipitation: precipitation,
  };
};

/**
 * Parse betting odds from ESPN data
 */
const parseOdds = (odds?: Array<{ details?: string; overUnder?: number }>) => {
  if (!odds || odds.length === 0) {
    return { overUnder: null, spread: 0 };
  }

  const firstOdd = odds[0];
  const overUnder = firstOdd.overUnder || null;
  let spread = 0;

  if (firstOdd.details) {
    const spreadMatch = firstOdd.details.match(/([+-]?\d+\.?\d*)/);
    if (spreadMatch) {
      spread = parseFloat(spreadMatch[1]);
    }
  }

  return { overUnder, spread };
};

/**
 * Fetch games for a specific week and season
 */
export const fetchWeekGames = async (
  season: number,
  week: number
): Promise<Game[]> => {
  try {
    const url = `${ESPN_API_BASE}/scoreboard`;
    const params = {
      limit: 100,
      dates: season,
      seasontype: 2,
      week: week,
    };

    const response = await axios.get<{ events: ESPNGame[] }>(url, { params });

    if (!response.data.events || response.data.events.length === 0) {
      return [];
    }

    const games: Game[] = response.data.events.map((event) => {
      const competition = event.competitions[0];
      const homeCompetitor = competition.competitors.find(
        (c) => c.homeAway === "home"
      );
      const awayCompetitor = competition.competitors.find(
        (c) => c.homeAway === "away"
      );

      if (!homeCompetitor || !awayCompetitor) {
        throw new Error("Missing competitor data");
      }

      const homeTeamAbbr = homeCompetitor.team.abbreviation;
      const awayTeamAbbr = awayCompetitor.team.abbreviation;

      const homeTeam: Team = {
        id: homeCompetitor.team.id,
        name: homeCompetitor.team.displayName,
        abbreviation: homeTeamAbbr,
        logo: homeCompetitor.team.logo,
        ...getTeamRankings(homeTeamAbbr),
      };

      const awayTeam: Team = {
        id: awayCompetitor.team.id,
        name: awayCompetitor.team.displayName,
        abbreviation: awayTeamAbbr,
        logo: awayCompetitor.team.logo,
        ...getTeamRankings(awayTeamAbbr),
      };

      const weather = parseWeather(competition.weather);
      const { overUnder, spread } = parseOdds(competition.odds);
      const isCompleted = event.status.type.completed;

      const homeScore = homeCompetitor.score
        ? parseInt(homeCompetitor.score, 10)
        : undefined;
      const awayScore = awayCompetitor.score
        ? parseInt(awayCompetitor.score, 10)
        : undefined;

      return {
        id: event.id,
        week: event.week.number,
        season: event.season.year,
        homeTeam,
        awayTeam,
        gameTime: event.date,
        weather,
        overUnder,
        spread,
        isCompleted,
        homeScore,
        awayScore,
      };
    });

    return games;
  } catch (error) {
    console.error("Error fetching NFL games:", error);
    throw error;
  }
};

/**
 * Get the current NFL week
 * This calculates based on the current date and NFL season schedule
 */
export const getCurrentWeek = (): number => {
  const now = new Date();
  const year = now.getFullYear();

  // NFL 2025 season starts approximately September 4, 2025
  const seasonStart = new Date(2025, 8, 4); // Month is 0-indexed (8 = September)

  if (now < seasonStart) {
    return 1; // Before season starts, default to week 1
  }

  // Calculate weeks since season start
  const diffTime = now.getTime() - seasonStart.getTime();
  const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
  const week = Math.floor(diffDays / 7) + 1;

  // Cap at week 18 (regular season)
  return Math.min(Math.max(week, 1), 18);
};

/**
 * Legacy function for backward compatibility
 */
export const fetchCurrentWeekGames = async (
  season: number = 2025
): Promise<Game[]> => {
  const currentWeek = getCurrentWeek();
  return fetchWeekGames(season, currentWeek);
};

/**
 * Fetch team statistics
 * TODO: Integrate with a real stats API for live rankings
 */
export const fetchTeamStats = async (
  teamId: string,
  season: number = 2025
): Promise<Team> => {
  // For now, return mock data
  // In production, this should fetch from a stats API
  const mockTeam: Team = {
    id: teamId,
    name: "Team Name",
    abbreviation: "TM",
    ...getTeamRankings("KC"),
  };

  return mockTeam;
};

interface ESPNPlay {
  id: string;
  type: {
    id: string;
    text: string;
  };
  text?: string;
  scoringPlay?: boolean;
  start?: {
    team?: {
      id: string;
    };
  };
  participants?: Array<{
    type: string;
    athlete: {
      type: string;
      $ref?: string;
    };
  }>;
}

interface ESPNScheduleEvent {
  id: string;
  date: string;
  season: {
    year: number;
  };
  competitions: Array<{
    competitors: Array<{
      id: string;
      team: {
        id: string;
        abbreviation: string;
      };
    }>;
    status: {
      type: {
        completed: boolean;
      };
    };
  }>;
}

/**
 * Fetch head-to-head touchdown scorers from last 3 meetings
 * Fetches historical games between teams and aggregates TD data
 */
export const fetchHeadToHeadTDs = async (
  team1Id: string,
  team2Id: string,
  season: number = 2025
): Promise<HeadToHeadTDs> => {
  try {
    // Step 1: Search through multiple seasons to find last 3 completed games
    const headToHeadGames: string[] = [];
    const currentYear = new Date().getFullYear();
    const startYear = Math.min(season, currentYear);

    for (
      let year = startYear;
      year >= startYear - 5 && headToHeadGames.length < 5;
      year--
    ) {
      try {
        const scheduleUrl = `${ESPN_API_BASE}/teams/${team1Id}/schedule`;
        const scheduleParams = { season: year };

        const scheduleResponse = await axios.get<{
          events: ESPNScheduleEvent[];
        }>(scheduleUrl, { params: scheduleParams });

        if (!scheduleResponse.data.events) {
          continue;
        }

        // Find completed games against team2 in this season
        const matchups = scheduleResponse.data.events
          .filter((event) => {
            const competition = event.competitions[0];
            const opponentIds = competition.competitors.map((c) => c.team.id);
            return (
              opponentIds.includes(team2Id) && competition.status.type.completed
            );
          })
          .map((event) => event.id);

        headToHeadGames.push(...matchups);
      } catch (seasonError) {
        console.error(`Error fetching schedule for ${year}:`, seasonError);
      }
    }

    // Limit to last 3 games
    const gamesToAnalyze = headToHeadGames.slice(0, 5);

    if (gamesToAnalyze.length === 0) {
      return { topScorers: [] };
    }

    // Step 2: Fetch play-by-play data for each game and extract TDs
    const tdScorers: Record<string, number> = {};

    for (const gameId of gamesToAnalyze) {
      try {
        const playsUrl = `https://sports.core.api.espn.com/v2/sports/football/leagues/nfl/events/${gameId}/competitions/${gameId}/plays`;
        const playsParams = { limit: 300 };

        const playsResponse = await axios.get<{ items: ESPNPlay[] }>(playsUrl, {
          params: playsParams,
        });

        if (!playsResponse.data.items) {
          continue;
        }

        // Filter for scoring plays that are Rushing or receiving TDs
        const touchdowns = playsResponse.data.items.filter((play) => {
          if (!play.scoringPlay) return false;

          const playText = play.type.text.toLowerCase();

          return playText.includes("passing") || playText.includes("rushing");
        });

        // Extract player names from touchdown plays
        for (const touchdown of touchdowns) {
          const touchdownScorer = touchdown.participants?.find(
            (participant) => participant.type === "scorer"
          );

          if (touchdownScorer?.athlete?.$ref) {
            try {
              const athleteResponse = await axios.get(
                touchdownScorer.athlete.$ref
              );

              const playerName =
                athleteResponse.data.displayName ||
                athleteResponse.data.fullName;

              if (playerName) {
                tdScorers[playerName] = (tdScorers[playerName] || 0) + 1;
              }
            } catch (athleteError) {
              console.error("Error fetching athlete data:", athleteError);
            }
          }
        }
      } catch (playError) {
        console.error(`Error fetching plays for game ${gameId}:`, playError);
      }
    }

    // Step 3: Convert to array and sort by TD count (desc), then by name (asc)
    const topScorers: TDScorer[] = Object.entries(tdScorers)
      .map(([name, count]) => ({ name, count }))
      .sort((a, b) => {
        if (b.count !== a.count) return b.count - a.count;
        return a.name.localeCompare(b.name);
      });

    return { topScorers };
  } catch (error) {
    console.error("Error fetching head-to-head TD data:", error);
    return {
      topScorers: [],
    };
  }
};
