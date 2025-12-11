import styled from 'styled-components';

export const CardContainer = styled.div`
  position: relative;
  background: ${({ theme }) => theme.colors.background.card};
  backdrop-filter: blur(${({ theme }) => theme.blur.lg});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.lg});
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  padding: ${({ theme }) => theme.spacing.lg};
  box-shadow: ${({ theme }) => theme.shadows.glass};
  transition: all ${({ theme }) => theme.transitions.medium};

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.medium};
    box-shadow: ${({ theme }) => theme.shadows.lg};
    transform: translateY(-2px);
  }
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const GameTime = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const InfoButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.accent}22;
  color: ${({ theme }) => theme.colors.accent};
  border: 1px solid ${({ theme }) => theme.colors.accent}44;
  border-radius: 50%;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.accent};
    color: ${({ theme }) => theme.colors.background.main};
    transform: scale(1.05);
  }
`;

export const PotentialBoxBadge = styled.div`
  background: ${({ theme }) => theme.colors.warning};
  color: ${({ theme }) => theme.colors.background.main};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const MatchupSection = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  margin-bottom: ${({ theme }) => theme.spacing.lg};
  gap: ${({ theme }) => theme.spacing.md};
`;

export const TeamContainer = styled.div`
  flex: 1;
  text-align: center;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TeamLogo = styled.img`
  width: 64px;
  height: 64px;
  object-fit: contain;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
  transition: transform ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.05);
  }
`;

export const TeamName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const TeamAbbr = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.muted};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const VSIndicator = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xl};
  color: ${({ theme }) => theme.colors.text.muted};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StatCard = styled.div`
  background: ${({ theme }) => theme.colors.background.glass};
  backdrop-filter: blur(${({ theme }) => theme.blur.md});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.md});
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.light};
  text-align: center;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    border-color: ${({ theme }) => theme.colors.border.medium};
    transform: translateY(-2px);
  }
`;

export const StatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

export const StatValue = styled.div<{ large?: boolean }>`
  font-size: ${({ theme, large }) =>
    large ? theme.typography.fontSize.xxl : theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const WeatherIcon = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StatDetail = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const WindWarning = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.error};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

export const HeadToHeadSection = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}20 0%, ${({ theme }) => theme.colors.secondary}20 100%);
  backdrop-filter: blur(${({ theme }) => theme.blur.md});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.md});
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.accent};
  box-shadow: ${({ theme }) => theme.shadows.glow};
  transition: all ${({ theme }) => theme.transitions.fast};
  margin-bottom: ${({ theme }) => theme.spacing.lg};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.glow}, ${({ theme }) => theme.shadows.md};
  }
`;

export const HeadToHeadTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
`;

export const TDScorersList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const TDScorerItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const TDScorerName = styled.span`
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
`;

export const TDScorerCount = styled.div<{ tdCount: number }>`
  min-width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, tdCount }) => {
    if (tdCount === 0) return '#FF555522';
    if (tdCount === 1) return '#FFB86C22';
    if (tdCount >= 3) return '#50FA7B22';
    return theme.colors.accent + '22';
  }};
  color: ${({ theme, tdCount }) => {
    if (tdCount === 0) return '#FF5555';
    if (tdCount === 1) return '#FFB86C';
    if (tdCount >= 3) return '#50FA7B';
    return theme.colors.accent;
  }};
  border: 1px solid ${({ theme, tdCount }) => {
    if (tdCount === 0) return '#FF555544';
    if (tdCount === 1) return '#FFB86C44';
    if (tdCount >= 3) return '#50FA7B44';
    return theme.colors.accent + '44';
  }};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  font-family: ${({ theme }) => theme.typography.fontFamily.mono};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const RecommendationSection = styled.div`
  background: linear-gradient(135deg, ${({ theme }) => theme.colors.primary}20 0%, ${({ theme }) => theme.colors.secondary}20 100%);
  backdrop-filter: blur(${({ theme }) => theme.blur.md});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.md});
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.accent};
  box-shadow: ${({ theme }) => theme.shadows.glow};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    box-shadow: ${({ theme }) => theme.shadows.glow}, ${({ theme }) => theme.shadows.md};
  }
`;

export const RecommendationHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

export const HighValueBadge = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.success};
  color: ${({ theme }) => theme.colors.background.main};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  animation: pulse 2s ease-in-out infinite;

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.7;
    }
  }
`;

export const PlayerPick = styled.div``;

export const PlayerName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const PlayerInfo = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const OddsBadge = styled.span`
  background: ${({ theme }) => theme.colors.accent}22;
  color: ${({ theme }) => theme.colors.accent};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.sm};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
`;

export const TDSectionLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-top: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

