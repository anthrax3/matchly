var cookieParser = require('cookie-parser');
var express = require('express');
var Hat = require('hat');

var app = express();
var userController = require('./database/userController');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://travis:abc123@ds041188.mongolab.com:41188/finalproject');

app.use(cookieParser());
// app.use(function(req,res,next) {
//   if(req.cookies.matchlycookie===undefined) {
//     var hatNumber = Hat();
//     res.cookie('matchlycookie',hatNumber);
//   }
//   else {
//     console.log('cookie exists');
//   }
//   next();
// });
app.get('/',userController.authorizationCheck);
// app.get('/login',userController.loginHTML);
app.use(express.static(__dirname + "./../"));
app.use(bodyParser.json({limit:1024*1024*20}));
app.post('/checkLogin', userController.cookieCheck);
app.post('/registerUser', userController.registerUser);
app.post('/userLogin', userController.checkLogin);
app.post('/submithosts',userController.submithosts);
app.post('/submitvisitors',userController.submitvisitors);
app.post('/availability', userController.availability);
app.get('/match', userController.rumble);
app.get('/getAvailableData',userController.getAvailableData);

app.listen(process.env.PORT || 3000);