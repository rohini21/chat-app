var express = require('express');
var app     = express();
//var dbconnector = require('./dbconnector'); 
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
  console.log('Chat app listening at http://%s:%s', host, port);
});

var io      = require('socket.io')(server);
var users = {};
var usernames = []

// Routing - express.static middleware to start serving the files directly
app.use(express.static(__dirname + '/public'));

io.on('connection', function(socket){
	io.emit('loggedin_user', usernames);

	socket.on('chat_mesg', function(userObj){
		var id = users[userObj.receiver];
		console.log("id",id);
		io.to(id).emit('chat_mesg', userObj);
	});
	
	socket.on('login', function(username){
			users[username] = socket.id;
			usernames.push(username);
			io.emit('loggedin_user', usernames);
	});
	
	socket.on('logout', function(username){
		delete users[username];
		usernames = usernames.filter(function(user){
			return user !== username;
		});
		io.emit('loggedin_user', usernames);
	});
});
