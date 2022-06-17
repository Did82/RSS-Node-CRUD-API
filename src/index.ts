import 'dotenv/config';
import server from './server';

const port = process.env.PORT || 3000;

export const app = () => {
  server.listen(port, () => {
    console.log(`🚀 Server ready at http://localhost:${port}`);
  });
};

app();
