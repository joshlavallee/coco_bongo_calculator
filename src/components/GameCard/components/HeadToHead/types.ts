export interface TDScorer {
  name: string;
  count: number;
}

export interface HeadToHeadDisplay {
  displayScorers: TDScorer[];
  fifthRow: TDScorer | null;
}

export interface HeadToHeadProps {
  headToHeadDisplay: HeadToHeadDisplay;
}
