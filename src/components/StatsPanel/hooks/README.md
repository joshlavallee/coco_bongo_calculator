# StatsPanel Hooks

This document describes the custom hooks available in the StatsPanel component for calculating and processing betting statistics.

## File Structure

Each hook is in its own file within the `hooks/` directory:

```
hooks/
├── index.ts                        # Exports all hooks
├── useSeasonStats.ts               # Calculate season statistics
├── useIsWinRateSuccessful.ts       # Check if win rate is successful
├── useIsNetProfitPositive.ts       # Check if net profit is positive
├── useFormattedCurrency.ts         # Format numbers as currency
├── useRecordDisplay.ts             # Format win-loss-pending record
└── useStatsPanelData.ts            # Combined hook for all data
```

## Importing Hooks

```typescript
// Import individual hooks
import { useSeasonStats } from './hooks/useSeasonStats';

// Import multiple hooks from index
import { useSeasonStats, useIsWinRateSuccessful } from './hooks';

// Import all hooks
import * as StatsPanelHooks from './hooks';
```

## Core Hooks

### `useStatsPanelData(season: number)`
**File:** `useStatsPanelData.ts`

A comprehensive hook that returns all stats panel data in a single call. This is the recommended hook to use.

**Returns:**
```typescript
{
  stats: {
    totalParlays: number;
    wins: number;
    losses: number;
    pending: number;
    winRate: number;
    totalWagered: number;
    totalPayout: number;
    netProfit: number;
    roi: string;
  };
  isWinRateSuccessful: boolean;
  isNetProfitPositive: boolean;
}
```

**Example:**
```tsx
import { useStatsPanelData } from './hooks';

const StatsPanel = ({ season }) => {
  const { stats, isWinRateSuccessful, isNetProfitPositive } = useStatsPanelData(season);
  // ... use the data
};
```

## Individual Hooks

### `useSeasonStats(season: number)`
**File:** `useSeasonStats.ts`

Calculates comprehensive statistics for a given season including wins, losses, profit, ROI, etc.

**Memoized:** Yes (based on season)

**Returns:** Season statistics object with all betting metrics

### `useIsWinRateSuccessful(winRate: number)`
**File:** `useIsWinRateSuccessful.ts`

Determines if a win rate is considered successful (>= 50%).

**Memoized:** Yes

**Returns:** `boolean`

### `useIsNetProfitPositive(netProfit: number)`
**File:** `useIsNetProfitPositive.ts`

Determines if the net profit is positive or zero.

**Memoized:** Yes

**Returns:** `boolean`

### `useFormattedCurrency(amount: number)`
**File:** `useFormattedCurrency.ts`

Formats a number as USD currency with 2 decimal places.

**Memoized:** Yes

**Returns:** `string` (e.g., "$123.45")

### `useRecordDisplay(wins: number, losses: number, pending: number)`
**File:** `useRecordDisplay.ts`

Formats win-loss-pending record into a display string.

**Memoized:** Yes

**Returns:** `string` (e.g., "10W - 5L - 2P")

## Benefits

1. **Performance**: All hooks use `useMemo` to prevent unnecessary recalculations
2. **Reusability**: Stats calculations can be used in other components
3. **Testability**: Each hook can be tested independently
4. **Separation of Concerns**: Business logic separated from presentation
5. **Maintainability**: Changes to calculations only affect one file
6. **Type Safety**: Full TypeScript support

## Migration

**Before:**
```tsx
import { calculateSeasonStats } from '../../services/betTracking';

const StatsPanel = ({ season }) => {
  const stats = calculateSeasonStats(season);
  // ... use stats
};
```

**After:**
```tsx
import { useStatsPanelData } from './hooks';

const StatsPanel = ({ season }) => {
  const { stats, isWinRateSuccessful, isNetProfitPositive } = useStatsPanelData(season);
  // ... use stats
};
```

## Adding New Hooks

To add a new hook:

1. Create a new file in `hooks/` with the pattern `useYourHookName.ts`
2. Implement with proper TypeScript types and memoization
3. Export from `hooks/index.ts`
4. Document in this file

**Example:**
```typescript
// hooks/useParlayCount.ts
import { useMemo } from 'react';
import { useSeasonStats } from './useSeasonStats';

export const useParlayCount = (season: number): number => {
  const stats = useSeasonStats(season);
  return useMemo(() => stats.totalParlays, [stats.totalParlays]);
};
```

## Future Enhancements

Consider adding these hooks:

- `usePositionStats(season: number)` - Get statistics by player position
- `useOddsAnalysis(season: number)` - Analyze success rate by odds ranges
- `useWeeklyTrends(season: number)` - Track performance trends over weeks
- `useCompareSeason(season1: number, season2: number)` - Compare two seasons
