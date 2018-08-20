var mongoose = require('mongoose');

var shorturlSchema = new mongoose.Schema({
	originalURL: String,
	shortURL: String,
	shortCode: String,
	addedDate: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('Shorturl', shorturlSchema);