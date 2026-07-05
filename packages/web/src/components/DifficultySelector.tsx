import React from 'react';
import type { Difficulty } from '@init-sudoku-post7/contracts';
import styles from './DifficultySelector.module.css';

interface Props {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
}

const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

const DifficultySelector: React.FC<Props> = ({ selected, onSelect }) => {
  return (
    <div className={styles.container}>
      {difficulties.map(diff => (
        <button
          key={diff}
          className={`${styles.button} ${selected === diff ? styles.selected : ''}`}
          onClick={() => onSelect(diff)}
        >
          {diff.charAt(0).toUpperCase() + diff.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
