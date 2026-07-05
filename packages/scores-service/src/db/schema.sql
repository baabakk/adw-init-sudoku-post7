-- SQLite schema for scores-service
-- Table to store player scores for completed Sudoku puzzles
CREATE TABLE IF NOT EXISTS scores (
  id TEXT PRIMARY KEY,
  playerName TEXT NOT NULL,
  difficulty TEXT NOT NULL,
  timeToSolveMs INTEGER NOT NULL,
  createdAt INTEGER NOT NULL
);
