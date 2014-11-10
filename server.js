//Using the guide on here: http://socket.io/docs/
//Folloowing Express 3/4

var Express = require('express'),
	App = Express(),
	server = require('http').Server(App),
	Mongoose = require('mongoose'),
	io = require('socket.io')(server),
	bodyParser = require("body-parser"),
	mongoUri = 'mongodb://localhost:27017/socket',
	port = 9015;

var messageService = require('./lib/service');

App.use(Express.static(__dirname + '/public'));
App.use(bodyParser.json());

App.get('/', function(req, res){
	console.log('got here');
	res.end();
});
App.post('/api/message', function(req, res){
	messageService.addMessage(req.body.message).then(function(data){
		io.emit('new message', {
			message: req.body.message,
			timestamp: Date.now()
		});
		res.json(data);
	})
});
App.get('/api/message', function(req, res){
	messageService.getMessages().then(function(data){
		res.json(data);
	})
})

io.on('connection', function (socket) {
	var message  = socket.client.id + ' has connected.'
	messageService.addMessage(message).then(function(){
		io.emit('user connected', {
			message: socket.client.id + ' has connected.',
			timestamp: Date.now()
		});
	})
	socket.on('disconnect', function(){
		var message2 = socket.client.id + ' has disconnected.'
		messageService.addMessage(message2).then(function(){
			io.emit('new message', {
				message: socket.client.id + ' has disconnected.',
				timestamp: Date.now()
			});
		})
	});
});

Mongoose.connect(mongoUri);

Mongoose.connection.once('open', function(){
	console.log('Connected to database: ' + mongoUri)
})


//Have to use server.listen
//instead of app.listen
//because http://goo.gl/9Mkuss
server.listen(port, function(){ 
	console.log('Now listening on port ' + port);
})