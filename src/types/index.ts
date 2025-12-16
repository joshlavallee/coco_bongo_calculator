export interface Team {
  id: string;
  name: string;
  abbreviation: string;
  logo?: string;
  passOffenseRank: number;
  rushOffenseRank: number;
  passDefenseRank: number;
  rushDefenseRank: number;
}

export interface Weather {
  temperature: number;
  condition: string;
  windSpeed: number;
  precipitation: number;
}

export interface TDScorer {
  name: string;
  count: number;
}

export interface HeadToHeadTDs {
  topScorers: TDScorer[];
}

export interface Game {
  id: string;
  week: number;
  season: number;
  homeTeam: Team;
  awayTeam: Team;
  gameTime: string;
  weather: Weather;
  overUnder: number | null;
  spread: number;
  isCompleted: boolean;
  homeScore: number;
  awayScore: number;
  headToHeadTDs?: HeadToHeadTDs;
}

export interface Player {
  id: string;
  name: string;
  team: string;
  position: string;
  odds: number;
  recentCarries?: number;
  recentTargets?: number;
  score: number;
  isHighValue?: boolean;
}

export interface Pick {
  id: string;
  ticket_id: string;
  player_name: string;
  team: string;
  position: "QB" | "RB" | "WR" | "TE";
  opponent: string;
  opponent_defense_rank: number;
  odds: number;
  scored: boolean;
  game_week: number;
  game_season: number;
  created_at: string;
}

export interface Ticket {
  id: string;
  week: number;
  season: number;
  created_at: string;
  result: "pending" | "win" | "loss";
  total_picks: number;
  correct_picks: number;
  picks?: Pick[];
}

export interface PickAnalytics {
  position: string;
  totalPicks: number;
  correctPicks: number;
  winRate: number;
  avgOdds: number;
  avgOpponentRank: number;
}

export interface TicketStats {
  totalTickets: number;
  totalPicks: number;
  correctPicks: number;
  overallWinRate: number;
  byPosition: PickAnalytics[];
  byDefenseRank: {
    rank: string;
    totalPicks: number;
    correctPicks: number;
    winRate: number;
  }[];
}
