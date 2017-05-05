var express = require('express');
var router = express.Router();
var Patient = require('../models/patient');

module.exports = function(router){
    router.get('/', function (req, res) {
        Patient.find(function(err, patient){
            res.send(patient);
        });
    });

    router.get('/:id', function(req, res) {
        Patient.findById(req.params.id, function(err, patient){
            res.send(patient);
        });
    });

    router.post('/', function(req, res) {
        res.send('Post doctor works');
    });
}

