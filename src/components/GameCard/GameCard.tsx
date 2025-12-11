import { useState } from 'react';
import { Wind, TrendingUp, Home, Info, X } from 'lucide-react';
import { getRecommendedPlayers } from '../../services/playerRecommendations';
import { GameCardProps } from './types';
import {
  DOME_TEAMS,
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
  WEATHER_TITLE,
  WIND_TITLE,
  OVER_UNDER_TITLE,
  FINAL_TOTAL_TITLE,
  TOTAL_POINTS_TITLE,
  NOT_AVAILABLE_TEXT,
  INDOOR_STADIUM_TEXT,
  DOME_TEXT,
  MPH_TEXT,
  HIGH_WIND_TEXT,
  TOUCHDOWNS_SCORED_TITLE,
  CALCULATING_TEXT,
  VS_INDICATOR,
} from './constants';
import {
  formatGameTime,
  fahrenheitToCelsius,
  getTeamName,
  getTeamLogoUrl,
  getWeeklyTDs,
  getWeatherIcon,
} from './utils';
import * as S from './styles';

export const GameCard: React.FC<GameCardProps> = ({ game }) => {
  const [isDetailOpen, setIsDetailOpen] = useState(false);
  const recommendedPlayers = getRecommendedPlayers(game);
  const topPick = recommendedPlayers[0];
  const isDomeGame = DOME_TEAMS.includes(game.homeTeam.abbreviation);

  const isWeatherAvailable = game.weather.condition !== 'Clear' || game.weather.temperature !== 70 || game.weather.windSpeed > 0;

  return (
    <S.CardContainer>
      <S.CardHeader>
        <S.GameTime>{formatGameTime(game.gameTime)}</S.GameTime>
        <S.HeaderRight>
          {game.overUnder !== null && game.overUnder < 40 && (
            <S.PotentialBoxBadge>{POTENTIAL_BOX_TITLE}</S.PotentialBoxBadge>
          )}
          <S.InfoButton onClick={() => setIsDetailOpen(!isDetailOpen)}>
            <Info size={18} />
          </S.InfoButton>
        </S.HeaderRight>
      </S.CardHeader>

      <S.MatchupSection>
        <S.TeamContainer>
          <S.TeamLogo src={getTeamLogoUrl(game.awayTeam.abbreviation)} alt={game.awayTeam.name} />
          <S.TeamName>{getTeamName(game.awayTeam.name)}</S.TeamName>
          <S.TeamAbbr>{game.awayTeam.abbreviation}</S.TeamAbbr>
        </S.TeamContainer>

        <S.VSIndicator>{VS_INDICATOR}</S.VSIndicator>

        <S.TeamContainer>
          <S.TeamLogo src={getTeamLogoUrl(game.homeTeam.abbreviation)} alt={game.homeTeam.name} />
          <S.TeamName>{getTeamName(game.homeTeam.name)}</S.TeamName>
          <S.TeamAbbr>{game.homeTeam.abbreviation}</S.TeamAbbr>
        </S.TeamContainer>
      </S.MatchupSection>

      <S.StatsSection>
        <S.StatCard>
          <S.StatLabel>{WEATHER_TITLE}</S.StatLabel>
          {isDomeGame ? (
            <>
              <S.StatValue>
                <S.WeatherIcon><Home size={20} /></S.WeatherIcon>
                <span>{DOME_TEXT}</span>
              </S.StatValue>
              <S.StatDetail>{INDOOR_STADIUM_TEXT}</S.StatDetail>
            </>
          ) : !isWeatherAvailable ? (
            <>
              <S.StatValue>
                <S.WeatherIcon>{getWeatherIcon(isWeatherAvailable, game.weather.condition)}</S.WeatherIcon>
                <span>-</span>
              </S.StatValue>
              <S.StatDetail>{NOT_AVAILABLE_TEXT}</S.StatDetail>
            </>
          ) : (
            <>
              <S.StatValue>
                <S.WeatherIcon>{getWeatherIcon(isWeatherAvailable, game.weather.condition)}</S.WeatherIcon>
                <span>{fahrenheitToCelsius(game.weather.temperature)}°C</span>
              </S.StatValue>
              <S.StatDetail>{game.weather.condition}</S.StatDetail>
            </>
          )}
        </S.StatCard>

        <S.StatCard>
          <S.StatLabel>{WIND_TITLE}</S.StatLabel>
          {isDomeGame ? (
            <>
              <S.StatValue>
                <S.WeatherIcon><Wind size={20} /></S.WeatherIcon>
                <span>0</span>
              </S.StatValue>
              <S.StatDetail>{MPH_TEXT}</S.StatDetail>
            </>
          ) : !isWeatherAvailable ? (
            <>
              <S.StatValue>
                <S.WeatherIcon><Wind size={20} /></S.WeatherIcon>
                <span>-</span>
              </S.StatValue>
              <S.StatDetail>{NOT_AVAILABLE_TEXT}</S.StatDetail>
            </>
          ) : (
            <>
              <S.StatValue large={game.weather.windSpeed > 15}>
                {game.weather.windSpeed}
              </S.StatValue>
              <S.StatDetail>{MPH_TEXT}</S.StatDetail>
              {game.weather.windSpeed > 15 && (
                <S.WindWarning>
                  <Wind size={14} />
                  <span>{HIGH_WIND_TEXT}</span>
                </S.WindWarning>
              )}
            </>
          )}
        </S.StatCard>

        <S.StatCard>
          <S.StatLabel>
            {game.isCompleted && game.homeScore !== undefined && game.awayScore !== undefined
              ? FINAL_TOTAL_TITLE
              : OVER_UNDER_TITLE}
          </S.StatLabel>
          {game.isCompleted && game.homeScore !== undefined && game.awayScore !== undefined ? (
            <>
              <S.StatValue large>{game.homeScore + game.awayScore}</S.StatValue>
              <S.StatDetail>{game.awayScore} - {game.homeScore}</S.StatDetail>
            </>
          ) : game.overUnder !== null ? (
            <>
              <S.StatValue large>{game.overUnder}</S.StatValue>
              <S.StatDetail>{TOTAL_POINTS_TITLE}</S.StatDetail>
            </>
          ) : (
            <>
              <S.StatValue>
                <span>-</span>
              </S.StatValue>
              <S.StatDetail>{NOT_AVAILABLE_TEXT}</S.StatDetail>
            </>
          )}
        </S.StatCard>
      </S.StatsSection>

      {game.headToHeadTDs && game.headToHeadTDs.topScorers.length > 0 && (() => {
        const scorers = game.headToHeadTDs.topScorers;
        const displayScorers = scorers.slice(0, 4);

        let fifthRow = null;
        if (scorers.length > 4) {
          const fifthScorer = scorers[4];
          const remainingScorers = scorers.slice(5);
          const othersTiedAtSameCount = remainingScorers.filter(s => s.count === fifthScorer.count);

          if (othersTiedAtSameCount.length > 0) {
            fifthRow = {
              name: `${othersTiedAtSameCount.length + 1} others tied at`,
              count: fifthScorer.count
            };
          } else {
            fifthRow = fifthScorer;
          }
        }

        return (
          <S.HeadToHeadSection>
            <S.HeadToHeadTitle>Last 3 Meeting TD Scorers</S.HeadToHeadTitle>
            <S.TDScorersList>
              {displayScorers.map((scorer, index) => (
                <S.TDScorerItem key={index}>
                  <S.TDScorerName>{scorer.name}</S.TDScorerName>
                  <S.TDScorerCount tdCount={scorer.count}>{scorer.count}</S.TDScorerCount>
                </S.TDScorerItem>
              ))}
              {fifthRow && (
                <S.TDScorerItem>
                  <S.TDScorerName>{fifthRow.name}</S.TDScorerName>
                  <S.TDScorerCount tdCount={fifthRow.count}>{fifthRow.count}</S.TDScorerCount>
                </S.TDScorerItem>
              )}
            </S.TDScorersList>
          </S.HeadToHeadSection>
        );
      })()}

      <S.RecommendationSection>
        <S.RecommendationHeader>
          <span>{TOP_PICK_TITLE}</span>
          {topPick?.isHighValue && (
            <S.HighValueBadge title={HIGH_VALUE_BADGE_TOOLTIP}>
              <TrendingUp size={16} />
              {HIGH_VALUE_BADGE_TEXT}
            </S.HighValueBadge>
          )}
        </S.RecommendationHeader>
        <S.PlayerPick>
          <S.PlayerName>{topPick?.name || CALCULATING_TEXT}</S.PlayerName>
          <S.PlayerInfo>
            <span>{topPick?.position}</span>
            <S.OddsBadge>+{topPick?.odds || 0}</S.OddsBadge>
          </S.PlayerInfo>
          <S.TDSectionLabel>{TOUCHDOWNS_SCORED_TITLE}</S.TDSectionLabel>
          <S.SeasonTDGrid>
            {getWeeklyTDs(game.week).map((tds, index) => (
              <S.TDSquare key={index} hasData={tds !== null} tdCount={tds}>
                {tds !== null ? tds : '-'}
              </S.TDSquare>
            ))}
          </S.SeasonTDGrid>
        </S.PlayerPick>
      </S.RecommendationSection>

      <S.HoverOverlay visible={isDetailOpen}>
        <S.OverlayHeader>
          <S.OverlayTitle>{MATCHUP_ANALYSIS_TITLE}</S.OverlayTitle>
          <S.CloseButton onClick={() => setIsDetailOpen(false)}>
            <X size={20} />
          </S.CloseButton>
        </S.OverlayHeader>

        <S.MatchupsContainer>
          <S.MatchupRow>
            <S.TeamStat side="away">
              <S.StatTeam>
                {game.awayTeam.abbreviation}
                <S.InlineTeamLogo src={getTeamLogoUrl(game.awayTeam.abbreviation)} alt={game.awayTeam.abbreviation} />
              </S.StatTeam>
              <S.MatchupStatLabel>{PASS_OFFENSE_TITLE}</S.MatchupStatLabel>
              <S.StatRank rank={game.awayTeam.passOffenseRank}>
                #{game.awayTeam.passOffenseRank}
              </S.StatRank>
            </S.TeamStat>
            <S.MatchupGap
              gap={Math.abs(game.awayTeam.passOffenseRank - game.homeTeam.passDefenseRank)}
            >
              {Math.abs(game.awayTeam.passOffenseRank - game.homeTeam.passDefenseRank)}
            </S.MatchupGap>
            <S.TeamStat side="home">
              <S.StatTeam>
                <S.InlineTeamLogo src={getTeamLogoUrl(game.homeTeam.abbreviation)} alt={game.homeTeam.abbreviation} />
                {game.homeTeam.abbreviation}
              </S.StatTeam>
              <S.MatchupStatLabel>{PASS_DEFENSE_TITLE}</S.MatchupStatLabel>
              <S.StatRank rank={game.homeTeam.passDefenseRank}>
                #{game.homeTeam.passDefenseRank}
              </S.StatRank>
            </S.TeamStat>
          </S.MatchupRow>

          <S.MatchupRow>
            <S.TeamStat side="away">
              <S.StatTeam>
                {game.awayTeam.abbreviation}
                <S.InlineTeamLogo src={getTeamLogoUrl(game.awayTeam.abbreviation)} alt={game.awayTeam.abbreviation} />
              </S.StatTeam>
              <S.MatchupStatLabel>{RUSH_OFFENSE_TITLE}</S.MatchupStatLabel>
              <S.StatRank rank={game.awayTeam.rushOffenseRank}>
                #{game.awayTeam.rushOffenseRank}
              </S.StatRank>
            </S.TeamStat>
            <S.MatchupGap
              gap={Math.abs(game.awayTeam.rushOffenseRank - game.homeTeam.rushDefenseRank)}
            >
              {Math.abs(game.awayTeam.rushOffenseRank - game.homeTeam.rushDefenseRank)}
            </S.MatchupGap>
            <S.TeamStat side="home">
              <S.StatTeam>
                <S.InlineTeamLogo src={getTeamLogoUrl(game.homeTeam.abbreviation)} alt={game.homeTeam.abbreviation} />
                {game.homeTeam.abbreviation}
              </S.StatTeam>
              <S.MatchupStatLabel>{RUSH_DEFENSE_TITLE}</S.MatchupStatLabel>
              <S.StatRank rank={game.homeTeam.rushDefenseRank}>
                #{game.homeTeam.rushDefenseRank}
              </S.StatRank>
            </S.TeamStat>
          </S.MatchupRow>

          <S.Divider />

          <S.MatchupRow>
            <S.TeamStat side="away">
              <S.StatTeam>
                {game.homeTeam.abbreviation}
                <S.InlineTeamLogo src={getTeamLogoUrl(game.homeTeam.abbreviation)} alt={game.homeTeam.abbreviation} />
              </S.StatTeam>
              <S.MatchupStatLabel>{PASS_OFFENSE_TITLE}</S.MatchupStatLabel>
              <S.StatRank rank={game.homeTeam.passOffenseRank}>
                #{game.homeTeam.passOffenseRank}
              </S.StatRank>
            </S.TeamStat>
            <S.MatchupGap
              gap={Math.abs(game.homeTeam.passOffenseRank - game.awayTeam.passDefenseRank)}
            >
              {Math.abs(game.homeTeam.passOffenseRank - game.awayTeam.passDefenseRank)}
            </S.MatchupGap>
            <S.TeamStat side="home">
              <S.StatTeam>
                <S.InlineTeamLogo src={getTeamLogoUrl(game.awayTeam.abbreviation)} alt={game.awayTeam.abbreviation} />
                {game.awayTeam.abbreviation}
              </S.StatTeam>
              <S.MatchupStatLabel>{PASS_DEFENSE_TITLE}</S.MatchupStatLabel>
              <S.StatRank rank={game.awayTeam.passDefenseRank}>
                #{game.awayTeam.passDefenseRank}
              </S.StatRank>
            </S.TeamStat>
          </S.MatchupRow>

          <S.MatchupRow>
            <S.TeamStat side="away">
              <S.StatTeam>
                {game.homeTeam.abbreviation}
                <S.InlineTeamLogo src={getTeamLogoUrl(game.homeTeam.abbreviation)} alt={game.homeTeam.abbreviation} />
              </S.StatTeam>
              <S.MatchupStatLabel>{RUSH_OFFENSE_TITLE}</S.MatchupStatLabel>
              <S.StatRank rank={game.homeTeam.rushOffenseRank}>
                #{game.homeTeam.rushOffenseRank}
              </S.StatRank>
            </S.TeamStat>
            <S.MatchupGap
              gap={Math.abs(game.homeTeam.rushOffenseRank - game.awayTeam.rushDefenseRank)}
            >
              {Math.abs(game.homeTeam.rushOffenseRank - game.awayTeam.rushDefenseRank)}
            </S.MatchupGap>
            <S.TeamStat side="home">
              <S.StatTeam>
                <S.InlineTeamLogo src={getTeamLogoUrl(game.awayTeam.abbreviation)} alt={game.awayTeam.abbreviation} />
                {game.awayTeam.abbreviation}
              </S.StatTeam>
              <S.MatchupStatLabel>{RUSH_DEFENSE_TITLE}</S.MatchupStatLabel>
              <S.StatRank rank={game.awayTeam.rushDefenseRank}>
                #{game.awayTeam.rushDefenseRank}
              </S.StatRank>
            </S.TeamStat>
          </S.MatchupRow>
        </S.MatchupsContainer>

        <S.OtherPlayers>
          <S.OtherPlayersTitle>{OTHER_OPTIONS_TITLE}</S.OtherPlayersTitle>
          {recommendedPlayers.slice(1, 4).map((player) => (
            <S.PlayerOption key={player.id}>
              <S.PlayerOptionName>
                {player.name}
                {player.isHighValue && (
                  <TrendingUp size={12} style={{ marginLeft: '4px' }} />
                )}
              </S.PlayerOptionName>
              <S.PlayerOptionStats>
                <span>{player.position}</span>
                <span>+{player.odds}</span>
              </S.PlayerOptionStats>
            </S.PlayerOption>
          ))}
        </S.OtherPlayers>
      </S.HoverOverlay>
    </S.CardContainer>
  );
};
