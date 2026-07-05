import React from 'react';
import Cell from './Cell';
import type { Board as SudokuBoard } from '@init-sudoku-post7/contracts';
import styles from './Board.module.css';

interface BoardProps {
  /** Current mutable board state */
  board: SudokuBoard;
  /** Original puzzle board – cells with non‑zero values are fixed */
  initial: SudokuBoard;
  /** Callback when a cell value changes */
  onCellChange: (row: number, col: number, value: number) => void;
}

const Board: React.FC<BoardProps> = ({ board, initial, onCellChange }) => {
  return (
    <div className={styles.grid}>
      {board.map((row, rIdx) =>
        row.map((cellValue, cIdx) => (
          <Cell
            key={`${rIdx}-${cIdx}`}
            row={rIdx}
            col={cIdx}
            value={cellValue}
            fixed={initial[rIdx][cIdx] !== 0}
            onChange={onCellChange}
          />
        ))
      )}
    </div>
  );
};

export default Board;
