import 'dotenv/config';
import { describe } from '@jest/globals';
import request from 'supertest';
import { IUser, IUserDb } from '../src/users/usersModel';

const port = process.env.PORT || 3000;

const testUser: IUser = {
  username: 'test',
  age: 100,
  hobbies: ['test', 'test2'],
};

const testUpdateUser: IUser = {
  username: 'test2',
  age: 200,
  hobbies: ['test3', 'test4'],
};

let storedUser: IUserDb;

describe('(Test1): /api/users endpoint', () => {
  it('should return an empty array of users', async () => {
    const response = await request(`http://localhost:${port}`).get('/api/users');
    expect(response.status).toBe(200);
    expect(response.body).toEqual([]);
  });

  it('should post user', async () => {
    const response = await request(`http://localhost:${port}`).post('/api/users').send(testUser);
    expect(response.status).toBe(201);
    expect(response.body).toEqual({ ...testUser, id: expect.any(String) });
    storedUser = response.body;
  });

  it('should get user', async () => {
    const response = await request(`http://localhost:${port}`).get(`/api/users/${storedUser.id}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(storedUser);
  });

  it('should update user', async () => {
    const response = await request(`http://localhost:${port}`).put(`/api/users/${storedUser.id}`).send(testUpdateUser);
    expect(response.status).toBe(200);
    expect(response.body).toEqual({ id: storedUser.id, ...testUpdateUser });
  });

  it('should delete user', async () => {
    const response = await request(`http://localhost:${port}`).delete(`/api/users/${storedUser.id}`);
    expect(response.status).toBe(204);
  });

  it('should return not found', async () => {
    const response = await request(`http://localhost:${port}`).get(`/api/users/${storedUser.id}`);
    expect(response.status).toBe(404);
  });
});
