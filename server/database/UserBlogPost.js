var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	name: {type: String},
	post: {type: String},
	votes: {type: Number}
});

module.exports = mongoose.model('UserBlogPost', blogSchema);