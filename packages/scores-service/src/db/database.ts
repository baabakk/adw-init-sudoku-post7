import Database from 'better-sqlite3';
import { randomUUID } from 'crypto';
import type { Score, ScoreSubmission, Difficulty } from '@init-sudoku-post7/contracts';

/**
 * SQLite database wrapper using better-sqlite3 (synchronous API).
 * The database is initialized on first use and the scores table is created if missing.
 */
class ScoresDb {
  private static instance: ScoresDb | null = null;
  private db: Database;

  private constructor() {
    const dbPath = process.env.SCORES_DB_PATH || 'scores.db';
    this.db = new Database(dbPath);
    this.initializeSchema();
  }

  /** Get the singleton instance */
  static getInstance(): ScoresDb {
    if (!ScoresDb.instance) {
      ScoresDb.instance = new ScoresDb();
    }
    return ScoresDb.instance;
  }

  /** Ensure the scores table exists */
  private initializeSchema(): void {
    const createTable = `
      CREATE TABLE IF NOT EXISTS scores (
        id TEXT PRIMARY KEY,
        playerName TEXT NOT NULL,
        difficulty TEXT NOT NULL,
        timeToSolveMs INTEGER NOT NULL,
        createdAt INTEGER NOT NULL
      );
    `;
    this.db.exec(createTable);
  }

  /** Insert a new score record */
  insertScore(score: ScoreSubmission): void {
    const stmt = this.db.prepare(
      'INSERT INTO scores (id, playerName, difficulty, timeToSolveMs, createdAt) VALUES (?, ?, ?, ?, ?)',
    );
    const id = randomUUID();
    const createdAt = Date.now();
    stmt.run(id, score.playerName, score.difficulty, score.timeToSolveMs, createdAt);
  }

  /** Retrieve top N scores for a difficulty, ordered by fastest time */
  getTopScores(difficulty: Difficulty, limit = 10): Score[] {
    const stmt = this.db.prepare(
      'SELECT playerName, difficulty, timeToSolveMs FROM scores WHERE difficulty = ? ORDER BY timeToSolveMs ASC LIMIT ?',
    );
    const rows = stmt.all(difficulty, limit) as Array<{
      playerName: string;
      difficulty: Difficulty;
      timeToSolveMs: number;
    }>;
    return rows.map((row) => ({
      playerName: row.playerName,
      difficulty: row.difficulty,
      timeToSolveMs: row.timeToSolveMs,
    }));
  }
}

export const initDatabase = (): void => {
  // Access the singleton to trigger construction and schema init
  ScoresDb.getInstance();
};

export const insertScore = (score: ScoreSubmission): void => {
  ScoresDb.getInstance().insertScore(score);
};

export const getTopLeaderboard = (difficulty: Difficulty, limit = 10): Score[] => {
  return ScoresDb.getInstance().getTopScores(difficulty, limit);
};
