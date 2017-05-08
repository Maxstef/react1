var express = require('express');
    app = express(),
    mongoose = require('mongoose'),
    Config = require('./config'),
    bodyParser = require("body-parser"),
    cors = require('cors');

// init mongo models
require('./models')();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "https://apartment-house.herokuapp.com");
  res.header("Access-Control-Allow-Headers", "authorization, Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,PUT,PATCH,POST,DELETE");
  next();
});
app.use(cors());

app.get('/', function (req, res) {
  res.send('Express server works!');
});

// init controllers
require('./controllers/index')(app);

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});