var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passwordHash = require('password-hash');
var config = require('../config');

module.exports = function(router){

  router.post('/', function(req, res) {

      User.findOne({username: req.body.username}, function(err, user){
          if(user){
              res.send({error: "username already exist"});
          } else if (typeof req.body.username == "undefined" || typeof req.body.password == "undefined" || typeof req.body.firstName == "undefined"
            || typeof req.body.lastName == "undefined" || typeof req.body.patronymic == "undefined" || typeof req.body.dateOfBirth == "undefined"
            || typeof req.body.email == "undefined" || typeof req.body.phoneNumber == "undefined"){
              res.send({error: "require field not specified (username, password, firstName, lastName, patronymic, email, dateOfBirth, phoneNumber)"});
          } else {
              var newUser = new User({
                username: req.body.username,
                password: passwordHash.generate(req.body.password, {algorithm: config.hashAlgorithm}),
                photoUrl: req.body.photoUrl,
                name: {
                    first: req.body.firstName,
                    last: req.body.lastName,
                    patronymic: req.body.patronymic
                },
                dateOfBirth: req.body.dateOfBirth,
                patientData: {
                    contacts: {
                        email: req.body.email,
                        phoneNumber: req.body.phoneNumber
                    },
                    address: {
                        street: req.body.street,
                        building: req.body.building,
                        appartment: req.body.appartment
                    }
                }
            });
            newUser.save(function(err, user){
                if(err){
                res.send(err);
                } else {
                res.send(user);
                }
            });
          }
      })

  });
}