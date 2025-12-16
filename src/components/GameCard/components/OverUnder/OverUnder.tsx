import { StatCard, StatLabel, StatValue, StatDetail } from "../../styles";
import {
  OVER_UNDER_TITLE,
  FINAL_TOTAL_TITLE,
  TOTAL_POINTS_TITLE,
  NOT_AVAILABLE_TEXT,
} from "../../constants";
import { useGame } from "../../context";

export const OverUnder: React.FC = () => {
  const { isCompleted, homeScore, awayScore, overUnder } = useGame();
  return (
    <StatCard>
      <StatLabel>
        {isCompleted && homeScore !== undefined && awayScore !== undefined
          ? FINAL_TOTAL_TITLE
          : OVER_UNDER_TITLE}
      </StatLabel>
      {isCompleted ? (
        <>
          <StatValue large>{homeScore + awayScore}</StatValue>
          <StatDetail>
            {awayScore} - {homeScore}
          </StatDetail>
        </>
      ) : overUnder !== null ? (
        <>
          <StatValue large>{overUnder}</StatValue>
          <StatDetail>{TOTAL_POINTS_TITLE}</StatDetail>
        </>
      ) : (
        <>
          <StatValue>
            <span>-</span>
          </StatValue>
          <StatDetail>{NOT_AVAILABLE_TEXT}</StatDetail>
        </>
      )}
    </StatCard>
  );
};
