var express = require('express');
    app = express(),
    mongoose = require('mongoose'),
    Config = require('./config'),
    bodyParser = require("body-parser");

// init mongo models
require('./models')();

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.get('/', function (req, res) {
  res.send('Express server works!');
});

// init controllers
require('./controllers/index')(app);

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});