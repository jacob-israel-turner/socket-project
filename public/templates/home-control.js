var app = angular.module('socketApp');

app.controller('homeCtrl', function($scope, messageService){
	var socket = io.connect('http://localhost')
	$scope.messages = [{message: 'Welcome to chat!'}]
	$scope.sendMessage = function(){
		if(!$scope.inputText) return;
		var json = {
			"message":$scope.inputText
		}
		messageService.sendMessage(json).then(function(){
			var elem = document.getElementById('message-container');
			//console.log(elem.offsetHeight);//height of view of element
			//console.log(elem.scrollTop); //Where the user is scrolled
			//console.log(elem.scrollHeight);//full heigth of scroll
			elem.scrollTop = elem.scrollHeight;
		});
		$scope.inputText = '';
	}
	socket.on('new message', function(data){
		var elem = document.getElementById('message-container');
		var bottom = false;
		if(elem.offsetHeight + elem.scrollTop + 10 >= elem.scrollHeight) {
			bottom = true;
		}
		$scope.$apply(function(){
			$scope.messages.push(data);
		})
		if(bottom === true) {
			elem.scrollTop = elem.scrollHeight;
		}
	})
	socket.on('user connected', function(data){
		$scope.$apply(function(){
			$scope.messages.push(data);
		})
	})
})