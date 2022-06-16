import 'dotenv/config';
import { describe } from '@jest/globals';
import request from 'supertest';

const port = process.env.PORT || 3000;

describe('(Test2): /api/users endpoint errors', () => {
  it('should return bad request', async () => {
    const response = await request(`http://localhost:${port}`).post('/api/users').send({});
    expect(response.status).toBe(400);
  });
  it('should return bad request', async () => {
    const response = await request(`http://localhost:${port}`).post('/api/users').send({ username: 'test' });
    expect(response.status).toBe(400);
  });
  it('should return bad request', async () => {
    const response = await request(`http://localhost:${port}`).post('/api/users').send({ username: 'test', age: 'test' });
    expect(response.status).toBe(400);
  });
  it('should return bad request', async () => {
    const response = await request(`http://localhost:${port}`)
      .post('/api/users')
      .send({ username: 'test', age: 100, hobbies: 'test' });
    expect(response.status).toBe(400);
  });
  it('should return bad request', async () => {
    const response = await request(`http://localhost:${port}`)
      .post('/api/users')
      .send({ username: 'test', age: 100, hobbies: [34, 'test'] });
    expect(response.status).toBe(400);
  });
});
