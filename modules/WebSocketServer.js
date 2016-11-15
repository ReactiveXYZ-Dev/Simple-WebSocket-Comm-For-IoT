var wss = require('ws').Server;

class WebSocketServer {

	constructor(port){

		this.port = port;

		this.server = new wss({'port' : port});

	}

	create(){

		return new Promise((resolve, reject) => {
			
			this.server.on('connection', (ws) => {

				resolve(ws);

			});

		});

	}


}

module.exports = (port) => {

	return new WebSocketServer(port);

} 