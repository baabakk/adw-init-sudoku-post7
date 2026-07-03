import type { PuzzleRequest, PuzzleResponse, ValidateRequest, ValidateResponse, Difficulty } from '@init-sudoku-post7/contracts';

/**
 * Base URL for the Puzzle Service API. In a real deployment this would be configurable.
 */
const BASE_URL = '/api'; // Assuming proxy in dev server

/**
 * Fetch a puzzle of the given difficulty.
 */
export async function getPuzzle(difficulty: Difficulty): Promise<PuzzleResponse> {
  const url = `${BASE_URL}/puzzle?difficulty=${encodeURIComponent(difficulty)}`;
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      Accept: 'application/json',
    },
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }
  const data: PuzzleResponse = await response.json();
  return data;
}

/**
 * Submit a board for validation.
 */
export async function validateBoard(board: ValidateRequest['board']): Promise<ValidateResponse> {
  const url = `${BASE_URL}/validate`;
  const payload: ValidateRequest = { board };
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(payload),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }
  const data: ValidateResponse = await response.json();
  return data;
}
