import weekAssignments from '../../data/weekAssignments.json';
import { WeekSelectorProps } from './types';
import { SEASON_SUFFIX, REGULAR_SEASON_WEEKS_SUBTITLE, NUMBER_OF_WEEKS } from './constants';
import * as S from './styles';

export const WeekSelector: React.FC<WeekSelectorProps> = ({
  selectedWeek,
  onWeekSelect,
  currentWeek,
  season,
}) => {
  const weeks = Array.from({ length: NUMBER_OF_WEEKS }, (_, i) => i + 1);
  const assignments = weekAssignments[season.toString() as keyof typeof weekAssignments] || {};

  return (
    <S.Container>
      <S.Header>
        <S.Title>{season} {SEASON_SUFFIX}</S.Title>
        <S.Subtitle>{REGULAR_SEASON_WEEKS_SUBTITLE}</S.Subtitle>
      </S.Header>
      <S.WeekGrid>
        {weeks.map((week) => {
          const assignedName = assignments[week.toString() as keyof typeof assignments];
          return (
            <S.WeekPill
              key={week}
              selected={selectedWeek === week}
              isCurrent={currentWeek === week}
              onClick={() => onWeekSelect(week)}
            >
              <S.WeekNumber>{week}</S.WeekNumber>
              {assignedName && <S.AssignedName>{assignedName}</S.AssignedName>}
            </S.WeekPill>
          );
        })}
      </S.WeekGrid>
    </S.Container>
  );
};
