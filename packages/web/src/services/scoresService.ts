import type {
  ScoreSubmission,
  ScoreResponse,
  LeaderboardRequest,
  LeaderboardResponse,
  Difficulty,
} from '@init-sudoku-post7/contracts';

/**
 * Base URL for the Scores Service API.
 */
const BASE_URL = '/api'; // Adjust as needed for proxy configuration.

/**
 * Submit a score to the Scores Service.
 */
export async function submitScore(score: ScoreSubmission): Promise<ScoreResponse> {
  const url = `${BASE_URL}/scores`;
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
    },
    body: JSON.stringify(score),
  });
  if (!response.ok) {
    const text = await response.text();
    throw new Error(`HTTP ${response.status}: ${text}`);
  }
  const data: ScoreResponse = await response.json();
  return data;
}

/**
 * Retrieve the leaderboard for a given difficulty.
 */
export async function getLeaderboard(difficulty: Difficulty): Promise<LeaderboardResponse> {
  const url = `${BASE_URL}/leaderboard?difficulty=${encodeURIComponent(difficulty)}`;
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
  const data: LeaderboardResponse = await response.json();
  return data;
}
