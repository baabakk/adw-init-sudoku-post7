import type { ValidateRequest, ValidateResponse } from '@init-sudoku-post7/contracts';

/**
 * Base URL for the Puzzle Service API. In a real deployment this would be configurable.
 */
const BASE_URL = '/api';

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
