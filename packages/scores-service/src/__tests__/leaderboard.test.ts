import request from 'supertest';
import app from '../index';
import { clearScores, closeDatabase, insertScore } from '../database';

/**
 * Tests for the GET /leaderboard endpoint.
 */
describe('GET /leaderboard', () => {
  beforeEach(async () => {
    await clearScores();
    // Insert multiple scores to test ordering and limit.
    await insertScore({ playerName: 'Bob', difficulty: 'medium', timeToSolve: 120 });
    await insertScore({ playerName: 'Carol', difficulty: 'medium', timeToSolve: 90 });
    await insertScore({ playerName: 'Dave', difficulty: 'medium', timeToSolve: 150 });
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('should return top scores ordered by time', async () => {
    const res = await request(app).get('/leaderboard?difficulty=medium');
    expect(res.status).toBe(200);
    expect(res.body).toHaveProperty('entries');
    expect(Array.isArray(res.body.entries)).toBe(true);
    // Expect ordering fastest first.
    expect(res.body.entries).toEqual([
      { playerName: 'Carol', timeToSolve: 90 },
      { playerName: 'Bob', timeToSolve: 120 },
      { playerName: 'Dave', timeToSolve: 150 },
    ]);
  });

  it('should reject missing or invalid difficulty', async () => {
    const resMissing = await request(app).get('/leaderboard');
    expect(resMissing.status).toBe(400);
    const resInvalid = await request(app).get('/leaderboard?difficulty=invalid');
    expect(resInvalid.status).toBe(400);
  });
});
