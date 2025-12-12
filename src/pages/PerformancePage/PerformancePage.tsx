import { useState } from "react";
import { Plus, Check, X } from "lucide-react";
import { usePerformanceData } from "./hooks";
import {
  Header,
  HeaderLeft,
  Title,
  Subtitle,
  AddButton,
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  StatsGrid,
  StatCard,
  StatLabel,
  StatValue,
  AnalyticsSection,
  SectionTitle,
  PositionGrid,
  PositionCard,
  PositionHeader,
  PositionName,
  WinRate,
  PositionStats,
  StatRow,
  StatRowLabel,
  StatRowValue,
  DefenseRankGrid,
  DefenseRankCard,
  DefenseRankLabel,
  DefenseRankWinRate,
  DefenseRankDetails,
  ProgressBar,
  ProgressFill,
  TicketsSection,
  EmptyState,
  EmptyText,
  EmptySubtext,
  TicketsList,
  TicketCard,
  TicketHeader,
  TicketInfo,
  TicketWeek,
  TicketResult,
  TicketDate,
  PicksGrid,
  PickItem,
  PickIcon,
  PickDetails,
  PickName,
  PickMeta,
  PickDefense,
  FormOverlay,
  FormContainer,
  FormTitle,
  FormText,
  FormButton,
} from "./styles";

interface PerformancePageProps {
  season: number;
}

export const PerformancePage: React.FC<PerformancePageProps> = ({ season }) => {
  const [showAddForm, setShowAddForm] = useState(false);

  const { tickets, stats, isLoading } = usePerformanceData(season);

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
                    <ProgressFill
                      width={rank.winRate / 100}
                      success={rank.winRate >= 50}
                    />
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
              Click "Add Ticket" to start tracking your picks and analyzing
              patterns
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
                          {pick.position} · {pick.team} vs {pick.opponent} · +
                          {pick.odds}
                        </PickMeta>
                        <PickDefense>
                          Opp Def vs {pick.position}: #
                          {pick.opponent_defense_rank}
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
              Ticket entry form coming soon! For now, you can add tickets
              directly to the database using the Supabase dashboard or by
              integrating with your betting platform.
            </FormText>
            <FormButton onClick={() => setShowAddForm(false)}>Close</FormButton>
          </FormContainer>
        </FormOverlay>
      )}
    </>
  );
};
