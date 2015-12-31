var mongoose = require('mongoose');

// schema for the user model
var userSchema = mongoose.Schema({

	google	: {
		id		: String,
		token	: String,
		email	: String,
		name	: String
	},

	wishlist : [{
		description: { type: String, required: true},
		url: String }]
});

module.exports = mongoose.model('User', userSchema);
