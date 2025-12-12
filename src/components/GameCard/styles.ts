import styled, { css } from "styled-components";

export const CardContainer = styled.div`
  ${({ theme }) => css`
    position: relative;
    background: ${theme.colors.background.card};
    backdrop-filter: blur(${theme.blur.lg});
    -webkit-backdrop-filter: blur(${theme.blur.lg});
    border: 1px solid ${theme.colors.border.light};
    border-radius: ${theme.borderRadius.xl};
    padding: ${theme.spacing.lg};
    box-shadow: ${theme.shadows.glass};
    transition: all ${theme.transitions.medium};

    &:hover {
      border-color: ${theme.colors.border.medium};
      box-shadow: ${theme.shadows.lg};
      transform: translateY(-2px);
    }
  `}
`;

export const CardHeader = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
`;

export const GameTime = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    font-weight: ${theme.typography.fontWeight.medium};
  `}
`;

export const HeaderRight = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.sm};
`;

export const InfoButton = styled.button`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: ${theme.colors.accent}22;
    color: ${theme.colors.accent};
    border: 1px solid ${theme.colors.accent}44;
    border-radius: 50%;
    cursor: pointer;
    transition: all ${theme.transitions.fast};

    &:hover {
      background: ${theme.colors.accent};
      color: ${theme.colors.background.main};
      transform: scale(1.05);
    }
  `}
`;

export const PotentialBoxBadge = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.warning};
    color: ${theme.colors.background.main};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.semibold};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `}
`;

export const MatchupSection = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: ${theme.spacing.lg};
    gap: ${theme.spacing.md};
  `}
`;

export const TeamContainer = styled.div`
  ${({ theme }) => css`
    flex: 1;
    text-align: center;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: ${theme.spacing.sm};
  `}
`;

export const TeamLogo = styled.img`
  ${({ theme }) => css`
    width: 64px;
    height: 64px;
    object-fit: contain;
    filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.1));
    transition: transform ${theme.transitions.fast};

    &:hover {
      transform: scale(1.05);
    }
  `}
`;

export const TeamName = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.xs};
  `}
`;

export const TeamAbbr = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.muted};
    font-weight: ${theme.typography.fontWeight.medium};
  `}
`;

export const VSIndicator = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.xl};
    color: ${theme.colors.text.muted};
    font-weight: ${theme.typography.fontWeight.bold};
  `}
`;

export const StatsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const StatCard = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.background.glass};
    backdrop-filter: blur(${theme.blur.md});
    -webkit-backdrop-filter: blur(${theme.blur.md});
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.lg};
    border: 1px solid ${theme.colors.border.light};
    text-align: center;
    transition: all ${theme.transitions.fast};

    &:hover {
      border-color: ${theme.colors.border.medium};
      transform: translateY(-2px);
    }
  `}
`;

export const StatLabel = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.text.muted};
    margin-bottom: ${theme.spacing.xs};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: ${theme.typography.fontWeight.medium};
  `}
`;

export const StatValue = styled.div<{ large?: boolean }>`
  ${({ theme, large }) => css`
    font-size: ${large
      ? theme.typography.fontSize.xxl
      : theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${theme.colors.accent};
    margin-bottom: ${theme.spacing.xs};
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.xs};
  `}
`;

export const WeatherIcon = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const StatDetail = styled.div`
  font-size: ${({ theme }) => theme.typography.fontSize.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`;

export const WindWarning = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    gap: ${theme.spacing.xs};
    margin-top: ${theme.spacing.xs};
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.error};
    font-weight: ${theme.typography.fontWeight.semibold};
  `}
`;

export const HeadToHeadSection = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      135deg,
      ${theme.colors.primary}20 0%,
      ${theme.colors.secondary}20 100%
    );
    backdrop-filter: blur(${theme.blur.md});
    -webkit-backdrop-filter: blur(${theme.blur.md});
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.lg};
    border: 1px solid ${theme.colors.border.accent};
    box-shadow: ${theme.shadows.glow};
    transition: all ${theme.transitions.fast};
    margin-bottom: ${theme.spacing.lg};

    &:hover {
      box-shadow: ${theme.shadows.glow}, ${theme.shadows.md};
    }
  `}
`;

export const HeadToHeadTitle = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.sm};
  `}
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
  ${({ theme }) => css`
    color: ${theme.colors.text.primary};
    font-weight: ${theme.typography.fontWeight.semibold};
    font-size: ${theme.typography.fontSize.sm};
  `}
