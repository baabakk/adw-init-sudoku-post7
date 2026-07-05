import React, { ChangeEvent } from 'react';
import type { Board as SudokuBoard } from '@init-sudoku-post7/contracts';
import styles from './Cell.module.css';

interface CellProps {
  row: number;
  col: number;
  value: number;
  fixed: boolean;
  onChange: (row: number, col: number, value: number) => void;
}

const Cell: React.FC<CellProps> = ({ row, col, value, fixed, onChange }) => {
  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    const num = val === '' ? 0 : Number(val);
    if (num >= 0 && num <= 9) {
      onChange(row, col, num);
    }
  };

  return (
    <input
      className={`${styles.cell} ${fixed ? styles.fixed : ''}`}
      type="text"
      inputMode="numeric"
      pattern="[1-9]"
      maxLength={1}
      value={value === 0 ? '' : value}
      disabled={fixed}
      onChange={handleChange}
    />
  );
};

export default Cell;
