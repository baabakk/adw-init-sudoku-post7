import sqlite3 from 'sqlite3';
import { open, Database } from 'sqlite';
import type { ScoreRequest, Score } from '../../contracts/src/index';
import type { LeaderboardEntry } from '../../contracts/src/index';
import { randomUUID } from 'crypto';

// SQLite database wrapper using async/await via the `sqlite` package.
// The `sqlite3` driver is used under the hood.

const DB_PATH = process.env.SCORES_DB_PATH || 'scores.db';

let dbInstance: Database | null = null;

/** Initialise the SQLite database and ensure the scores table exists. */
export async function initDatabase(): Promise<void> {
  if (dbInstance) return;
  dbInstance = await open({ filename: DB_PATH, driver: sqlite3.Database });
  await dbInstance.exec(`
    CREATE TABLE IF NOT EXISTS scores (
      id TEXT PRIMARY KEY,
      playerName TEXT NOT NULL,
      difficulty TEXT NOT NULL,
      timeToSolve REAL NOT NULL
    );
  `);
}

/** Insert a new score record and return its generated identifier. */
export async function insertScore(request: {
  playerName: string;
  difficulty: string; // allow raw string literals for tests; compatible with Difficulty enum
  timeToSolve: number;
}): Promise<string> {
  if (!dbInstance) await initDatabase();
  const id = randomUUID();
  await dbInstance!.run(
    `INSERT INTO scores (id, playerName, difficulty, timeToSolve) VALUES (?, ?, ?, ?);`,
    id,
    request.playerName,
    request.difficulty,
    request.timeToSolve,
  );
  return id;
}

/** Retrieve the top N leaderboard entries for a given difficulty, ordered by fastest time. */
export async function getTopLeaderboard(
  difficulty: string,
  limit: number = 10,
): Promise<LeaderboardEntry[]> {
  if (!dbInstance) await initDatabase();
  const rows = (await dbInstance!.all(
    `SELECT playerName, timeToSolve FROM scores WHERE difficulty = ? ORDER BY timeToSolve ASC LIMIT ?;`,
    difficulty,
    limit,
  )) as LeaderboardEntry[];
  return rows;
}

/** Delete all scores – useful for test isolation. */
export async function clearScores(): Promise<void> {
  if (!dbInstance) await initDatabase();
  await dbInstance!.run('DELETE FROM scores;');
}

/** Close the database connection – useful for test teardown. */
export async function closeDatabase(): Promise<void> {
  if (dbInstance) {
    await dbInstance.close();
    dbInstance = null;
  }
}
