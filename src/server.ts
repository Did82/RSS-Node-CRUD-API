import { createServer, IncomingMessage, ServerResponse } from 'http';
import { getUsers, getOneUser, createUser, updateUser, deleteUser } from './users/usersController';

const server = createServer(async (req: IncomingMessage, res: ServerResponse) => {
  try {
    if (req.url === '/api/users' && req.method === 'GET') {
      await getUsers(req, res);
    } else if (req.url.match(/\/api\/users\/([a-z\d-]+)/) && req.method === 'GET') {
      const id = req.url.split('/')[3];
      await getOneUser(req, res, id);
    } else if (req.url === '/api/users' && req.method === 'POST') {
      await createUser(req, res);
    } else if (req.url.match(/\/api\/users\/([a-z\d-]+)/) && req.method === 'PUT') {
      const id = req.url.split('/')[3];
      await updateUser(req, res, id);
    } else if (req.url.match(/\/api\/users\/([a-z\d-]+)/) && req.method === 'DELETE') {
      const id = req.url.split('/')[3];
      await deleteUser(req, res, id);
    } else {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'endpoint do not exist' }));
    }
  } catch (error) {
    res.writeHead(500, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: error.message }));
  }
});

export default server;
