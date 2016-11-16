var server = require('http').createServer(),
	url = require('url'),
	app = require('express')();

module.exports = (port) => {

	server.on('request',app);

	server.listen(port, () => {
		console.log(`Http listening on ${port}`);
	});

	app.get('/', (req,res) => {

		res.send('HOLY GRILL!');

	});

	return server;
};