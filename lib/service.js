var Message = require('./message'),
	Q = require('q'),
	Mongoose = require('mongoose');

module.exports.addMessage = function(message){
	var deferred = Q.defer();
	var message = new Message({
		message: message,
		timestamp: Date.now()
	});
	message.save(function(err, data){
		if(err) deferred.reject(new Error(err))
		deferred.resolve(data);
	})
	return deferred.promise;
};
module.exports.getMessages = function(){
	var deferred = Q.defer();
	Message.find().exec(function(err, data){
		if(err) return deferred.reject(new Error(err));
		return deferred.resolve(data);
	})
	return deferred.promise;
}