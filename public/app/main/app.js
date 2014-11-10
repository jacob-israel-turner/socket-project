var app = angular.module('socketApp', ['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
		templateUrl: '/templates/home-view.html',
		controller: 'homeCtrl'
	})
})