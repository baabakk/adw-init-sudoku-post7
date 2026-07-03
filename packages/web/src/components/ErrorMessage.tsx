import React from 'react';
import styles from './ErrorMessage.module.css';

type Props = {
  /** Error message to display */
  message: string;
};

const ErrorMessage: React.FC<Props> = ({ message }) => (
  <div className={styles.error} role="alert">
    {message}
  </div>
);

export default ErrorMessage;
