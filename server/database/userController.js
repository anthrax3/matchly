var UserProfile = require('./userModel.js');
var VisitorProfile = require('./visitorModel.js');
var HostProfile = require('./hostModel.js');
var bcrypt = require('bcrypt-nodejs');
var cookieParser = require('cookie-parser');
var availabilityProfile = require('./availability.js');
var Promise = require("bluebird");
var Rumble = require('./../../algorithm2.js');
var csv=require('fast-csv');

module.exports = {
  cookieCheck: function(req,res) {
    var cookie = req.cookies.matchlycookie;
    UserProfile.findOne({'matchlycookie': cookie}, function(err, data) {
        // console.log(data);
        res.send(data);
    });
  },

  rumble:function(req,res) {
    var VisitorData;
    var HostData;
    var AvailabiltyConstraint;
    VisitorProfile.find({},function(err, data){
      if(err) {
        return res.send(err);
      }
      VisitorData=data;
      HostProfile.find({},function(err, data){
        if(err) {
          return res.send(err);
        }
        HostData=data;
        availabilityProfile.find({}).lean().exec(function(err, data){
          if(err) {
            return res.send(err);
          }
          AvailabiltyConstraint=data;
          var RumbleData = Rumble.rumble(VisitorData,HostData,AvailabiltyConstraint);
          var csvStream = csv.writeToString(RumbleData, function(err, data){
            console.log(data);
            if(err){
              res.send(err);
            }
            var dataObject = {
              csv:data,
              array:RumbleData
            };
            res.send(dataObject);
          });
        });
      });
    });
  },

  availability:function(req,res) {

    availabilityProfile.create(req.body, function(err, data) {
      if(err) {
        return res.send(err);
      }
      console.log(data,'data');
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
  submithosts: function(req, res) {
    console.log(req.body);
    req.body.forEach(function(element){
      HostProfile.create(element, function(err, data) {
        if(err) {
          return res.send(err);
        }
        data = data.toObject();
        res.send(data);
      });
    });
  },

  submitvisitors: function(req,res) {
    console.log(req.body);
    req.body.forEach(function(element){
      VisitorProfile.create(element, function(err, data) {
        if(err) {
          return res.send(err);
        }
        res.send(data);
      });
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