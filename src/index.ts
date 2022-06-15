import 'dotenv/config';
import server from './server';

const port = process.env.PORT || 3000;

server.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
