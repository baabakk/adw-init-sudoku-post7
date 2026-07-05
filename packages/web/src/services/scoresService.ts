/**
 * Scores Service client stub for the web client.
 * In this phase we only need to provide the function signatures.
 * The actual implementation can be added in later phases.
 */
import type { Difficulty, Score, ScoreResponse, LeaderboardResponse } from '@init-sudoku-post7/contracts';

const BASE_URL = '/api'; // Assuming proxy for scores endpoints

/** Submit a score to the Scores Service. */
export async function submitScore(score: Score): Promise<ScoreResponse> {
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

/** Fetch the leaderboard for a given difficulty. */
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
