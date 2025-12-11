import { TrendingUp, TrendingDown, DollarSign, Target } from 'lucide-react';
import { calculateSeasonStats } from '../../services/betTracking';
import { StatsPanelProps } from './types';
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
} from './constants';
import * as S from './styles';

export const StatsPanel: React.FC<StatsPanelProps> = ({ season }) => {
  const stats = calculateSeasonStats(season);

  return (
    <S.Container>
      <S.Header>
        <S.Title>{SEASON_PERFORMANCE_TITLE}</S.Title>
        <S.Subtitle>{SEASON_PERFORMANCE_SUBTITLE}</S.Subtitle>
      </S.Header>

      <S.StatsGrid>
        <S.StatCard>
          <S.StatIcon success={stats.winRate >= 50}>
            <Target size={24} />
          </S.StatIcon>
          <S.StatValue>{stats.winRate}%</S.StatValue>
          <S.StatLabel>{WIN_RATE_LABEL}</S.StatLabel>
          <S.StatDetail>
            {stats.wins}W - {stats.losses}L
            {stats.pending > 0 && ` - ${stats.pending}P`}
          </S.StatDetail>
        </S.StatCard>

        <S.StatCard>
          <S.StatIcon success={stats.netProfit >= 0}>
            {stats.netProfit >= 0 ? <TrendingUp size={24} /> : <TrendingDown size={24} />}
          </S.StatIcon>
          <S.StatValue profit={stats.netProfit >= 0}>
            {stats.netProfit >= 0 ? '+' : ''}${stats.netProfit.toFixed(2)}
          </S.StatValue>
          <S.StatLabel>{NET_PROFIT_LABEL}</S.StatLabel>
          <S.StatDetail>{ROI_PREFIX}{stats.roi}%</S.StatDetail>
        </S.StatCard>

        <S.StatCard>
          <S.StatIcon>
            <DollarSign size={24} />
          </S.StatIcon>
          <S.StatValue>${stats.totalWagered.toFixed(2)}</S.StatValue>
          <S.StatLabel>{TOTAL_WAGERED_LABEL}</S.StatLabel>
          <S.StatDetail>{ACROSS_TEXT} {stats.totalParlays} {PARLAYS_TEXT}</S.StatDetail>
        </S.StatCard>

        <S.StatCard>
          <S.StatIcon success>
            <DollarSign size={24} />
          </S.StatIcon>
          <S.StatValue success>${stats.totalPayout.toFixed(2)}</S.StatValue>
          <S.StatLabel>{TOTAL_PAYOUT_LABEL}</S.StatLabel>
          <S.StatDetail>{FROM_WINNING_BETS_TEXT}</S.StatDetail>
        </S.StatCard>
      </S.StatsGrid>

      <S.InfoNote>
        <S.NoteTitle>{MANUAL_TRACKING_TITLE}</S.NoteTitle>
        <S.NoteText>
          {MANUAL_TRACKING_TEXT} <code>{MANUAL_TRACKING_FILE}</code> {MANUAL_TRACKING_TEXT_END}
        </S.NoteText>
      </S.InfoNote>
    </S.Container>
  );
};
