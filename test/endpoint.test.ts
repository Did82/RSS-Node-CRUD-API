import 'dotenv/config';
import { describe } from '@jest/globals';
import request from 'supertest';

const port = process.env.PORT || 3000;

describe('(Test3): requests to non-existing endpoints', () => {
  it('should return that id is not uuid', async () => {
    const response = await request(`http://localhost:${port}`).get('/api/users/1');
    expect(response.status).toBe(400);
  });
  it('should return that endpoint do not exist', async () => {
    const response = await request(`http://localhost:${port}`).get('/api/user');
    expect(response.status).toBe(404);
  });
  it('should return that endpoint do not exist', async () => {
    const response = await request(`http://localhost:${port}`).get('/users');
    expect(response.status).toBe(404);
  });
  it('should return that endpoint do not exist', async () => {
    const response = await request(`http://localhost:${port}`).get('/');
    expect(response.status).toBe(404);
  });
});
