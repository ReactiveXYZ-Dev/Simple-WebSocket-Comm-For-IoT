let server = require('./modules/WebSocketServer')(8888).create();

let players = require('./modules/PlayerRepository')().create();

let parser = require('./modules/MessageParser')().create();

server.then((server) => {

	server.on('message', (message) => {

		let udid = parser.load(message).id();

		players.then(players => {

			players.exists(udid).then(() => {

				server.send(message, (error) => {

					console.log(error);

				});

			});

		});

	});

});