`;

export const TDScorerCount = styled.div<{ tdCount: number }>`
  ${({ theme, tdCount }) => css`
    min-width: 32px;
    height: 32px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: ${tdCount === 0
      ? "#FF555522"
      : tdCount === 1
      ? "#FFB86C22"
      : tdCount >= 3
      ? "#50FA7B22"
      : theme.colors.accent + "22"};
    color: ${tdCount === 0
      ? "#FF5555"
      : tdCount === 1
      ? "#FFB86C"
      : tdCount >= 3
      ? "#50FA7B"
      : theme.colors.accent};
    border: 1px solid
      ${tdCount === 0
        ? "#FF555544"
        : tdCount === 1
        ? "#FFB86C44"
        : tdCount >= 3
        ? "#50FA7B44"
        : theme.colors.accent + "44"};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.bold};
    font-family: ${theme.typography.fontFamily.mono};
    transition: all ${theme.transitions.fast};

    &:hover {
      transform: scale(1.1);
      box-shadow: ${theme.shadows.sm};
    }
  `}
`;

export const RecommendationSection = styled.div`
  ${({ theme }) => css`
    background: linear-gradient(
      135deg,
      ${theme.colors.primary}20 0%,
      ${theme.colors.secondary}20 100%
    );
    backdrop-filter: blur(${theme.blur.md});
    -webkit-backdrop-filter: blur(${theme.blur.md});
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.lg};
    border: 1px solid ${theme.colors.border.accent};
    box-shadow: ${theme.shadows.glow};
    transition: all ${theme.transitions.fast};

    &:hover {
      box-shadow: ${theme.shadows.glow}, ${theme.shadows.md};
    }
  `}
`;

export const RecommendationHeader = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: ${theme.typography.fontWeight.semibold};
  `}
`;

export const HighValueBadge = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    background: ${theme.colors.success};
    color: ${theme.colors.background.main};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    font-size: ${theme.typography.fontSize.xs};
    font-weight: ${theme.typography.fontWeight.bold};
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
  `}
`;

export const PlayerPick = styled.div``;

export const PlayerName = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    margin-bottom: ${theme.spacing.xs};
  `}
`;

export const PlayerInfo = styled.div`
  ${({ theme }) => css`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: ${theme.spacing.sm};
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
  `}
`;

export const OddsBadge = styled.span`
  ${({ theme }) => css`
    background: ${theme.colors.accent}22;
    color: ${theme.colors.accent};
    padding: ${theme.spacing.xs} ${theme.spacing.sm};
    border-radius: ${theme.borderRadius.sm};
    font-weight: ${theme.typography.fontWeight.bold};
  `}
`;

export const TDSectionLabel = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-top: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.xs};
  `}
`;

export const SeasonTDGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(9, 1fr);
  gap: ${({ theme }) => theme.spacing.xs};
  margin-top: ${({ theme }) => theme.spacing.xs};
`;

export const TDSquare = styled.div<{
  hasData: boolean;
  tdCount: number | null;
}>`
  aspect-ratio: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme, hasData, tdCount }) => {
    if (!hasData || tdCount === null) return theme.colors.background.main;
    if (tdCount === 0) return "#FF555522";
    if (tdCount === 1) return "#FFB86C22";
    if (tdCount >= 3) return "#50FA7B22";
    return theme.colors.accent + "22";
  }};
  color: ${({ theme, hasData, tdCount }) => {
    if (!hasData || tdCount === null) return theme.colors.text.muted;
    if (tdCount === 0) return "#FF5555";
    if (tdCount === 1) return "#FFB86C";
    if (tdCount >= 3) return "#50FA7B";
    return theme.colors.accent;
  }};
  border: 1px solid
    ${({ theme, hasData, tdCount }) => {
      if (!hasData || tdCount === null) return theme.colors.border.light;
      if (tdCount === 0) return "#FF555544";
      if (tdCount === 1) return "#FFB86C44";
      if (tdCount >= 3) return "#50FA7B44";
      return theme.colors.accent + "44";
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
  ${({ theme, visible }) => css`
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: ${theme.colors.background.card};
    backdrop-filter: blur(${theme.blur.xl});
    -webkit-backdrop-filter: blur(${theme.blur.xl});
    border-radius: ${theme.borderRadius.xl};
    border: 1px solid ${theme.colors.border.medium};
    padding: ${theme.spacing.lg};
    opacity: ${visible ? 1 : 0};
    pointer-events: ${visible ? "all" : "none"};
    transition: opacity ${theme.transitions.medium};
    overflow-y: auto;
    box-shadow: ${theme.shadows.xl};
  `}
`;

