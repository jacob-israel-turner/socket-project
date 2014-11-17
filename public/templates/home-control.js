var app = angular.module('socketApp');

app.controller('homeCtrl', function($scope, $timeout, $interval ,messageService){
	
	$scope.updateMessages = function(){
		 messageService.getMessages().then(function(data){
		 	console.log(data);
			$scope.messages = data.data;
		})
	}
	$scope.updateMessages();

	$timeout(function(){
		var elem = document.getElementById('message-container');
		elem.scrollTop = elem.scrollHeight;
	}, 200);

	$scope.sendMessage = function(){
		if(!$scope.inputText) return;
		var json = {
			"message":$scope.inputText
		}
		messageService.sendMessage(json).then(function(){
			var elem = document.getElementById('message-container');
			elem.scrollTop = elem.scrollHeight;
		});
		$scope.inputText = '';
	}
})