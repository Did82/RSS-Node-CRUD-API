import UsersDb, { IUser } from './usersModel';
import { IncomingMessage, ServerResponse } from 'http';
import getBody from '../utils/body';
import validateUser from '../utils/validateUser';
import { validate as uuidValidate } from 'uuid';

const db = new UsersDb();

const getUsers = async (req, res) => {
  const users = await db.findAll();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

const getOneUser = async (req, res, id) => {
  if (uuidValidate(id)) {
    const user = await db.findOne(id);
    if (user) {
      res.writeHead(200, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(user));
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'user not found' }));
    }
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'invalid id (not uuid)' }));
  }
};

const createUser = async (req: IncomingMessage, res: ServerResponse) => {
  const body = await getBody(req);
  const user: IUser = JSON.parse(body);
  if (validateUser(user)) {
    const newUser = await db.addOne(user);
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(newUser));
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'invalid user' }));
  }
};

const updateUser = async (req, res, id) => {
  if (uuidValidate(id)) {
    const user = await db.findOne(id);
    if (user) {
      const body = await getBody(req);
      const user: IUser = JSON.parse(body);
      if (validateUser(user)) {
        const newUser = await db.updateOne(user, id);
        console.log(newUser);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(newUser));
      } else {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ message: 'invalid user' }));
      }
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'user not found' }));
    }
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'invalid id (not uuid)' }));
  }
};

const deleteUser = async (req, res, id) => {
  if (uuidValidate(id)) {
    const user = await db.findOne(id);
    if (user) {
      await db.deleteOne(id);
      res.writeHead(204, { 'Content-Type': 'application/json' });
      res.end();
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'user not found' }));
    }
  } else {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'invalid id (not uuid)' }));
  }
};

export { getUsers, getOneUser, createUser, deleteUser, updateUser };
