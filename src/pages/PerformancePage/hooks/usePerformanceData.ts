import { useQuery } from "@tanstack/react-query";
import { getTickets, calculateTicketStats } from "../../../services/database";

export const usePerformanceData = (season: number) => {
  const { data: tickets, isLoading: ticketsLoading } = useQuery({
    queryKey: ["tickets", season],
    queryFn: () => getTickets(season),
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ["stats", season],
    queryFn: () => calculateTicketStats(season),
  });

  return {
    tickets,
    stats,
    isLoading: ticketsLoading || statsLoading,
  };
};
