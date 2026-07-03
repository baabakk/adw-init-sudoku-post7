import React from 'react';
import styles from './ValidationResult.module.css';

type Props = {
  /** true if board is valid */
  valid: boolean;
};

const ValidationResult: React.FC<Props> = ({ valid }) => {
  return (
    <div className={styles.result} data-testid="validation-result">
      {valid ? (
        <span className={styles.valid}>✅ Valid solution!</span>
      ) : (
        <span className={styles.invalid}>❌ Invalid solution.</span>
      )}
    </div>
  );
};

export default ValidationResult;
