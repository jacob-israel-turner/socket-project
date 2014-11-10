var app = angular.module('socketApp');

app.controller('homeCtrl', function($scope, $timeout, $interval ,messageService){
	var socket = io.connect('http://localhost')
	
	$scope.updateMessages = function(){
		 messageService.getMessages().then(function(data){
			$scope.messages = data.data;
		})
	}
	$scope.updateMessages();

	$timeout(function(){
		var elem = document.getElementById('message-container');
		elem.scrollTop = elem.scrollHeight;
	}, 200);

	$interval(function(){
		$scope.updateMessages();
	}, 30000);

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
})