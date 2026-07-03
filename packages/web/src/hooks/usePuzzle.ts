import { useCallback, useEffect, useState } from 'react';
import type { Difficulty, PuzzleResponse } from '@init-sudoku-post7/contracts';
import { getPuzzle } from '../services/puzzleService';

/**
 * Custom hook to fetch a Sudoku puzzle for a given difficulty.
 * Returns the puzzle data, loading state, error message and a refetch function.
 */
export function usePuzzle(difficulty: Difficulty) {
  const [puzzle, setPuzzle] = useState<PuzzleResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchPuzzle = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getPuzzle(difficulty);
      setPuzzle(data);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(`Failed to load puzzle: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, [difficulty]);

  // Fetch on mount and when difficulty changes
  useEffect(() => {
    fetchPuzzle();
  }, [fetchPuzzle]);

  return { puzzle, loading, error, refetch: fetchPuzzle };
}
