import React from 'react';
import styles from './ResultDisplay.module.css';

type Props = {
  /** true if board is valid */
  valid: boolean;
};

const ResultDisplay: React.FC<Props> = ({ valid }) => (
  <div className={styles.result} data-testid="validation-result">
    {valid ? (
      <span className={styles.valid}>✅ Valid solution!</span>
    ) : (
      <span className={styles.invalid}>❌ Invalid solution.</span>
    )}
  </div>
);

export default ResultDisplay;
