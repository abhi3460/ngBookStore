'use strict';

var mongoose = require('mongoose');

var bookModel = function() {
	var bookSchema = mongoose.Schema({
		title: String,
		author: String,
		publisher: String,
		price: Number,
		category: String,
		description: String,
		cover: String
	});

	return mongoose.model('Book', bookSchema);
}

module.exports = new bookModel();