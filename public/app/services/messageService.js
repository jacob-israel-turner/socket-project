var app = angular.module('socketApp');

app.service('messageService', function($http){
	this.sendMessage = function(message){
		return $http({
			method: 'POST',
			url: '/api/message',
			data: message
		})
	}
});