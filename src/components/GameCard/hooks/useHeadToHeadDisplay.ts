import { useMemo } from 'react';
import { Game } from '../../../types';

/**
 * Hook to process head-to-head TD scorers
 * Returns display scorers and optional fifth row
 */
export const useHeadToHeadDisplay = (game: Game) => {
  return useMemo(() => {
    if (!game.headToHeadTDs || game.headToHeadTDs.topScorers.length === 0) {
      return { displayScorers: [], fifthRow: null };
    }

    const scorers = game.headToHeadTDs.topScorers;
    const displayScorers = scorers.slice(0, 4);

    let fifthRow = null;
    if (scorers.length > 4) {
      const fifthScorer = scorers[4];
      const remainingScorers = scorers.slice(5);
      const othersTiedAtSameCount = remainingScorers.filter(
        s => s.count === fifthScorer.count
      );

      if (othersTiedAtSameCount.length > 0) {
        fifthRow = {
          name: `${othersTiedAtSameCount.length + 1} others tied at`,
          count: fifthScorer.count,
        };
      } else {
        fifthRow = fifthScorer;
      }
    }

    return { displayScorers, fifthRow };
  }, [game.headToHeadTDs]);
};
