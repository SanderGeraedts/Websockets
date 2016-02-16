var http = require('http');
var server = http.createServer(function(request, respnse) {});

server.listen(1234, function() {
	console.log((new Date()) + ' Server is listening on port 1234');
});

var WebSocketServer = require('websocket').server;
wsServer = new WebSocketServer({
	httpServer: server
});

var count = 0;
var clients = {};

wsServer.on('request', function(r){
	var connection = r.accept('echo-protocol', r.origin);

	var id = count++;
	clients[id] = connection;
	console.log((new Date()) + ' Connection accepted [' + id + ']');

	connection.on('close', function(reasonCode, description) {
		delete clients[id];
		console.log((new Date()) + ' Peer ' + connection.remoteAddress + ' disconnected.');
	});

	connection.on('message', function(emoticon){
		var emoticon_string = emoticon.utf8Data;
		console.log(emoticon_string);

		for(var i in clients){
			clients[i].sendUTF(emoticon_string);
		}
	});
});