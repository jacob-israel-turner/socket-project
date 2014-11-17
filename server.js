//Using the guide on here: http://socket.io/docs/
//Folloowing Express 3/4

var Express = require('express'),
	App = Express(),
	server = require('http').Server(App),
	Mongoose = require('mongoose'),
	// io = require('socket.io')(server),
	bodyParser = require("body-parser"),
	mongoUri = 'mongodb://localhost:27017/socket',
	port = 9015;

var messageService = require('./lib/service');

App.use(Express.static(__dirname + '/public'));
App.use(bodyParser.json());

App.get('/', function(req, res){
	res.end();
});
App.post('/api/message', function(req, res){
	messageService.addMessage(req.body.message).then(function(data){
		res.json(data);
	})
});
App.get('/api/message', function(req, res){
	messageService.getMessages().then(function(data){
		res.json(data);
	})
})

Mongoose.connect(mongoUri);

Mongoose.connection.once('open', function(){
	console.log('Connected to database: ' + mongoUri)
})

server.listen(port, function(){ 
	console.log('Now listening on port ' + port);
})