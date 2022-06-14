import { createServer, IncomingMessage, ServerResponse } from 'http';
import getUsers from './users/usersController';

const server = createServer((req: IncomingMessage, res: ServerResponse) => {
  if (req.url === '/api/users' && req.method === 'GET') {
    getUsers(req, res);
  } else if (req.url.match(/\/api\/users\/([a-z\d-]+)/) && req.method === 'GET') {
    const id = req.url.split('/')[3];
    getOneUsers(req, res, id);
  } else if (req.url === '/api/users' && req.method === 'POST') {
    createUsers(req, res);
  } else if (req.url.match(/\/api\/users\/([a-z\d-]+)/) && req.method === 'PUT') {
    const id = req.url.split('/')[3];
    updateUsers(req, res, id);
  } else if (req.url.match(/\/api\/users\/([a-z\d-]+)/) && req.method === 'DELETE') {
    const id = req.url.split('/')[3];
    deleteUsers(req, res, id);
  } else {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'endpoint do not exist' }));
  }
});

export default server;