export const OverlayHeader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacing.md};
  position: relative;
`;

export const OverlayTitle = styled.h3`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.lg};
    color: ${theme.colors.accent};
    margin: 0;
    text-align: center;
  `}
`;

export const CloseButton = styled.button`
  ${({ theme }) => css`
    position: absolute;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    width: 32px;
    height: 32px;
    background: ${theme.colors.error}22;
    color: ${theme.colors.error};
    border: 1px solid ${theme.colors.error}44;
    border-radius: 50%;
    cursor: pointer;
    transition: all ${theme.transitions.fast};

    &:hover {
      background: ${theme.colors.error};
      color: ${theme.colors.background.main};
      transform: translateY(-50%) scale(1.05);
    }
  `}
`;

export const MatchupsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

export const MatchupRow = styled.div`
  ${({ theme }) => css`
    display: grid;
    grid-template-columns: 1fr auto 1fr;
    gap: ${theme.spacing.md};
    align-items: center;
    background: ${theme.colors.background.main};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
  `}
`;

export const TeamStat = styled.div<{ side: "away" | "home" }>`
  ${({ theme, side }) => css`
    display: flex;
    flex-direction: column;
    align-items: ${side === "away" ? "flex-start" : "flex-end"};
    gap: ${theme.spacing.xs};
  `}
`;

export const StatTeam = styled.div`
  ${({ theme }) => css`
    display: flex;
    align-items: center;
    gap: ${theme.spacing.xs};
    font-size: ${theme.typography.fontSize.xs};
    color: ${theme.colors.text.muted};
    text-transform: uppercase;
    letter-spacing: 0.5px;
    font-weight: ${theme.typography.fontWeight.semibold};
  `}
`;

export const InlineTeamLogo = styled.img`
  width: 20px;
  height: 20px;
  object-fit: contain;
`;

export const MatchupStatLabel = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    color: ${theme.colors.text.secondary};
    font-weight: ${theme.typography.fontWeight.medium};
  `}
`;

const getRankColor = (rank: number) => {
  if (rank <= 10) return "#10B981";
  if (rank <= 20) return "#F59E0B";
  return "#EF4444";
};

export const StatRank = styled.div<{ rank: number }>`
  ${({ theme, rank }) => css`
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    color: ${getRankColor(rank)};
  `}
`;

const getGapColor = (gap: number) => {
  if (gap >= 20) return "#10B981";
  if (gap >= 15) return "#22C55E";
  if (gap >= 10) return "#84CC16";
  if (gap >= 7) return "#EAB308";
  if (gap >= 5) return "#F59E0B";
  if (gap >= 3) return "#EF4444";
  return "#DC2626";
};

export const MatchupGap = styled.div<{ gap: number }>`
  ${({ theme, gap }) => css`
    display: flex;
    align-items: center;
    justify-content: center;
    min-width: 50px;
    height: 50px;
    border-radius: 50%;
    background: ${getGapColor(gap)};
    color: ${theme.colors.background.main};
    font-size: ${theme.typography.fontSize.lg};
    font-weight: ${theme.typography.fontWeight.bold};
    box-shadow: ${theme.shadows.md};
    transition: all ${theme.transitions.fast};

    &:hover {
      transform: scale(1.1);
    }
  `}
`;

export const Divider = styled.div`
  height: 1px;
  background: ${({ theme }) => theme.colors.border.light};
  margin: ${({ theme }) => theme.spacing.sm} 0;
`;

export const OtherPlayers = styled.div`
  ${({ theme }) => css`
    background: ${theme.colors.background.main};
    padding: ${theme.spacing.md};
    border-radius: ${theme.borderRadius.md};
  `}
`;

export const OtherPlayersTitle = styled.div`
  ${({ theme }) => css`
    font-size: ${theme.typography.fontSize.sm};
    font-weight: ${theme.typography.fontWeight.semibold};
    margin-bottom: ${theme.spacing.sm};
    color: ${theme.colors.text.secondary};
    text-transform: uppercase;
    letter-spacing: 0.5px;
  `}
`;

export const PlayerOption = styled.div`
  ${({ theme }) => css`
    padding: ${theme.spacing.sm};
    margin-bottom: ${theme.spacing.xs};
    background: ${theme.colors.background.card};
    border-radius: ${theme.borderRadius.sm};
    transition: background ${theme.transitions.fast};

    &:hover {
      background: ${theme.colors.background.hover};
    }

    &:last-child {
      margin-bottom: 0;
    }
  `}
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
