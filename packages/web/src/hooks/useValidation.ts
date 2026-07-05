import { useCallback, useState } from 'react';
import type { ValidateResponse, Board } from '@init-sudoku-post7/contracts';
import { validateBoard } from '../services/validationService';

/**
 * Custom hook to submit a Sudoku board for validation.
 * Provides a validate function, loading state, error message, and the validation result.
 */
export function useValidation() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<boolean | undefined>(undefined);

  const validate = useCallback(async (board: Board) => {
    setLoading(true);
    setError(null);
    setResult(undefined);
    try {
      const response: ValidateResponse = await validateBoard(board);
      setResult(response.valid);
    } catch (e) {
      const msg = e instanceof Error ? e.message : String(e);
      setError(`Validation failed: ${msg}`);
    } finally {
      setLoading(false);
    }
  }, []);

  return { validate, loading, error, result };
}
