//let wss = require('./modules/WebSocketServer')(8888),
//	wsServer = wss.create();

var WebSocketServer = require('ws').Server
  , wss = new WebSocketServer({ port: 8888 });


let players = require('./modules/PlayerRepository')().create();

let parser = require('./modules/MessageParser')().create();


/* wsServer.then((ws) => {

	ws.on('message', (message) => {

		let udid = parser.load(message).id();

		players.then(players => {

			players.exists(udid).then(() => {

				wss.broadcast(message);

			});

		});

	});

});*/

wss.on('connection', (ws) => {

	ws.on('message', (message) => {

		let udid = parser.load(message).id();

		players.then(players => {

			players.exists(udid).then(() => {

				// Broadcast to everyone else.
			    wss.clients.forEach(function each(client) {

			      if (client !== ws) client.send(data);

			    });

			});

		});

	})

});