export const SeasonTDGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const TDSquare = styled.div<{ hasData: boolean; tdCount: number | null }>`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, hasData, tdCount }) => {
    if (!hasData || tdCount === null) return theme.colors.background.main;
    if (tdCount === 0) return '#FF555522';
    if (tdCount === 1) return '#FFB86C22';
    if (tdCount >= 3) return '#50FA7B22';
    return theme.colors.accent + '22';
  }};
  color: ${({ theme, hasData, tdCount }) => {
    if (!hasData || tdCount === null) return theme.colors.text.muted;
    if (tdCount === 0) return '#FF5555';
    if (tdCount === 1) return '#FFB86C';
    if (tdCount >= 3) return '#50FA7B';
    return theme.colors.accent;
  }};
  border: 1px solid ${({ theme, hasData, tdCount }) => {
    if (!hasData || tdCount === null) return theme.colors.border.light;
    if (tdCount === 0) return '#FF555544';
    if (tdCount === 1) return '#FFB86C44';
    if (tdCount >= 3) return '#50FA7B44';
    return theme.colors.accent + '44';
  }};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.1);
    box-shadow: ${({ theme }) => theme.shadows.sm};
  }
`;

export const HoverOverlay = styled.div<{ visible: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: ${({ theme }) => theme.colors.background.card};
  backdrop-filter: blur(${({ theme }) => theme.blur.xl});
  -webkit-backdrop-filter: blur(${({ theme }) => theme.blur.xl});
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  padding: ${({ theme }) => theme.spacing.lg};
  opacity: ${({ visible }) => (visible ? 1 : 0)};
  pointer-events: ${({ visible }) => (visible ? 'all' : 'none')};
  transition: opacity ${({ theme }) => theme.transitions.medium};
  overflow-y: auto;
  box-shadow: ${({ theme }) => theme.shadows.xl};
`;

export const OverlayHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;
`;

export const OverlayTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.accent};
  margin: 0;
  text-align: center;
`;

export const CloseButton = styled.button`
  position: absolute;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  background: ${({ theme }) => theme.colors.error}22;
  color: ${({ theme }) => theme.colors.error};
  border: 1px solid ${({ theme }) => theme.colors.error}44;
  border-radius: 50%;
  cursor: pointer;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.error};
    color: ${({ theme }) => theme.colors.background.main};
    transform: translateY(-50%) scale(1.05);
  }
`;

export const MatchupsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const MatchupRow = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  gap: ${({ theme }) => theme.spacing.md};
  align-items: center;
  background: ${({ theme }) => theme.colors.background.main};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const TeamStat = styled.div<{ side: 'away' | 'home' }>`
  display: flex;
  flex-direction: column;
  align-items: ${({ side }) => (side === 'away' ? 'flex-start' : 'flex-end')};
  gap: ${({ theme }) => theme.spacing.xs};
`;

export const StatTeam = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.xs};
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.muted};
  text-transform: uppercase;
  letter-spacing: 0.5px;
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

export const InlineTeamLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

export const MatchupStatLabel = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const getRankColor = (rank: number) => {
  if (rank <= 10) return '#10B981';
  if (rank <= 20) return '#F59E0B';
  return '#EF4444';
};

export const StatRank = styled.div<{ rank: number }>`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  color: ${({ rank }) => getRankColor(rank)};
`;

const getGapColor = (gap: number) => {
  if (gap >= 20) return '#10B981';
  if (gap >= 15) return '#22C55E';
  if (gap >= 10) return '#84CC16';
  if (gap >= 7) return '#EAB308';
  if (gap >= 5) return '#F59E0B';
  if (gap >= 3) return '#EF4444';
  return '#DC2626';
};

export const MatchupGap = styled.div<{ gap: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  min-width: 50px;
  height: 50px;
  border-radius: 50%;
  background: ${({ gap }) => getGapColor(gap)};
  color: ${({ theme }) => theme.colors.background.main};
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  font-weight: ${({ theme }) => theme.typography.fontWeight.bold};
  box-shadow: ${({ theme }) => theme.shadows.md};
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    transform: scale(1.1);
  }
`;

export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border.light};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

export const OtherPlayers = styled.div`
  background: ${({ theme }) => theme.colors.background.main};
  padding: ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
`;

export const OtherPlayersTitle = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

export const PlayerOption = styled.div`
  padding: ${({ theme }) => theme.spacing.sm};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  background: ${({ theme }) => theme.colors.background.card};
  border-radius: ${({ theme }) => theme.borderRadius.sm};
  transition: background ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.background.hover};
  }

  &:last-child {
    margin-bottom: 0;
  }
`;

export const PlayerOptionName = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
  display: flex;
  align-items: center;
`;

export const PlayerOptionStats = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.muted};
`;
