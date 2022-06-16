import * as fs from 'fs';
import * as path from 'path';

const clean = () => {
  const dist = path.resolve(__dirname, '../../dist');
  if (fs.existsSync(dist)) {
    fs.rm(dist, { recursive: true }, (err) => {
      if (err) {
        console.error(err);
      }
    });
  }
};

clean();
