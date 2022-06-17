import * as os from 'os';
import cluster from 'cluster';

const countCpus: number = os.cpus().length;

if (cluster.isPrimary) {
  console.log(`Primary ${process.pid} is running`);
  for (let i = 0; i < countCpus; i++) {
    cluster.fork();
  }
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} died, code: ${code}, signal: ${signal}`);
    cluster.fork();
  });
} else {
  import('./index');
  console.log(`Worker ${process.pid} is running`);
}
