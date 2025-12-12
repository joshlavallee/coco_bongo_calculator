import { useMemo } from 'react';

/**
 * Hook to format win-loss-pending record
 * Returns formatted string like "10W - 5L - 2P"
 */
export const useRecordDisplay = (wins: number, losses: number, pending: number): string => {
  return useMemo(() => {
    const parts = [`${wins}W`, `${losses}L`];
    if (pending > 0) {
      parts.push(`${pending}P`);
    }
    return parts.join(' - ');
  }, [wins, losses, pending]);
};
