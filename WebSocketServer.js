let players = require('./modules/PlayerRepository')().create();

let parser = require('./modules/MessageParser')().create();

module.exports = (listenOn) => {

	var WebSocketServer = require('ws').Server
  		, wss = new WebSocketServer({ port: listenOn });

	wss.on('connection', (ws) => {

		ws.on('message', (message) => {

			let udid = parser.load(message).id();

			players.then(players => {

				players.exists(udid).then(() => {

					// Broadcast to everyone else.
				    wss.clients.forEach(function each(client) {

				      	if (client !== ws) client.send(message);

				    });

				})
				.catch(error => {
					
					ws.send("You are not registered!");

				});

			});

		})

	});

}