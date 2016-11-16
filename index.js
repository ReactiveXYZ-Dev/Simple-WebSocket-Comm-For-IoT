
/** 
 * Slience is golden ...
 */

// initialize http server
var server = require('./HttpServer')(8080);

// initialize websocket server
require('./WebSocketServer')(server);

