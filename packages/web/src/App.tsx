import React, { useEffect, useState } from 'react';
import DifficultySelector from './components/DifficultySelector';
import Board from './components/Board';
import ResultDisplay from './components/ResultDisplay';
import NetworkError from './components/NetworkError';
import { usePuzzle } from './hooks/usePuzzle';
import { useValidation } from './hooks/useValidation';
import { Board as SudokuBoard, Difficulty } from '@init-sudoku-post7/contracts';
import styles from './App.module.css';

const App: React.FC = () => {
  const [difficulty, setDifficulty] = useState<Difficulty>('easy');
  const { puzzle, loading: puzzleLoading, error: puzzleError, refetch } = usePuzzle(difficulty);
  const { validate, loading: validationLoading, error: validationError, result } = useValidation();

  const [board, setBoard] = useState<SudokuBoard>([] as any);

  // Initialize board when puzzle loads
  useEffect(() => {
    if (puzzle?.board) {
      const copy = puzzle.board.map(row => [...row]);
      setBoard(copy as SudokuBoard);
    }
  }, [puzzle]);

  const handleCellChange = (row: number, col: number, value: number) => {
    setBoard(prev => {
      const newBoard = prev.map(r => [...r]);
      newBoard[row][col] = value;
      return newBoard as SudokuBoard;
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
      {puzzleError && <NetworkError message={puzzleError} onRetry={refetch} />}
      {validationError && <NetworkError message={validationError} onRetry={() => validate(board)} />}
      {puzzle && board.length === 9 && (
        <div className={styles.boardWrapper}>
          <Board board={board} initial={puzzle.board} onCellChange={handleCellChange} />
        </div>
      )}
      {result !== undefined && <ResultDisplay valid={result} />}
    </div>
  );
};

export default App;
