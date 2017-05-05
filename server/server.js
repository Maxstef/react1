var express = require('express');
    app = express(),
    mongoose = require('mongoose'),
    Config = require('./config');

// init mongo models
console.log(Config);
require('./models')();

app.get('/', function (req, res) {
  res.send('Express server');
});

var users = require('./controllers/users');

app.use('/users', users);

app.listen(3000, function () {
  console.log('Server listening on port 3000!');
});