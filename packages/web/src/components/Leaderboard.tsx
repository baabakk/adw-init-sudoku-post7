import React, { useEffect, useState } from 'react';
import type { Score, Difficulty, LeaderboardResponse } from '@init-sudoku-post7/contracts';
import { getLeaderboard } from '../services/scoresService';
import styles from './Leaderboard.module.css';

interface Props {
  difficulty: Difficulty;
}

const Leaderboard: React.FC<Props> = ({ difficulty }) => {
  const [scores, setScores] = useState<Score[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      setError(null);
      try {
        const data: LeaderboardResponse = await getLeaderboard(difficulty);
        setScores(data.scores);
      } catch (e) {
        const msg = e instanceof Error ? e.message : String(e);
        setError(`Failed to load leaderboard: ${msg}`);
      } finally {
        setLoading(false);
      }
    };
    fetch();
  }, [difficulty]);

  if (loading) return <div className={styles.container}>Loading leaderboard...</div>;
  if (error) return <div className={styles.error}>{error}</div>;

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Top Scores ({difficulty})</h2>
      <ol className={styles.list}>
        {scores.map((s, idx) => (
          <li key={idx} className={styles.item}>
            {s.playerName} – {s.timeToSolveMs / 1000}s
          </li>
        ))}
      </ol>
    </div>
  );
};

export default Leaderboard;
