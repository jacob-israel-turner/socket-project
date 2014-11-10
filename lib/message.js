var Mongoose = require('mongoose'),
	Schema = Mongoose.Schema;

var schema = new Schema({
		message: {type: String, required: true},
		timestamp: {type: String, require: true}
})

module.exports = Mongoose.model('Message', schema);