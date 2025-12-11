import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { Plus, Check, X, TrendingUp, TrendingDown } from 'lucide-react';
import { getTickets, calculateTicketStats } from '../services/database';
import { Ticket } from '../types';

interface PerformancePageProps {
  season: number;
}

export const PerformancePage: React.FC<PerformancePageProps> = ({ season }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const { data: tickets, isLoading: ticketsLoading } = useQuery({
    queryKey: ['tickets', season],
    queryFn: () => getTickets(season),
  });

  const { data: stats, isLoading: statsLoading } = useQuery({
    queryKey: ['stats', season],
    queryFn: () => calculateTicketStats(season),
  });

  const isLoading = ticketsLoading || statsLoading;

  return (
    <>
      <Header>
        <HeaderLeft>
          <Title>Performance Analysis</Title>
          <Subtitle>Track and analyze your touchdown scorer picks</Subtitle>
        </HeaderLeft>
        <AddButton onClick={() => setShowAddForm(true)}>
          <Plus size={20} />
          Add Ticket
        </AddButton>
      </Header>

      {isLoading && (
        <LoadingContainer>
          <LoadingSpinner />
          <LoadingText>Loading performance data...</LoadingText>
        </LoadingContainer>
      )}

      {!isLoading && stats && (
        <>
          <StatsGrid>
            <StatCard>
              <StatLabel>Total Tickets</StatLabel>
              <StatValue>{stats.totalTickets}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Total Picks</StatLabel>
              <StatValue>{stats.totalPicks}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Correct Picks</StatLabel>
              <StatValue success>{stats.correctPicks}</StatValue>
            </StatCard>
            <StatCard>
              <StatLabel>Overall Win Rate</StatLabel>
              <StatValue success={stats.overallWinRate >= 50}>
                {stats.overallWinRate.toFixed(1)}%
              </StatValue>
            </StatCard>
          </StatsGrid>

          <AnalyticsSection>
            <SectionTitle>Performance by Position</SectionTitle>
            <PositionGrid>
              {stats.byPosition.map((pos) => (
                <PositionCard key={pos.position}>
                  <PositionHeader>
                    <PositionName>{pos.position}</PositionName>
                    <WinRate success={pos.winRate >= 50}>
                      {pos.winRate.toFixed(1)}%
                    </WinRate>
                  </PositionHeader>
                  <PositionStats>
                    <StatRow>
                      <StatRowLabel>Picks:</StatRowLabel>
                      <StatRowValue>
                        {pos.correctPicks}/{pos.totalPicks}
                      </StatRowValue>
                    </StatRow>
                    <StatRow>
                      <StatRowLabel>Avg Odds:</StatRowLabel>
                      <StatRowValue>+{pos.avgOdds}</StatRowValue>
                    </StatRow>
                    <StatRow>
                      <StatRowLabel>Avg Opp Rank:</StatRowLabel>
                      <StatRowValue>#{pos.avgOpponentRank}</StatRowValue>
                    </StatRow>
                  </PositionStats>
                </PositionCard>
              ))}
            </PositionGrid>
          </AnalyticsSection>

          <AnalyticsSection>
            <SectionTitle>Performance by Opponent Defense Rank</SectionTitle>
            <DefenseRankGrid>
              {stats.byDefenseRank.map((rank) => (
                <DefenseRankCard key={rank.rank}>
                  <DefenseRankLabel>{rank.rank}</DefenseRankLabel>
                  <DefenseRankWinRate success={rank.winRate >= 50}>
                    {rank.winRate.toFixed(1)}% Win Rate
                  </DefenseRankWinRate>
                  <DefenseRankDetails>
                    {rank.correctPicks}/{rank.totalPicks} picks
                  </DefenseRankDetails>
                  <ProgressBar>
                    <ProgressFill width={rank.winRate / 100} success={rank.winRate >= 50} />
                  </ProgressBar>
                </DefenseRankCard>
              ))}
            </DefenseRankGrid>
          </AnalyticsSection>
        </>
      )}

      <TicketsSection>
        <SectionTitle>Recent Tickets</SectionTitle>
        {tickets && tickets.length === 0 && (
          <EmptyState>
            <EmptyText>No tickets yet</EmptyText>
            <EmptySubtext>
              Click "Add Ticket" to start tracking your picks and analyzing patterns
            </EmptySubtext>
          </EmptyState>
        )}
        {tickets && tickets.length > 0 && (
          <TicketsList>
            {tickets.map((ticket) => (
              <TicketCard key={ticket.id}>
                <TicketHeader>
                  <TicketInfo>
                    <TicketWeek>Week {ticket.week}</TicketWeek>
                    <TicketResult result={ticket.result}>
                      {ticket.correct_picks}/{ticket.total_picks}
                    </TicketResult>
                  </TicketInfo>
                  <TicketDate>
                    {new Date(ticket.created_at).toLocaleDateString()}
                  </TicketDate>
                </TicketHeader>
                <PicksGrid>
                  {ticket.picks?.map((pick) => (
                    <PickItem key={pick.id} scored={pick.scored}>
                      <PickIcon>
                        {pick.scored ? <Check size={16} /> : <X size={16} />}
                      </PickIcon>
                      <PickDetails>
                        <PickName>{pick.player_name}</PickName>
                        <PickMeta>
                          {pick.position} · {pick.team} vs {pick.opponent} · +{pick.odds}
                        </PickMeta>
                        <PickDefense>
                          Opp Def vs {pick.position}: #{pick.opponent_defense_rank}
                        </PickDefense>
                      </PickDetails>
                    </PickItem>
                  ))}
                </PicksGrid>
              </TicketCard>
            ))}
          </TicketsList>
        )}
      </TicketsSection>

      {showAddForm && (
        <FormOverlay onClick={() => setShowAddForm(false)}>
          <FormContainer onClick={(e) => e.stopPropagation()}>
            <FormTitle>Add New Ticket</FormTitle>
            <FormText>
              Ticket entry form coming soon! For now, you can add tickets directly to the database using the Supabase dashboard or by integrating with your betting platform.
            </FormText>
            <FormButton onClick={() => setShowAddForm(false)}>Close</FormButton>
          </FormContainer>
        </FormOverlay>
      )}
    </>
  );
};

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const HeaderLeft = styled.div``;

