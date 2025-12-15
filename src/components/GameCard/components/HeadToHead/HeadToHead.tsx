import {
  HeadToHeadSection,
  HeadToHeadTitle,
  TDScorersList,
  TDScorerItem,
  TDScorerName,
  TDScorerCount,
} from "./styles";
import { HeadToHeadProps } from "./types";

export const HeadToHead: React.FC<HeadToHeadProps> = ({
  headToHeadDisplay,
}) => {
  const { displayScorers, fifthRow } = headToHeadDisplay;

  if (displayScorers.length === 0) {
    return null;
  }

  return (
    <HeadToHeadSection>
      <HeadToHeadTitle>Last 3 Meeting TD Scorers</HeadToHeadTitle>
      <TDScorersList>
        {displayScorers.map((scorer, index) => (
          <TDScorerItem key={index}>
            <TDScorerName>{scorer.name}</TDScorerName>
            <TDScorerCount tdCount={scorer.count}>{scorer.count}</TDScorerCount>
          </TDScorerItem>
        ))}
        {fifthRow && (
          <TDScorerItem>
            <TDScorerName>{fifthRow.name}</TDScorerName>
            <TDScorerCount tdCount={fifthRow.count}>
              {fifthRow.count}
            </TDScorerCount>
          </TDScorerItem>
        )}
      </TDScorersList>
    </HeadToHeadSection>
  );
};
