import { WeekSelectorProps } from "./types";
import { useWeekSelectorData } from "./hooks/index";
import { SEASON_SUFFIX, REGULAR_SEASON_WEEKS_SUBTITLE } from "./constants";
import {
  Container,
  Header,
  Title,
  Subtitle,
  WeekGrid,
  WeekPill,
  WeekNumber,
  AssignedName,
} from "./styles";

export const WeekSelector: React.FC<WeekSelectorProps> = ({
  selectedWeek,
  onWeekSelect,
  currentWeek,
  season,
}) => {
  const { weekNumbers, assignments } = useWeekSelectorData(season);

  return (
    <Container>
      <Header>
        <Title>
          {season} {SEASON_SUFFIX}
        </Title>
        <Subtitle>{REGULAR_SEASON_WEEKS_SUBTITLE}</Subtitle>
      </Header>
      <WeekGrid>
        {weekNumbers.map((week) => {
          const assignedName = assignments[week.toString()];
          return (
            <WeekPill
              key={week}
              $selected={selectedWeek === week}
              $isCurrent={currentWeek === week}
              onClick={() => onWeekSelect(week)}
            >
              <WeekNumber>{week}</WeekNumber>
              {assignedName && <AssignedName>{assignedName}</AssignedName>}
            </WeekPill>
          );
        })}
      </WeekGrid>
    </Container>
  );
};
