var express = require('express');
var router = express.Router();
var User = require('../models/user');

router.get('/', function (req, res) {
  User.find(function(err, users){
    res.send(users);
  });
});

router.get('/:id', function(req, res) {
  User.findById(req.params.id, function(err, users){
    res.send(users);
  });
});

router.post('/', function(req, res) {
  res.send('Post user works');
});

module.exports = router;