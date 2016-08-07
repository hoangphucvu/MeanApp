var express = require('express'),
	morgan = require('morgan'),
	compression = require('compression'),
	bodyParser = require('body-parser'),
	methodOverride = require('method-override');

module.exports = function() {
	var app = express();

	if (process.env.NODE_ENV === 'development') {
		//log the info like GET / 304 37.542 ms - -
		app.use(morgan('dev'));
	} else if (process.env.NODE_ENV === 'production') {
		app.use(compress());
	}

	app.use(bodyParser.urlencoded({
		extended : true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	require('../app/routes/index.server.routes.js')(app);
	return app;
}