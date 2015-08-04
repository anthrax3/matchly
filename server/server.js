var cookieParser = require('cookie-parser');
var express = require('express');
var Hat = require('hat');

var app = express();
var userController = require('./database/userController');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://travis:abc123@ds041188.mongolab.com:41188/finalproject');

app.use(cookieParser());
app.use(function(req,res,next) {
  console.log(req.cookies, 'request.cookie');
  if(req.cookies.matchlycookie===undefined) {
    var hatNumber = Hat();
    res.cookie('matchlycookie',hatNumber);
  }
  else {
    console.log('cookie exists');
  }
  next();
});
app.use(express.static(__dirname + "./../"));
app.use(bodyParser.json());
app.post('/checkLogin', userController.cookieCheck);
app.post('/registerUser', userController.registerUser);
app.post('/userLogin', userController.checkLogin);

// app.get('/makeBlogPost', userController.getBlogPosts);

app.listen(process.env.PORT || 3000);