var wss = require('ws').Server;

class WebSocketServer {

	constructor(port){

		this.port = port;

		this.server = new wss({'port' : port});

		this.connections = [];

	}

	getServer(){

		return this.server;

	}

	create(){

		return new Promise((resolve, reject) => {
			
			this.server.on('connection', (ws) => {

				// append new connection
				this.connections.push(ws);

				// resolve ws
				resolve(this.connections[this.connections.length - 1]);

			});

		});

	}

	broadcast(message){

		this.connections.forEach((ws) => {

			ws.send(message);

			console.log("Sent: " + message);

		});

	}

}

module.exports = (port) => {

	return new WebSocketServer(port);

} 