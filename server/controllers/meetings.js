var express = require('express');
var router = express.Router();
var Meeting = require('../models/meeting');

module.exports = function (router) {
  
  router.get('/', function (req, res) {
    if (req.query.doctorId !== undefined) {
      Meeting.find({
               doctorId: req.query.doctorId
             })
             .populate('doctor').populate('patient')
             .exec(function (err, meeting) {
               res.send(meeting);
             });
    } else {
      Meeting.find().populate('doctor').populate('patient').exec(function (err, meeting) {
        res.send(meeting);
      });
    }
  });
  
  router.get('/:id', function (req, res) {
    Meeting.findById(req.params.id).populate('doctor').populate('patient').exec(function (err, meeting) {
      res.send(meeting);
    });
  });
  
  router.post('/', function (req, res) {
    res.send('Post doctor works');
  });
};

