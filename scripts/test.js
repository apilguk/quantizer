import sh from 'sh';

const run = () => {
  console.log(`Run tests...`);
  sh(`mocha --compilers js:babel-core/register test --recursive`, (res) => {
    console.log(res);
  });

};

run();
