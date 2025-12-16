import { useState } from "react";
import { TrendingUp, Info, X } from "lucide-react";
import { useGameCardData } from "./hooks/index";
import { Weather, OverUnder, HeadToHead } from "./components";
import { useGame } from "./context";
import {
  POTENTIAL_BOX_TITLE,
  TOP_PICK_TITLE,
  HIGH_VALUE_BADGE_TEXT,
  HIGH_VALUE_BADGE_TOOLTIP,
  MATCHUP_ANALYSIS_TITLE,
  OTHER_OPTIONS_TITLE,
  PASS_OFFENSE_TITLE,
  PASS_DEFENSE_TITLE,
  RUSH_OFFENSE_TITLE,
  RUSH_DEFENSE_TITLE,
  TOUCHDOWNS_SCORED_TITLE,
  CALCULATING_TEXT,
  VS_INDICATOR,
} from "./constants";
import {
  formatGameTime,
  getTeamName,
  getTeamLogoUrl,
  getWeeklyTDs,
} from "./utils";
import {
  CardContainer,
  CardHeader,
  GameTime,
  HeaderRight,
  PotentialBoxBadge,
  InfoButton,
  MatchupSection,
  TeamContainer,
  TeamLogo,
  TeamName,
  TeamAbbr,
  VSIndicator,
  StatsSection,
  RecommendationSection,
  RecommendationHeader,
  HighValueBadge,
  PlayerPick,
  PlayerName,
  PlayerInfo,
  OddsBadge,
  TDSectionLabel,
  SeasonTDGrid,
  TDSquare,
  HoverOverlay,
  OverlayHeader,
  OverlayTitle,
  CloseButton,
  MatchupsContainer,
  MatchupRow,
  TeamStat,
  StatTeam,
  InlineTeamLogo,
  MatchupStatLabel,
  StatRank,
  MatchupGap,
  Divider,
  OtherPlayers,
  OtherPlayersTitle,
  PlayerOption,
  PlayerOptionName,
  PlayerOptionStats,
} from "./styles";

