import React from 'react';
import styles from './ResultDisplay.module.css';

type Props = {
  /** true if the board is valid, false otherwise */
  valid: boolean;
};

const ResultDisplay: React.FC<Props> = ({ valid }) => (
  <div className={styles.result} role="status">
    {valid ? '✅ Correct solution!' : '❌ Incorrect solution.'}
  </div>
);

export default ResultDisplay;
