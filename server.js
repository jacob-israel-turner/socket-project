//Using the guide on here: http://socket.io/docs/
//Folloowing Express 3/4

var Express = require('express'),
	App = Express(),
	server = require('http').Server(App),
	io = require('socket.io')(server),
	bodyParser = require("body-parser"),
	port = 9015;

App.use(Express.static(__dirname + '/public'));
App.use(bodyParser.json());

App.get('/', function(req, res){
	console.log('got here');
	res.end();
})

io.on('connection', function (socket) {
	io.emit('user connected', {
		message: socket.client.id + ' has connected.',
		timestamp: Date.now()
	});
	console.log(socket.client.id);
});

App.post('/api/message', function(req, res){
	io.emit('new message', {
		message: req.body.message,
		timestamp: Date.now()

		});
	res.end();
})

//Have to use server.listen
//instead of app.listen
//because http://goo.gl/9Mkuss
server.listen(port, function(){ 
	console.log('Now listening on port ' + port);
})