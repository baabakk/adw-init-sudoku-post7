import React from 'react';
import styles from './NetworkError.module.css';

type Props = {
  /** Error message to display */
  message: string;
  /** Callback to retry the failed operation */
  onRetry: () => void;
};

const NetworkError: React.FC<Props> = ({ message, onRetry }) => (
  <div className={styles.container} role="alert">
    <p className={styles.message}>Network error: {message}</p>
    <button type="button" className={styles.retryButton} onClick={onRetry}>
      Retry
    </button>
  </div>
);

export default NetworkError;
