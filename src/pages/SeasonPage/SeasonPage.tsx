import { useState } from "react";
import { GameCard, WeekSelector } from "../../components";
import { getCurrentWeek } from "../../services/nflApi";
import { useWeekGames, useSortedGames } from "./hooks";
import {
  Section,
  SectionHeader,
  SectionTitleRow,
  SectionTitle,
  CurrentBadge,
  SectionSubtitle,
  LoadingContainer,
  LoadingSpinner,
  LoadingText,
  ErrorContainer,
  ErrorText,
  GamesGrid,
  EmptyState,
  EmptyText,
  EmptySubtext,
} from "./styles";

interface SeasonPageProps {
  season: number;
}

export const SeasonPage: React.FC<SeasonPageProps> = ({ season }) => {
  const currentWeek = getCurrentWeek();
  const [selectedWeek, setSelectedWeek] = useState(currentWeek);

  const { data: games, isLoading, error } = useWeekGames(season, selectedWeek);

  const sortedGames = useSortedGames(games);

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
            {selectedWeek === currentWeek && (
              <CurrentBadge>Current</CurrentBadge>
            )}
          </SectionTitleRow>
          <SectionSubtitle>
            Analyzing matchups, weather, and player trends for optimal touchdown
            scorer picks
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
    </>
  );
};