export const GameCard: React.FC = () => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const { game } = useGame();
  const { recommendedPlayers, topPick, headToHeadDisplay } = useGameCardData();

  return (
    <CardContainer>
      <CardHeader>
        <GameTime>{formatGameTime(game.gameTime)}</GameTime>
        <HeaderRight>
          {game.overUnder !== null && game.overUnder < 40 && (
            <PotentialBoxBadge>{POTENTIAL_BOX_TITLE}</PotentialBoxBadge>
          )}
          <InfoButton onClick={() => setIsDetailOpen(!isDetailOpen)}>
            <Info size={18} />
          </InfoButton>
        </HeaderRight>
      </CardHeader>

      <MatchupSection>
        <TeamContainer>
          <TeamLogo
            src={getTeamLogoUrl(game.awayTeam.abbreviation)}
            alt={game.awayTeam.name}
          />
          <TeamName>{getTeamName(game.awayTeam.name)}</TeamName>
          <TeamAbbr>{game.awayTeam.abbreviation}</TeamAbbr>
        </TeamContainer>

        <VSIndicator>{VS_INDICATOR}</VSIndicator>

        <TeamContainer>
          <TeamLogo
            src={getTeamLogoUrl(game.homeTeam.abbreviation)}
            alt={game.homeTeam.name}
          />
          <TeamName>{getTeamName(game.homeTeam.name)}</TeamName>
          <TeamAbbr>{game.homeTeam.abbreviation}</TeamAbbr>
        </TeamContainer>
      </MatchupSection>

      <StatsSection>
        <Weather />
        <OverUnder />
      </StatsSection>

      <HeadToHead headToHeadDisplay={headToHeadDisplay} />

      <RecommendationSection>
        <RecommendationHeader>
          <span>{TOP_PICK_TITLE}</span>
          {topPick?.isHighValue && (
            <HighValueBadge title={HIGH_VALUE_BADGE_TOOLTIP}>
              <TrendingUp size={16} />
              {HIGH_VALUE_BADGE_TEXT}
            </HighValueBadge>
          )}
        </RecommendationHeader>
        <PlayerPick>
          <PlayerName>{topPick?.name || CALCULATING_TEXT}</PlayerName>
          <PlayerInfo>
            <span>{topPick?.position}</span>
            <OddsBadge>+{topPick?.odds || 0}</OddsBadge>
          </PlayerInfo>
          <TDSectionLabel>{TOUCHDOWNS_SCORED_TITLE}</TDSectionLabel>
          <SeasonTDGrid>
            {getWeeklyTDs(game.week).map((tds, index) => (
              <TDSquare key={index} $hasData={tds !== null} $tdCount={tds}>
                {tds !== null ? tds : "-"}
              </TDSquare>
            ))}
          </SeasonTDGrid>
        </PlayerPick>
      </RecommendationSection>

      <HoverOverlay $visible={isDetailOpen}>
        <OverlayHeader>
          <OverlayTitle>{MATCHUP_ANALYSIS_TITLE}</OverlayTitle>
          <CloseButton onClick={() => setIsDetailOpen(false)}>
            <X size={20} />
          </CloseButton>
        </OverlayHeader>

        <MatchupsContainer>
          <MatchupRow>
            <TeamStat $side="away">
              <StatTeam>
                {game.awayTeam.abbreviation}
                <InlineTeamLogo
                  src={getTeamLogoUrl(game.awayTeam.abbreviation)}
                  alt={game.awayTeam.abbreviation}
                />
              </StatTeam>
              <MatchupStatLabel>{PASS_OFFENSE_TITLE}</MatchupStatLabel>
              <StatRank $rank={game.awayTeam.passOffenseRank}>
                #{game.awayTeam.passOffenseRank}
              </StatRank>
            </TeamStat>
            <MatchupGap
              $gap={Math.abs(
                game.awayTeam.passOffenseRank - game.homeTeam.passDefenseRank
              )}
            >
              {Math.abs(
                game.awayTeam.passOffenseRank - game.homeTeam.passDefenseRank
              )}
            </MatchupGap>
            <TeamStat $side="home">
              <StatTeam>
                <InlineTeamLogo
                  src={getTeamLogoUrl(game.homeTeam.abbreviation)}
                  alt={game.homeTeam.abbreviation}
                />
                {game.homeTeam.abbreviation}
              </StatTeam>
              <MatchupStatLabel>{PASS_DEFENSE_TITLE}</MatchupStatLabel>
              <StatRank $rank={game.homeTeam.passDefenseRank}>
                #{game.homeTeam.passDefenseRank}
              </StatRank>
            </TeamStat>
          </MatchupRow>

          <MatchupRow>
            <TeamStat $side="away">
              <StatTeam>
                {game.awayTeam.abbreviation}
                <InlineTeamLogo
                  src={getTeamLogoUrl(game.awayTeam.abbreviation)}
                  alt={game.awayTeam.abbreviation}
                />
              </StatTeam>
              <MatchupStatLabel>{RUSH_OFFENSE_TITLE}</MatchupStatLabel>
              <StatRank $rank={game.awayTeam.rushOffenseRank}>
                #{game.awayTeam.rushOffenseRank}
              </StatRank>
            </TeamStat>
            <MatchupGap
              $gap={Math.abs(
                game.awayTeam.rushOffenseRank - game.homeTeam.rushDefenseRank
              )}
            >
              {Math.abs(
                game.awayTeam.rushOffenseRank - game.homeTeam.rushDefenseRank
              )}
            </MatchupGap>
            <TeamStat $side="home">
              <StatTeam>
                <InlineTeamLogo
                  src={getTeamLogoUrl(game.homeTeam.abbreviation)}
                  alt={game.homeTeam.abbreviation}
                />
                {game.homeTeam.abbreviation}
              </StatTeam>
              <MatchupStatLabel>{RUSH_DEFENSE_TITLE}</MatchupStatLabel>
              <StatRank $rank={game.homeTeam.rushDefenseRank}>
                #{game.homeTeam.rushDefenseRank}
              </StatRank>
            </TeamStat>
          </MatchupRow>

          <Divider />

          <MatchupRow>
            <TeamStat $side="away">
              <StatTeam>
                {game.homeTeam.abbreviation}
                <InlineTeamLogo
                  src={getTeamLogoUrl(game.homeTeam.abbreviation)}
                  alt={game.homeTeam.abbreviation}
                />
              </StatTeam>
              <MatchupStatLabel>{PASS_OFFENSE_TITLE}</MatchupStatLabel>
              <StatRank $rank={game.homeTeam.passOffenseRank}>
                #{game.homeTeam.passOffenseRank}
              </StatRank>
            </TeamStat>
            <MatchupGap
              $gap={Math.abs(
                game.homeTeam.passOffenseRank - game.awayTeam.passDefenseRank
              )}
            >
              {Math.abs(
                game.homeTeam.passOffenseRank - game.awayTeam.passDefenseRank
              )}
            </MatchupGap>
            <TeamStat $side="home">
              <StatTeam>
                <InlineTeamLogo
                  src={getTeamLogoUrl(game.awayTeam.abbreviation)}
                  alt={game.awayTeam.abbreviation}
                />
                {game.awayTeam.abbreviation}
              </StatTeam>
              <MatchupStatLabel>{PASS_DEFENSE_TITLE}</MatchupStatLabel>
              <StatRank $rank={game.awayTeam.passDefenseRank}>
                #{game.awayTeam.passDefenseRank}
              </StatRank>
            </TeamStat>
          </MatchupRow>

          <MatchupRow>
            <TeamStat $side="away">
              <StatTeam>
                {game.homeTeam.abbreviation}
                <InlineTeamLogo
                  src={getTeamLogoUrl(game.homeTeam.abbreviation)}
                  alt={game.homeTeam.abbreviation}
                />
              </StatTeam>
              <MatchupStatLabel>{RUSH_OFFENSE_TITLE}</MatchupStatLabel>
              <StatRank $rank={game.homeTeam.rushOffenseRank}>
                #{game.homeTeam.rushOffenseRank}
              </StatRank>
            </TeamStat>
            <MatchupGap
              $gap={Math.abs(
                game.homeTeam.rushOffenseRank - game.awayTeam.rushDefenseRank
              )}
            >
              {Math.abs(
                game.homeTeam.rushOffenseRank - game.awayTeam.rushDefenseRank
              )}
            </MatchupGap>
            <TeamStat $side="home">
              <StatTeam>
                <InlineTeamLogo
                  src={getTeamLogoUrl(game.awayTeam.abbreviation)}
                  alt={game.awayTeam.abbreviation}
                />
                {game.awayTeam.abbreviation}
              </StatTeam>
              <MatchupStatLabel>{RUSH_DEFENSE_TITLE}</MatchupStatLabel>
              <StatRank $rank={game.awayTeam.rushDefenseRank}>
                #{game.awayTeam.rushDefenseRank}
              </StatRank>
            </TeamStat>
          </MatchupRow>
        </MatchupsContainer>

        <OtherPlayers>
          <OtherPlayersTitle>{OTHER_OPTIONS_TITLE}</OtherPlayersTitle>
          {recommendedPlayers.slice(1, 4).map((player) => (
            <PlayerOption key={player.id}>
              <PlayerOptionName>
                {player.name}
                {player.isHighValue && (
                  <TrendingUp size={12} style={{ marginLeft: "4px" }} />
                )}
              </PlayerOptionName>
              <PlayerOptionStats>
                <span>{player.position}</span>
                <span>+{player.odds}</span>
              </PlayerOptionStats>
            </PlayerOption>
          ))}
        </OtherPlayers>
      </HoverOverlay>
    </CardContainer>
  );
};
