var UserProfile = require('./userModel.js');
var bcrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');

module.exports = {
  cookieCheck: function(req,res) {
    var cookie = req.cookies.matchlycookie;
    UserProfile.findOne({'matchlycookie': cookie}, function(err, data) {
        // console.log(data);
        res.send(data);
    });
  },

  checkLogin: function(req, res) {
    var hash = req.body.password;
    UserProfile.findOne({username: req.body.username}, function(err, data) {
      var dbhash = data[0].password;
      var compare = bcrypt.compareSync(hash, dbhash); // true when using correct password
      if(compare) {
         if(req.cookies.matchlycookie===underfined){
          //set cookie
         }
      }
      if(err) {
        return res.send(err);
      }
      res.send(data);
    });
  },

  registerUser: function(req, res) {
    // console.log(req.body, "before has");
    req.body.password=bcrypt.hashSync(req.body.password);
    req.body.matchlycookie=req.cookies.matchlycookie;

    // console.log(req.body,"after hash");
    UserProfile.create(req.body, function(err, data) {
      if(err) {
        return res.send(err);
      }
      res.send(data);
    });
    // bcrypt.compareSync("bacon", hash); // true
    // bcrypt.compareSync("veggies", hash); // false
    
  },

	

 //  getBlogPosts: function(req, res) {
	// 	BlogPost.find({}, function(err, data) {
	// 		if(err) {
	// 			return res.send(err);
	// 		}
	// 		res.send(data);
	// 	});
	// },



};