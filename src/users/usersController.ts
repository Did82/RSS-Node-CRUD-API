import UsersDb from './usersModel';

const db = new UsersDb();

const getUsers = async (req, res) => {
  const users = await db.findAll();
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(users));
};

export default getUsers;
