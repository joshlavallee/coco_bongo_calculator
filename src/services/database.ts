import { supabase } from './supabase';
import { Ticket, Pick, TicketStats, PickAnalytics } from '../types';

export const getTickets = async (season?: number): Promise<Ticket[]> => {
  let query = supabase
    .from('tickets')
    .select(`
      *,
      picks (*)
    `)
    .order('created_at', { ascending: false });

  if (season) {
    query = query.eq('season', season);
  }

  const { data, error } = await query;

  if (error) {
    console.error('Error fetching tickets:', error);
    throw error;
  }

  return data || [];
};

export const getTicketById = async (id: string): Promise<Ticket | null> => {
  const { data, error } = await supabase
    .from('tickets')
    .select(`
      *,
      picks (*)
    `)
    .eq('id', id)
    .maybeSingle();

  if (error) {
    console.error('Error fetching ticket:', error);
    throw error;
  }

  return data;
};

export const createTicket = async (
  week: number,
  season: number,
  picks: Omit<Pick, 'id' | 'ticket_id' | 'created_at'>[]
): Promise<Ticket> => {
  const { data: ticket, error: ticketError } = await supabase
    .from('tickets')
    .insert({
      week,
      season,
      result: 'pending',
      total_picks: picks.length,
      correct_picks: 0,
    })
    .select()
    .single();

  if (ticketError) {
    console.error('Error creating ticket:', ticketError);
    throw ticketError;
  }

  const picksWithTicketId = picks.map((pick) => ({
    ...pick,
    ticket_id: ticket.id,
  }));

  const { data: createdPicks, error: picksError } = await supabase
    .from('picks')
    .insert(picksWithTicketId)
    .select();

  if (picksError) {
    console.error('Error creating picks:', picksError);
    await supabase.from('tickets').delete().eq('id', ticket.id);
    throw picksError;
  }

  return {
    ...ticket,
    picks: createdPicks,
  };
};

export const updateTicketResults = async (
  ticketId: string,
  pickResults: { pickId: string; scored: boolean }[]
): Promise<void> => {
  for (const result of pickResults) {
    const { error } = await supabase
      .from('picks')
      .update({ scored: result.scored })
      .eq('id', result.pickId);

    if (error) {
      console.error('Error updating pick:', error);
      throw error;
    }
  }

  const { data: picks, error: picksError } = await supabase
    .from('picks')
    .select('scored')
    .eq('ticket_id', ticketId);

  if (picksError) {
    console.error('Error fetching picks:', picksError);
    throw picksError;
  }

  const correctPicks = picks?.filter((p) => p.scored).length || 0;
  const totalPicks = picks?.length || 0;
  const result = correctPicks === totalPicks ? 'win' : 'loss';

  const { error: updateError } = await supabase
    .from('tickets')
    .update({
      correct_picks: correctPicks,
      result: result,
    })
    .eq('id', ticketId);

  if (updateError) {
    console.error('Error updating ticket:', updateError);
    throw updateError;
  }
};

export const calculateTicketStats = async (season: number): Promise<TicketStats> => {
  const { data: picks, error } = await supabase
    .from('picks')
    .select('*')
    .eq('game_season', season);

  if (error) {
    console.error('Error fetching picks for stats:', error);
    throw error;
  }

  if (!picks || picks.length === 0) {
    return {
      totalTickets: 0,
      totalPicks: 0,
      correctPicks: 0,
      overallWinRate: 0,
      byPosition: [],
      byDefenseRank: [],
    };
  }

  const { data: tickets } = await supabase
    .from('tickets')
    .select('id')
    .eq('season', season);

  const totalTickets = tickets?.length || 0;
  const totalPicks = picks.length;
  const correctPicks = picks.filter((p) => p.scored).length;
  const overallWinRate = totalPicks > 0 ? (correctPicks / totalPicks) * 100 : 0;

  const positionMap = new Map<string, { total: number; correct: number; totalOdds: number; totalDefRank: number }>();

  picks.forEach((pick) => {
    if (!positionMap.has(pick.position)) {
      positionMap.set(pick.position, { total: 0, correct: 0, totalOdds: 0, totalDefRank: 0 });
    }
    const stats = positionMap.get(pick.position)!;
    stats.total++;
    if (pick.scored) stats.correct++;
    stats.totalOdds += pick.odds;
    stats.totalDefRank += pick.opponent_defense_rank;
  });

  const byPosition: PickAnalytics[] = Array.from(positionMap.entries()).map(([position, stats]) => ({
    position,
    totalPicks: stats.total,
    correctPicks: stats.correct,
    winRate: stats.total > 0 ? (stats.correct / stats.total) * 100 : 0,
    avgOdds: stats.total > 0 ? Math.round(stats.totalOdds / stats.total) : 0,
    avgOpponentRank: stats.total > 0 ? Math.round(stats.totalDefRank / stats.total) : 0,
  }));

  const defenseRankBuckets = [
    { label: 'Top 10 (1-10)', min: 1, max: 10 },
    { label: 'Middle (11-22)', min: 11, max: 22 },
    { label: 'Bottom 10 (23-32)', min: 23, max: 32 },
  ];

  const byDefenseRank = defenseRankBuckets.map((bucket) => {
    const bucketPicks = picks.filter(
      (p) => p.opponent_defense_rank >= bucket.min && p.opponent_defense_rank <= bucket.max
    );
    const correct = bucketPicks.filter((p) => p.scored).length;
    return {
      rank: bucket.label,
      totalPicks: bucketPicks.length,
      correctPicks: correct,
      winRate: bucketPicks.length > 0 ? (correct / bucketPicks.length) * 100 : 0,
    };
  });

  return {
    totalTickets,
    totalPicks,
    correctPicks,
    overallWinRate,
    byPosition,
    byDefenseRank,
  };
};

export const deleteTicket = async (id: string): Promise<void> => {
  const { error } = await supabase.from('tickets').delete().eq('id', id);

  if (error) {
    console.error('Error deleting ticket:', error);
    throw error;
  }
};
