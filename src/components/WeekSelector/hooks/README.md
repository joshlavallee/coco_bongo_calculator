# WeekSelector Hooks

This document describes the custom hooks available in the WeekSelector component for managing week selection and assignments.

## File Structure

Each hook is in its own file within the `hooks/` directory:

```
hooks/
├── index.ts                    # Exports all hooks
├── useWeekNumbers.ts           # Generate array of week numbers
├── useWeekAssignments.ts       # Get week assignments for a season
├── useWeekAssignment.ts        # Get assignment for a specific week
├── useIsWeekSelected.ts        # Check if a week is selected
├── useIsCurrentWeek.ts         # Check if a week is the current week
└── useWeekSelectorData.ts      # Combined hook for all data
```

## Importing Hooks

```typescript
// Import individual hooks
import { useWeekNumbers } from './hooks/useWeekNumbers';

// Import multiple hooks from index
import { useWeekNumbers, useWeekAssignments } from './hooks';

// Import all hooks
import * as WeekSelectorHooks from './hooks';
```

## Core Hooks

### `useWeekSelectorData(season: number)`
**File:** `useWeekSelectorData.ts`

A comprehensive hook that returns all week selector data in a single call. This is the recommended hook to use.

**Returns:**
```typescript
{
  weekNumbers: number[];
  assignments: Record<string, string>;
}
```

**Example:**
```tsx
import { useWeekSelectorData } from './hooks';

const WeekSelector = ({ season, selectedWeek, onWeekSelect, currentWeek }) => {
  const { weekNumbers, assignments } = useWeekSelectorData(season);
  // ... use the data
};
```

## Individual Hooks

### `useWeekNumbers()`
**File:** `useWeekNumbers.ts`

Generates an array of week numbers (1-18 for NFL regular season).

**Memoized:** Yes

**Returns:** `number[]`

**Example:**
```tsx
const weekNumbers = useWeekNumbers();
// [1, 2, 3, ..., 18]
```

### `useWeekAssignments(season: number)`
**File:** `useWeekAssignments.ts`

Retrieves the week assignments (person names) for a specific season from the data file.

**Memoized:** Yes (based on season)

**Returns:** `Record<string, string>` - Object mapping week numbers to assigned names

**Example:**
```tsx
const assignments = useWeekAssignments(2024);
// { "1": "Josh", "2": "Sarah", ... }
```

### `useWeekAssignment(season: number, week: number)`
**File:** `useWeekAssignment.ts`

Gets the assigned name for a specific week in a season.

**Memoized:** Yes (based on season and week)

**Returns:** `string | undefined`

**Example:**
```tsx
const assignedName = useWeekAssignment(2024, 5);
// "Josh" or undefined
```

### `useIsWeekSelected(week: number, selectedWeek: number)`
**File:** `useIsWeekSelected.ts`

Checks if a given week is the currently selected week.

**Memoized:** Yes

**Returns:** `boolean`

**Example:**
```tsx
const isSelected = useIsWeekSelected(5, selectedWeek);
```

### `useIsCurrentWeek(week: number, currentWeek: number)`
**File:** `useIsCurrentWeek.ts`

Checks if a given week is the current week in the NFL season.

**Memoized:** Yes

**Returns:** `boolean`

**Example:**
```tsx
const isCurrent = useIsCurrentWeek(5, currentWeek);
```

## Benefits

1. **Performance**: All hooks use `useMemo` to prevent unnecessary recalculations
2. **Reusability**: Week logic can be used in other components
3. **Testability**: Each hook can be tested independently
4. **Separation of Concerns**: Data fetching separated from presentation
5. **Maintainability**: Changes to week logic only affect one file
6. **Type Safety**: Full TypeScript support

## Migration

**Before:**
```tsx
import weekAssignments from '../../data/weekAssignments.json';

const WeekSelector = ({ season, selectedWeek, onWeekSelect, currentWeek }) => {
  const weeks = Array.from({ length: NUMBER_OF_WEEKS }, (_, i) => i + 1);
  const assignments = weekAssignments[season.toString() as keyof typeof weekAssignments] || {};
  // ... use data
};
```

**After:**
```tsx
import { useWeekSelectorData } from './hooks';

const WeekSelector = ({ season, selectedWeek, onWeekSelect, currentWeek }) => {
  const { weekNumbers, assignments } = useWeekSelectorData(season);
  // ... use data
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
// hooks/useWeekRange.ts
import { useMemo } from 'react';

export const useWeekRange = (startWeek: number, endWeek: number): number[] => {
  return useMemo(() => {
    return Array.from(
      { length: endWeek - startWeek + 1 },
      (_, i) => startWeek + i
    );
  }, [startWeek, endWeek]);
};
```

## Future Enhancements

Consider adding these hooks:

- `useWeekStatus(season: number, week: number)` - Get status (completed, current, upcoming)
- `useWeeksWithAssignments(season: number)` - Filter only weeks with assignments
- `useAssignmentsByPerson(season: number, name: string)` - Get all weeks for a person
- `usePlayoffWeeks()` - Get playoff week numbers
- `useWeekDateRange(week: number, season: number)` - Get date range for a week
