import { TrendingUp, TrendingDown, DollarSign, Target } from "lucide-react";
import { StatsPanelProps } from "./types";
import { useStatsPanelData } from "./hooks/index";
import {
  SEASON_PERFORMANCE_TITLE,
  SEASON_PERFORMANCE_SUBTITLE,
  WIN_RATE_LABEL,
  NET_PROFIT_LABEL,
  ROI_PREFIX,
  TOTAL_WAGERED_LABEL,
  ACROSS_TEXT,
  PARLAYS_TEXT,
  TOTAL_PAYOUT_LABEL,
  FROM_WINNING_BETS_TEXT,
  MANUAL_TRACKING_TITLE,
  MANUAL_TRACKING_TEXT,
  MANUAL_TRACKING_FILE,
  MANUAL_TRACKING_TEXT_END,
} from "./constants";
import {
  Container,
  Header,
  Title,
  Subtitle,
  StatsGrid,
  StatCard,
  StatIcon,
  StatValue,
  StatLabel,
  StatDetail,
  InfoNote,
  NoteTitle,
  NoteText,
} from "./styles";

export const StatsPanel: React.FC<StatsPanelProps> = ({ season }) => {
  const { stats, isWinRateSuccessful, isNetProfitPositive } =
    useStatsPanelData(season);

  return (
    <Container>
      <Header>
        <Title>{SEASON_PERFORMANCE_TITLE}</Title>
        <Subtitle>{SEASON_PERFORMANCE_SUBTITLE}</Subtitle>
      </Header>

      <StatsGrid>
        <StatCard>
          <StatIcon success={isWinRateSuccessful}>
            <Target size={24} />
          </StatIcon>
          <StatValue>{stats.winRate}%</StatValue>
          <StatLabel>{WIN_RATE_LABEL}</StatLabel>
          <StatDetail>
            {stats.wins}W - {stats.losses}L
            {stats.pending > 0 && ` - ${stats.pending}P`}
          </StatDetail>
        </StatCard>

        <StatCard>
          <StatIcon success={isNetProfitPositive}>
            {isNetProfitPositive ? (
              <TrendingUp size={24} />
            ) : (
              <TrendingDown size={24} />
            )}
          </StatIcon>
          <StatValue profit={isNetProfitPositive}>
            {isNetProfitPositive ? "+" : ""}${stats.netProfit.toFixed(2)}
          </StatValue>
          <StatLabel>{NET_PROFIT_LABEL}</StatLabel>
          <StatDetail>
            {ROI_PREFIX}
            {stats.roi}%
          </StatDetail>
        </StatCard>

        <StatCard>
          <StatIcon>
            <DollarSign size={24} />
          </StatIcon>
          <StatValue>${stats.totalWagered.toFixed(2)}</StatValue>
          <StatLabel>{TOTAL_WAGERED_LABEL}</StatLabel>
          <StatDetail>
            {ACROSS_TEXT} {stats.totalParlays} {PARLAYS_TEXT}
          </StatDetail>
        </StatCard>

        <StatCard>
          <StatIcon success>
            <DollarSign size={24} />
          </StatIcon>
          <StatValue success>${stats.totalPayout.toFixed(2)}</StatValue>
          <StatLabel>{TOTAL_PAYOUT_LABEL}</StatLabel>
          <StatDetail>{FROM_WINNING_BETS_TEXT}</StatDetail>
        </StatCard>
      </StatsGrid>

      <InfoNote>
        <NoteTitle>{MANUAL_TRACKING_TITLE}</NoteTitle>
        <NoteText>
          {MANUAL_TRACKING_TEXT} <code>{MANUAL_TRACKING_FILE}</code>{" "}
          {MANUAL_TRACKING_TEXT_END}
        </NoteText>
      </InfoNote>
    </Container>
  );
};