const Title = styled.h1`
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const Subtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const AddButton = styled.button`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background.main};
  padding: ${({ theme }) => theme.spacing.md} ${({ theme }) => theme.spacing.lg};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.md};
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
`;

const LoadingSpinner = styled.div`
  width: 48px;
  height: 48px;
  border: 4px solid ${({ theme }) => theme.colors.border.light};
  border-top-color: ${({ theme }) => theme.colors.accent};
  border-radius: 50%;
  animation: spin 1s linear infinite;

  @keyframes spin {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingText = styled.div`
  margin-top: ${({ theme }) => theme.spacing.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
`;

const StatsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const StatValue = styled.div<{ success?: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xxxl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme, success }) =>
    success !== undefined
      ? success
        ? theme.colors.success
        : theme.colors.text.primary
      : theme.colors.text.primary};
`;

const AnalyticsSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const PositionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const PositionCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const PositionHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const PositionName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
`;

const WinRate = styled.div<{ success: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme, success }) =>
    success ? theme.colors.success : theme.colors.error};
`;

const PositionStats = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

const StatRow = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

const StatRowLabel = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const StatRowValue = styled.span`
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
`;

const DefenseRankGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const DefenseRankCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const DefenseRankLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const DefenseRankWinRate = styled.div<{ success: boolean }>`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme, success }) =>
    success ? theme.colors.success : theme.colors.error};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const DefenseRankDetails = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const ProgressBar = styled.div`
  width: 100%;
  height: 8px;
  background: ${({ theme }) => theme.colors.background.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  overflow: hidden;
`;

const ProgressFill = styled.div<{ width: number; success: boolean }>`
  height: 100%;
  width: ${({ width }) => width * 100}%;
  background: ${({ theme, success }) =>
    success ? theme.colors.success : theme.colors.error};
  transition: width ${({ theme }) => theme.transitions.medium};
`;

const TicketsSection = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xl};
`;

const EmptyState = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing.xxl};
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  text-align: center;
`;

const EmptyText = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme }) => theme.colors.text.primary};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

const EmptySubtext = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

const TicketsList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TicketCard = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const TicketHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  padding-bottom: ${({ theme }) => theme.spacing.md};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.light};
`;

const TicketInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
`;

const TicketWeek = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

const TicketResult = styled.div<{ result: string }>`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  color: ${({ theme, result }) =>
    result === 'win' ? theme.colors.success : theme.colors.text.secondary};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  background: ${({ theme, result }) =>
    result === 'win' ? `${theme.colors.success}22` : theme.colors.background.main};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
`;

const TicketDate = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
`;

const PicksGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: ${({ theme }) => theme.spacing.md};
`;

const PickItem = styled.div<{ scored: boolean }>`
  display: flex;
  gap: ${({ theme }) => theme.spacing.sm};
  padding: ${({ theme }) => theme.spacing.md};
  background: ${({ theme }) => theme.colors.background.main};
  border: 1px solid ${({ theme, scored }) =>
    scored ? theme.colors.success : theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

const PickIcon = styled.div`
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const PickDetails = styled.div`
  flex: 1;
`;

const PickName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const PickMeta = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  margin-bottom: 2px;
`;

const PickDefense = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.muted};
`;

const FormOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1000;
`;

const FormContainer = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.xl};
  max-width: 500px;
  width: 90%;
`;

const FormTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

const FormText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const FormButton = styled.button`
  width: 100%;
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background.main};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;
