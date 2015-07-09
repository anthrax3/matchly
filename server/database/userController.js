var UserProfile = require('./UserModel.js');

module.exports = {
	getData: function(req, res) {
		UserProfile.find({}, function(err, data) {
			if(err) {
				return res.send(err);
			}
			res.send(data);
		});
	},	

	postUserProfile: function(req, res) {
		UserProfile.create(req.body, function(err, newProfile) {
			if(err) {
				res.send(err);
			}
			res.send(newProfile);
		});
	}
};