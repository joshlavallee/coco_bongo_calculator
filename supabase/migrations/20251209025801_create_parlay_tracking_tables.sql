/*
  # Create Parlay Tracking System

  1. New Tables
    - `tickets`
      - `id` (uuid, primary key)
      - `week` (integer) - NFL week number
      - `season` (integer) - NFL season year
      - `created_at` (timestamptz) - When ticket was created
      - `result` (text) - 'pending', 'win', 'loss'
      - `total_picks` (integer) - Total number of picks on ticket
      - `correct_picks` (integer) - Number of picks that hit
      
    - `picks`
      - `id` (uuid, primary key)
      - `ticket_id` (uuid, foreign key) - References tickets table
      - `player_name` (text) - Name of the player
      - `team` (text) - Player's team abbreviation
      - `position` (text) - QB, RB, WR, TE
      - `opponent` (text) - Opposing team abbreviation
      - `opponent_defense_rank` (integer) - Opponent's defensive rank vs position (1-32)
      - `odds` (integer) - Betting odds (e.g., 350 for +350)
      - `scored` (boolean) - Whether player scored a touchdown
      - `game_week` (integer) - Week of the game
      - `game_season` (integer) - Season of the game
      - `created_at` (timestamptz) - When pick was added

  2. Security
    - Enable RLS on both tables
    - Add policies for public access (for now, since we're manually tracking)
    - In production, would restrict to authenticated users only
*/

-- Create tickets table
CREATE TABLE IF NOT EXISTS tickets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  week integer NOT NULL,
  season integer NOT NULL,
  created_at timestamptz DEFAULT now(),
  result text DEFAULT 'pending' CHECK (result IN ('pending', 'win', 'loss')),
  total_picks integer DEFAULT 0,
  correct_picks integer DEFAULT 0
);

-- Create picks table
CREATE TABLE IF NOT EXISTS picks (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  ticket_id uuid REFERENCES tickets(id) ON DELETE CASCADE,
  player_name text NOT NULL,
  team text NOT NULL,
  position text NOT NULL CHECK (position IN ('QB', 'RB', 'WR', 'TE')),
  opponent text NOT NULL,
  opponent_defense_rank integer CHECK (opponent_defense_rank BETWEEN 1 AND 32),
  odds integer NOT NULL,
  scored boolean DEFAULT false,
  game_week integer NOT NULL,
  game_season integer NOT NULL,
  created_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE tickets ENABLE ROW LEVEL SECURITY;
ALTER TABLE picks ENABLE ROW LEVEL SECURITY;

-- Create policies for public access (manual tracking mode)
-- Note: In production, replace 'true' with proper authentication checks
CREATE POLICY "Allow public read access to tickets"
  ON tickets FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to tickets"
  ON tickets FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to tickets"
  ON tickets FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete to tickets"
  ON tickets FOR DELETE
  USING (true);

CREATE POLICY "Allow public read access to picks"
  ON picks FOR SELECT
  USING (true);

CREATE POLICY "Allow public insert to picks"
  ON picks FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Allow public update to picks"
  ON picks FOR UPDATE
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Allow public delete to picks"
  ON picks FOR DELETE
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_tickets_season_week ON tickets(season, week);
CREATE INDEX IF NOT EXISTS idx_picks_ticket_id ON picks(ticket_id);
CREATE INDEX IF NOT EXISTS idx_picks_position ON picks(position);
CREATE INDEX IF NOT EXISTS idx_picks_scored ON picks(scored);
