var UserProfile = require('./userModel.js');
var BlogPost = require('./UserBlogPost.js');
module.exports = {

	vote: function(req, res) {
    var voter = req.body.voter_id;
    var vote = parseInt(req.body.vote);
    var query = {'_id': req.body._id};
    BlogPost.findOne(query, function(err, data) {
      if(err) {
        res.send(err);
      }
      var bool=false;
      data.voters.forEach(function(voter){
        if(voter===req.body.voter_id) {
          bool=true;
        }
      });
      if(bool===false) {
        data.voters.push(voter);
        data.votes = data.votes + vote;
        data.save();
        res.send("vote fires");        
      }
    });
  },

  getBlogPosts: function(req, res) {
		BlogPost.find({}, function(err, data) {
			if(err) {
				return res.send(err);
			}
			res.send(data);
		});
	},

	makeBlogPost: function(req, res) {
		BlogPost.create(req.body, function(err, newBlogPost) {
			if(err) {
				return res.send(err);
			}
			res.send(newBlogPost);
		});
	},

	login: function(req, res) {
		// console.log(req.body);
		UserProfile.findOne({'userName': req.body.userName}, function(err, data) {
			var password = req.body.password;
			password = password.split("").map(function(e) {
          	if(/[0-9]/.test(e)) {
            	return parseInt(e);
          	}
          	else {
            	return e.charCodeAt(e);
          	}  
		});
			var encript = 1;
			password.forEach(function(i) {
			encript = encript*i*3;
			});
			req.body.password = parseInt(encript/2/3/5*7*11*13/17/19/23/31*34*35*36*37);
			if(req.body.password === parseInt(data.password)) {
				var userInfo = [data._id, data.name];

        res.send(userInfo);
			}
			if(err) {
				return res.send(err);
			}
		});
	},

	postUserProfile: function(req, res) {
		var password = req.body.password;
		password = password.split("").map(function(e) {
          if(/[0-9]/.test(e)) {
            return parseInt(e);
          }
          else {
            return e.charCodeAt(e);
          }    
	});
			var encript = 1;
			password.forEach(function(i) {
				encript = encript*i*3;
			});
			req.body.password = parseInt(encript/2/3/5*7*11*13/17/19/23/31*34*35*36*37);
		
		UserProfile.create(req.body, function(err, data) {
			if(err) {
				res.send(err);
			}
			res.send(data);
		});
	}
};