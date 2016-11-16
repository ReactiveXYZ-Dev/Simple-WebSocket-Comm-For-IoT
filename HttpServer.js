var server = require('http').createServer(),
	url = require('url'),
	app = require('express')(),
	bodyParser = require('body-parser'),
	requestValidator = require('./modules/WSRequestValidator')().create(),
	players = require('./modules/PlayerRepository')().create();

module.exports = (port) => {

	// set up server
	server.on('request',app);

	// set up request body parser
	app.use(bodyParser.json());
	app.use(bodyParser.urlencoded({ extended: true }));

	// some mocking routes
	app.get('/', (req,res) => {

		res.send('HOLY SHIT!');

	});

	app.post('/register', (req, res) => {

		// check validator
		if (req.body['accessToken'] && requestValidator.validate(req.body['accessToken'])) {

			players.register(req.body['playerId'])
					   .then(success => {
					   		res.send({
					   			status: "success",
					   			message: "Player registered"
					   		});
					   })
					   .catch(err => {
					   		res.send({
					   			status: "error",
					   			message: "Cannot store data"
					   		});
					   });

		} else {

			res.send({
				status : "error",
				message : "Authentication error"
			});

		}

	});

	// start listening
	server.listen({
			port: port,
			host: 'localhost'
		},() => {
		console.log(`Http listening on ${port}`);
	});

	return server;
};