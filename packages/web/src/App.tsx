import React, { useEffect, useState } from 'react';
import DifficultySelector from './components/DifficultySelector';
import SudokuBoard from './components/SudokuBoard';
import ValidationResult from './components/ValidationResult';
import ErrorMessage from './components/ErrorMessage';
import { usePuzzle } from './hooks/usePuzzle';
import { useValidation } from './hooks/useValidation';
import type { Board } from '@init-sudoku-post7/contracts';
import { Difficulty } from '@init-sudoku-post7/contracts';
import styles from './App.module.css';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.Easy);
  const { puzzle, loading: puzzleLoading, error: puzzleError, refetch } = usePuzzle(difficulty);
  const { validate, loading: validationLoading, error: validationError, result } = useValidation();

  const [board, setBoard] = useState<Board>([]);

  // Initialize board when puzzle loads
  useEffect(() => {
    if (puzzle?.board) {
      const copy = puzzle.board.map(row => [...row]);
      setBoard(copy);
    }
  }, [puzzle]);

  const handleCellChange = (row: number, col: number, value: number) => {
    setBoard(prev => {
      const newBoard = prev.map(r => [...r]);
      newBoard[row][col] = value;
      return newBoard;
    });
  };

  const handleValidate = async () => {
    await validate(board);
  };

  return (
    <div className={styles.appContainer}>
      <h1 className={styles.header}>Sudoku</h1>
      <div className={styles.controls}>
        <DifficultySelector selected={difficulty} onSelect={setDifficulty} />
        <button onClick={refetch} disabled={puzzleLoading}>
          {puzzleLoading ? 'Loading...' : 'New Puzzle'}
        </button>
        <button onClick={handleValidate} disabled={validationLoading || puzzleLoading}>
          {validationLoading ? 'Validating...' : 'Validate'}
        </button>
      </div>
      {puzzleError && <ErrorMessage message={puzzleError} />}
      {validationError && <ErrorMessage message={validationError} />}
      {puzzle && board.length === 9 && (
        <div className={styles.boardWrapper}>
          <SudokuBoard board={board} initial={puzzle.board} onCellChange={handleCellChange} />
        </div>
      )}
      {result !== undefined && <ValidationResult valid={result} />}
    </div>
  );
};

export default App;
