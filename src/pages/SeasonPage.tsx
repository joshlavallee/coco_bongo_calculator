import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';
import { GameCard, WeekSelector } from '../components';
import { fetchWeekGames, getCurrentWeek, fetchHeadToHeadTDs } from '../services/nflApi';

interface SeasonPageProps {
  season: number;
}

export const SeasonPage: React.FC<SeasonPageProps> = ({ season }) => {
  const currentWeek = getCurrentWeek();
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const {
    data: games,
    isLoading,
    error,
  } = useQuery({
    queryKey: ['games', season, selectedWeek],
    queryFn: async () => {
      const games = await fetchWeekGames(season, selectedWeek);

      const gamesWithTDs = await Promise.all(
        games.map(async (game) => {
          const headToHeadTDs = await fetchHeadToHeadTDs(
            game.homeTeam.id,
            game.awayTeam.id,
            season
          );
          return {
            ...game,
            headToHeadTDs,
          };
        })
      );

      return gamesWithTDs;
    },
    refetchInterval: 5 * 60 * 1000,
  });

  const sortGamesByTime = (games: typeof games) => {
    if (!games) return games;

    return [...games].sort((a, b) => {
      const dateA = new Date(a.gameTime);
      const dateB = new Date(b.gameTime);

      const dayA = dateA.getDay();
      const dayB = dateB.getDay();
      const hourA = dateA.getHours();
      const hourB = dateB.getHours();

      const getPriority = (day: number, hour: number) => {
        if (day === 4) return 1;
        if (day === 0) {
          if (hour < 15) return 2;
          if (hour < 18) return 3;
          return 4;
        }
        if (day === 1) return 5;
        return 6;
      };

      const priorityA = getPriority(dayA, hourA);
      const priorityB = getPriority(dayB, hourB);

      if (priorityA !== priorityB) {
        return priorityA - priorityB;
      }

      const overUnderA = a.overUnder ?? Infinity;
      const overUnderB = b.overUnder ?? Infinity;

      if (overUnderA !== overUnderB) {
        return overUnderA - overUnderB;
      }

      return dateA.getTime() - dateB.getTime();
    });
  };

  const sortedGames = sortGamesByTime(games);

  return (
    <>
      <WeekSelector
        selectedWeek={selectedWeek}
        onWeekSelect={setSelectedWeek}
        currentWeek={currentWeek}
        season={season}
      />

      <Section>
        <SectionHeader>
          <SectionTitleRow>
            <SectionTitle>Week {selectedWeek} Games</SectionTitle>
            {selectedWeek === currentWeek && <CurrentBadge>Current</CurrentBadge>}
          </SectionTitleRow>
          <SectionSubtitle>
            Analyzing matchups, weather, and player trends for optimal touchdown scorer picks
          </SectionSubtitle>
        </SectionHeader>

        {isLoading && (
          <LoadingContainer>
            <LoadingSpinner />
            <LoadingText>Loading games...</LoadingText>
          </LoadingContainer>
        )}

        {error && (
          <ErrorContainer>
            <ErrorText>Failed to load games. Please try again later.</ErrorText>
          </ErrorContainer>
        )}

        {sortedGames && sortedGames.length > 0 && (
          <GamesGrid>
            {sortedGames.map((game) => (
              <GameCard key={game.id} game={game} />
            ))}
          </GamesGrid>
        )}

        {sortedGames && sortedGames.length === 0 && (
          <EmptyState>
            <EmptyText>No games scheduled for Week {selectedWeek}</EmptyText>
            <EmptySubtext>
              Select a different week or check back later for updated schedules
            </EmptySubtext>
          </EmptyState>
        )}
      </Section>

      <AlgorithmNote>
        <NoteTitle>Algorithm Customization</NoteTitle>
        <NoteText>
          The player recommendation algorithm considers weather conditions, defensive matchups, recent usage patterns, and betting odds.
          Customize the algorithm in <code>src/services/playerRecommendations.ts</code> to adjust:
        </NoteText>
        <NoteList>
          <li>Weather impact multipliers (lines 25-50)</li>
          <li>Defensive matchup scoring (lines 52-80)</li>
          <li>Recent usage trend calculations (lines 82-110)</li>
          <li>Overall scoring weights (lines 112-140)</li>
        </NoteList>
        <NoteText>
          High-value picks are highlighted when games have a high over/under (50+) combined with players at favorable odds (800+).
        </NoteText>
      </AlgorithmNote>

      <DataNote>
        <NoteTitle>Data Integration</NoteTitle>
        <NoteText>
          Game data is now live from ESPN API! Additional integration opportunities:
        </NoteText>
        <NoteList>
          <li><code>src/services/nflApi.ts</code> - Add real team rankings from stats API</li>
          <li><code>src/services/weatherApi.ts</code> - Enhanced weather forecasts for more accurate predictions</li>
          <li><code>src/services/playerRecommendations.ts</code> - Real player stats, odds, and recent performance data</li>
        </NoteList>
        <NoteText>
          Current: ESPN (games, teams, basic weather, odds). Consider: OpenWeatherMap (detailed weather), The Odds API (live betting lines)
        </NoteText>
      </DataNote>
    </>
  );
};

