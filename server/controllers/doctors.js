var express = require('express');
var router = express.Router();
var Doctor = require('../models/doctor');

module.exports = function(router){
    router.get('/', function (req, res) {
        Doctor.find(function(err, doctor){
            res.send(doctor);
        });
    });

    router.get('/:id', function(req, res) {
        Doctor.findById(req.params.id, function(err, doctor){
            res.send(doctor);
        });
    });

    router.post('/', function(req, res) {
        res.send('Post doctor works');
    });
}