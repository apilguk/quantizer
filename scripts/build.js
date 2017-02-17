import sh from 'sh';
import webpack from 'webpack';
import ProgressPlugin from 'progress-bar-webpack-plugin';
import config from '../webpack.config';
import { OUTPUT_PATH } from './config';



export const clear = () => {
  console.log(`Clearing build dir: '${OUTPUT_PATH}'...`);
  return new Promise((resolve, reject) => {
    sh(`rm -rf ${OUTPUT_PATH}`, (err) => {
      if (err) {
        reject(err)
      };
      console.log(`Finished clearing build dir: '${OUTPUT_PATH}'!`);
      resolve();
    });
  });
};

export const run = () => {
  console.log(`Clearing build dir: '${OUTPUT_PATH}'...`);
  let compiler = webpack(config)
  compiler.apply(new ProgressPlugin());
  compiler.run((err, stats) => {
    if (err) return done(err);
    console.log('[webpack:build]', stats.toString("minimal"));
    console.log("Finished site build!");
  });
};

clear().then(() => run());
