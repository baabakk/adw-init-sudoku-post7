import React from 'react';
import type { Board } from '@init-sudoku-post7/contracts';
import styles from './SudokuBoard.module.css';

type Props = {
  /** Current mutable board state */
  board: Board;
  /** Initial puzzle board (read‑only cells) */
  initial: Board;
  /** Callback when a cell value changes */
  onCellChange: (row: number, col: number, value: number) => void;
};

const SudokuBoard: React.FC<Props> = ({ board, initial, onCellChange }) => {
  const handleChange = (row: number, col: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value, 10);
    const newVal = Number.isNaN(val) ? 0 : Math.max(0, Math.min(9, val));
    onCellChange(row, col, newVal);
  };

  return (
    <div className={styles.board}>
      {board.map((row, rIdx) =>
        row.map((cell, cIdx) => {
          const readOnly = initial[rIdx][cIdx] !== 0;
          return (
            <input
              key={`${rIdx}-${cIdx}`}
              className={`${styles.cell} ${readOnly ? styles.readOnly : styles.editable}`}
              type="text"
              value={cell === 0 ? '' : cell}
              readOnly={readOnly}
              maxLength={1}
              onChange={e => handleChange(rIdx, cIdx, e)}
            />
          );
        })
      )}
    </div>
  );
};

export default SudokuBoard;
