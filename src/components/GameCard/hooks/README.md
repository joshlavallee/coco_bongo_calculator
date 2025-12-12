# GameCard Hooks

This document describes the custom hooks available in the GameCard component for fetching and processing game data.

## File Structure

Each hook is in its own file within the `hooks/` directory:

```
hooks/
├── index.ts                      # Exports all hooks
├── useRecommendedPlayers.ts      # Get recommended players for a game
├── useTopPick.ts                 # Get the top pick player
├── useIsDomeGame.ts              # Check if game is in a dome
├── useIsWeatherAvailable.ts      # Check if weather data is available
├── useHeadToHeadDisplay.ts       # Process head-to-head TD scorers
├── useFormattedGameTime.ts       # Format game time
├── useCelsiusTemperature.ts      # Convert temperature to Celsius
├── useTeamName.ts                # Extract team name
├── useTeamLogoUrl.ts             # Get team logo URL
├── useWeeklyTDs.ts               # Get weekly TD data
├── useWeatherIcon.ts             # Get weather icon component
└── useGameCardData.ts            # Combined hook for all data
```

## Importing Hooks

You can import hooks individually or all at once:

```typescript
// Import individual hooks
import { useRecommendedPlayers } from './hooks/useRecommendedPlayers';

// Import multiple hooks from index
import { useRecommendedPlayers, useTopPick } from './hooks';

// Import all hooks
import * as GameCardHooks from './hooks';
```

## Core Data Hooks

### `useGameCardData(game: Game)`
**File:** `useGameCardData.ts`

A comprehensive hook that returns all game card data in a single call. This is the recommended hook to use if you need multiple pieces of data.

**Returns:**
```typescript
{
  recommendedPlayers: Player[];
  topPick: Player | undefined;
  isDomeGame: boolean;
  isWeatherAvailable: boolean;
  headToHeadDisplay: {
    displayScorers: TDScorer[];
    fifthRow: { name: string; count: number } | null;
  };
}
```

**Example:**
```tsx
import { useGameCardData } from './hooks';

const GameCard = ({ game }) => {
  const { recommendedPlayers, topPick, isDomeGame } = useGameCardData(game);
  // ... use the data
};
```

## Individual Data Hooks

### `useRecommendedPlayers(game: Game)`
**File:** `useRecommendedPlayers.ts`

Returns an array of recommended players for a game, sorted by score.

**Memoized:** Yes (based on game object)

### `useTopPick(game: Game)`
**File:** `useTopPick.ts`

Returns the top recommended player for a game.

**Memoized:** Yes (based on recommendedPlayers)

### `useIsDomeGame(game: Game)`
**File:** `useIsDomeGame.ts`

Returns whether the game is played in a dome stadium.

**Memoized:** Yes (based on home team abbreviation)

### `useIsWeatherAvailable(game: Game)`
**File:** `useIsWeatherAvailable.ts`

Returns whether weather data is available and meaningful for the game.

**Memoized:** Yes (based on weather conditions)

### `useHeadToHeadDisplay(game: Game)`
**File:** `useHeadToHeadDisplay.ts`

Processes head-to-head TD scorers for display, including logic for handling tied scorers.

**Returns:**
```typescript
{
  displayScorers: TDScorer[];
  fifthRow: { name: string; count: number } | null;
}
```

**Memoized:** Yes (based on headToHeadTDs data)

## Utility Hooks

### `useFormattedGameTime(gameTime: string)`
**File:** `useFormattedGameTime.ts`

Formats an ISO date string into a human-readable game time.

**Memoized:** Yes

### `useCelsiusTemperature(fahrenheit: number)`
**File:** `useCelsiusTemperature.ts`

Converts Fahrenheit to Celsius.

**Memoized:** Yes

### `useTeamName(fullName: string)`
**File:** `useTeamName.ts`

Extracts the team name from a full team name string.

**Memoized:** Yes

### `useTeamLogoUrl(abbreviation: string)`
**File:** `useTeamLogoUrl.ts`

Returns the URL for a team's logo based on its abbreviation.

**Memoized:** Yes

### `useWeeklyTDs(currentWeek: number)`
**File:** `useWeeklyTDs.ts`

Returns an array of touchdown data for the season up to the current week.

**Note:** Currently uses mock data. Should be replaced with real data fetching in production.

**Memoized:** Yes

### `useWeatherIcon(isWeatherAvailable: boolean, condition: string)`
**File:** `useWeatherIcon.ts`

Returns the appropriate weather icon component based on conditions.

**Memoized:** Yes

## Benefits of Hook-Based Architecture

1. **Performance**: All hooks use `useMemo` to prevent unnecessary recalculations
2. **Reusability**: Hooks can be used in other components that need the same data
3. **Testability**: Each hook can be tested independently in its own file
4. **Separation of Concerns**: Data fetching/processing logic is separate from presentation
5. **Maintainability**: Changes to data logic only need to happen in one file
6. **Composability**: Smaller hooks can be composed into larger ones
7. **Organization**: Each hook has its own file, making the codebase easier to navigate

## Migration from Direct Function Calls

**Before:**
```tsx
const GameCard = ({ game }) => {
  const recommendedPlayers = getRecommendedPlayers(game);
  const topPick = recommendedPlayers[0];
  const isDomeGame = DOME_TEAMS.includes(game.homeTeam.abbreviation);
  // ...
};
```

**After:**
```tsx
import { useGameCardData } from './hooks';

const GameCard = ({ game }) => {
  const { recommendedPlayers, topPick, isDomeGame } = useGameCardData(game);
  // ...
};
```

## Adding New Hooks

To add a new hook:

1. Create a new file in the `hooks/` directory with the pattern `useYourHookName.ts`
2. Implement the hook with proper TypeScript types and memoization
3. Export the hook from `hooks/index.ts`
4. Document the hook in this file

**Example:**
```typescript
// hooks/useNewFeature.ts
import { useMemo } from 'react';
import { Game } from '../../../types';

export const useNewFeature = (game: Game): string => {
  return useMemo(() => {
    // Your logic here
    return 'result';
  }, [game]);
};
```

Then add to `hooks/index.ts`:
```typescript
export { useNewFeature } from './useNewFeature';
```

## Testing

To test hooks in isolation:

```tsx
import { renderHook } from '@testing-library/react';
import { useTopPick } from './hooks/useTopPick';

test('useTopPick returns the highest scoring player', () => {
  const mockGame = { /* ... */ };
  const { result } = renderHook(() => useTopPick(mockGame));
  
  expect(result.current).toBeDefined();
  expect(result.current?.score).toBeGreaterThan(0);
});
```

## Future Enhancements

Consider adding these hooks in the future:

- `usePlayerStats(playerId: string)` - Fetch detailed player statistics
- `useRealTimeOdds(gameId: string)` - Get real-time betting odds
- `useWeatherData(gameId: string)` - Fetch real weather data from an API
- `useTeamStats(teamId: string)` - Get detailed team statistics
- `useHistoricalMatchups(homeTeam: string, awayTeam: string)` - Fetch historical game data
