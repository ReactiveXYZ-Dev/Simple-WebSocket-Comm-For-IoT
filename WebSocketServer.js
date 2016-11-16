let players = require('./modules/PlayerRepository')().create();
let parser = require('./modules/MessageParser')().create();
let requestValidator = require('./modules/WSRequestValidator')().create();
let url = require('url');

module.exports = (listenOn) => {

	var WebSocketServer, wss, usingHttp = false;

	if (!Number.isInteger(listenOn)){
		usingHttp = true;
	}

	if (!usingHttp) {
		// listening on port
		WebSocketServer = require('ws').Server
  		, wss = new WebSocketServer({ port: listenOn });
	} else {
		// listening on http server
		WebSocketServer = require('ws').Server
  		, wss = new WebSocketServer({ server: listenOn });
	}

	wss.on('connection', (ws) => {

		if (usingHttp) {

			var location = url.parse(ws.upgradeReq.url, true);
			
			if (!requestValidator.validate(location.query['accessToken'])) {

				ws.send("Invalid access token! Disconnecting now!");

				ws.close();

				return;
			}
		}

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