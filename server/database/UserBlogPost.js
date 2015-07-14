var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var blogSchema = new Schema({
	name: {type: String},
	post: {type: String},
	votes: {type: Number},
  voters: {type: [String]}
});

module.exports = mongoose.model('UserBlogPost', blogSchema);