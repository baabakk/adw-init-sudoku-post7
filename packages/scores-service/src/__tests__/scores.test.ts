import request from 'supertest';
import app from '../index';
import { clearScores, closeDatabase } from '../database';

/**
 * Ensure the scores endpoint correctly persists a score and returns an identifier.
 */
describe('POST /scores', () => {
  beforeEach(async () => {
    await clearScores();
  });

  afterAll(async () => {
    await closeDatabase();
  });

  it('should create a new score and return its id', async () => {
    const payload = {
      playerName: 'Alice',
      difficulty: 'easy',
      timeToSolve: 42,
    };

    const response = await request(app).post('/scores').send(payload);
    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty('id');
    expect(typeof response.body.id).toBe('string');

    // Verify that the score was actually stored in the DB via the leaderboard endpoint.
    const leaderboardRes = await request(app).get('/leaderboard?difficulty=easy');
    expect(leaderboardRes.status).toBe(200);
    expect(leaderboardRes.body.entries).toEqual([
      { playerName: 'Alice', timeToSolve: 42 },
    ]);
  });

  it('should reject invalid payloads', async () => {
    const badPayload = { playerName: 123, difficulty: 'easy', timeToSolve: 'fast' };
    const response = await request(app).post('/scores').send(badPayload);
    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
  });
});
