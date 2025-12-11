export interface WeekSelectorProps {
  selectedWeek: number;
  onWeekSelect: (week: number) => void;
  currentWeek: number;
  season: number;
}