const Section = styled.section`
  margin-bottom: ${({ theme }) => theme.spacing.xxl};
`;

const SectionHeader = styled.div`
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const SectionTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.xs};
`;

const SectionTitle = styled.h2`
  font-size: ${({ theme }) => theme.typography.fontSize.xxl};
`;

const CurrentBadge = styled.div`
  background: ${({ theme }) => theme.colors.accent};
  color: ${({ theme }) => theme.colors.background.main};
  padding: ${({ theme }) => theme.spacing.xs} ${({ theme }) => theme.spacing.md};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

const SectionSubtitle = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  color: ${({ theme }) => theme.colors.text.secondary};
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

const ErrorContainer = styled.div`
  background: ${({ theme }) => theme.colors.error}22;
  border: 1px solid ${({ theme }) => theme.colors.error};
  border-radius: ${({ theme }) => theme.borderRadius.md};
  padding: ${({ theme }) => theme.spacing.lg};
  text-align: center;
`;

const ErrorText = styled.div`
  color: ${({ theme }) => theme.colors.error};
  font-size: ${({ theme }) => theme.typography.fontSize.md};
  font-weight: ${({ theme }) => theme.typography.fontWeight.medium};
`;

const GamesGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(380px, 1fr));
  gap: ${({ theme }) => theme.spacing.lg};

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
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

const AlgorithmNote = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.accent};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
  margin-bottom: ${({ theme }) => theme.spacing.lg};
`;

const DataNote = styled.div`
  background: ${({ theme }) => theme.colors.background.card};
  border: 1px solid ${({ theme }) => theme.colors.border.medium};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing.lg};
`;

const NoteTitle = styled.h3`
  font-size: ${({ theme }) => theme.typography.fontSize.lg};
  color: ${({ theme }) => theme.colors.accent};
  margin-bottom: ${({ theme }) => theme.spacing.sm};
  font-weight: ${({ theme }) => theme.typography.fontWeight.semibold};
`;

const NoteText = styled.p`
  font-size: ${({ theme }) => theme.typography.fontSize.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  line-height: 1.6;
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  code {
    background: ${({ theme }) => theme.colors.background.main};
    padding: 2px 6px;
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-family: ${({ theme }) => theme.typography.fontFamily.mono};
    font-size: ${({ theme }) => theme.typography.fontSize.xs};
    color: ${({ theme }) => theme.colors.accent};
  }
`;

const NoteList = styled.ul`
  list-style: none;
  padding-left: ${({ theme }) => theme.spacing.md};
  margin-bottom: ${({ theme }) => theme.spacing.sm};

  li {
    font-size: ${({ theme }) => theme.typography.fontSize.sm};
    color: ${({ theme }) => theme.colors.text.secondary};
    margin-bottom: ${({ theme }) => theme.spacing.xs};
    position: relative;
    padding-left: ${({ theme }) => theme.spacing.md};

    &:before {
      content: '→';
      position: absolute;
      left: 0;
      color: ${({ theme }) => theme.colors.accent};
    }

    code {
      background: ${({ theme }) => theme.colors.background.main};
      padding: 2px 6px;
      border-radius: ${({ theme }) => theme.borderRadius.sm};
      font-family: ${({ theme }) => theme.typography.fontFamily.mono};
      font-size: ${({ theme }) => theme.typography.fontSize.xs};
      color: ${({ theme }) => theme.colors.accent};
    }
  }
`;
