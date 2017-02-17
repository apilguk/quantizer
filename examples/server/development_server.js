import path from 'path';
import express from 'express';
import request from 'request';
import webpack from 'webpack';
import config from './config';
import webpackMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';
import WebpackDevServer from 'webpack-dev-server';

export default (port, callback) => {

	let app = express();
	let compiler = webpack(config);

	app.use(webpackMiddleware(compiler, { publicPath: '/', stats: config.stats.toString() }));
	app.use(webpackHotMiddleware(compiler));
	app.use((req, res, next) => {

		if (req.url !== '/') {

			req.pipe(request(`http://localhost:${port}`)).pipe(res);

		} else {

			next();

		}

	});

	app.get('*', (request, responce) => {

		responce.sendFile(path.join(__dirname, '../../examples/index.html'));

	});

	app.listen(port, (err) => {

		if (err) {

			console.log(err);
			return;

		}

		callback();

	});

};
