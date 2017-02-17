import developmentServer from './development_server';
import chalk from 'chalk';

const PORT = 5000;

function run() {
  developmentServer(PORT, () => {
    console.log(chalk.green(`> Development Server Running on - ${PORT}`));
    console.log(chalk.grey('>'));
  });
}

run();
