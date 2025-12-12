import { useMemo } from 'react';

/**
 * Hook to format a number as currency
 * Memoized for consistency
 */
export const useFormattedCurrency = (amount: number): string => {
  return useMemo(() => `$${amount.toFixed(2)}`, [amount]);
};
