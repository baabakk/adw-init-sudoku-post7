import React from 'react';
import type { Difficulty } from '@init-sudoku-post7/contracts';
import styles from './DifficultySelector.module.css';

type Props = {
  selected: Difficulty;
  onSelect: (difficulty: Difficulty) => void;
};

const DifficultySelector: React.FC<Props> = ({ selected, onSelect }) => {
  const difficulties: Difficulty[] = ['easy', 'medium', 'hard'];

  return (
    <div className={styles.selector}>
      {difficulties.map(diff => (
        <button
          key={diff}
          type="button"
          className={`${styles.button} ${selected === diff ? styles.active : ''}`}
          onClick={() => onSelect(diff)}
        >
          {diff.charAt(0).toUpperCase() + diff.slice(1)}
        </button>
      ))}
    </div>
  );
};

export default DifficultySelector;
