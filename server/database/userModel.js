var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	schoolCode: {type: String, required:false},
  firstName: {type: String, required:false},
  lastName: {type: String, required:false},
  emailAddress: {type: String, required:false},
  username: {type: String, required:false},
	password: {type: String, required:false},
  matchlycookie: {type: String, required:false}
});

module.exports = mongoose.model('UserController', userSchema);