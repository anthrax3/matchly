var express = require('express');
var app = express();
var userController = require('./database/userController');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
mongoose.connect('mongodb://travis:abc123@ds031842.mongolab.com:31842/blog');

app.use(express.static(__dirname + "./../"));
app.use(bodyParser.json());
app.post('/blog', userController.postUserProfile);
app.post('/login', userController.login);
app.post('/getBlogPosts', userController.getBlogPosts);
app.post('/makeBlogPost', userController.makeBlogPost);
// app.get('/favicon.ico',function(){return null;});

app.listen(process.env.PORT || 3000);