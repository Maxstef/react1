var express = require('express');
var router = express.Router();
var User = require('../models/user');
var passwordHash = require('password-hash');
var config = require('../config');
var _ = require("lodash");

module.exports = function (router) {
    router.get('/', function (req, res) {
        User.find({
            $and: [{
                doctorData: {
                    $ne: null
                }
            }, {
                "doctorData.isDeleted": {
                    $ne: true
                }
            }]
        }, { password: 0 }, function (err, doctor) {
            res.send(doctor);
        });
    });
    router.put('/:id', function (req, res) {

        if (typeof req.body.delete != 'undefined' && req.body.delete === true) {
            User.update({
                _id: req.params.id
            }, {
                    $set: {
                        "doctorData.isDeleted": true
                    }
                }, function (err, updatedDoctor) {
                    if (err) {
                        res.send(err);
                    }
                    res.send({
                        message: 'Deleted',
                        data: updatedDoctor
                    });
                });
        } else {
            User.findById(req.params.id, function (err, doctor) {
                let done = false;
                if (err) {
                    res.send(err);
                } else {
                    doctor.username = (req.body.username) ? req.body.username : doctor.username;
                    doctor.password = (req.body.password) ? passwordHash.generate(req.body.password, {
                        algorithm: config.hashAlgorithm
                    }) : doctor.password;
                    doctor.name.first = (req.body.firstName) ? req.body.firstName : doctor.name.first;
                    doctor.name.last = (req.body.lastName) ? req.body.lastName : doctor.name.last;
                    doctor.name.patronymic = (req.body.patronymic) ? req.body.patronymic : doctor.name.patronymic;
                    doctor.dateOfBirth = (req.body.dateOfBirth) ? req.body.dateOfBirth : doctor.dateOfBirth;
                    doctor.photoUrl = (req.body.photoUrl) ? req.body.photoUrl : doctor.photoUrl;
                    doctor.doctorData.bio = (req.body.bio) ? req.body.bio : doctor.doctorData.bio;
                    doctor.doctorData.doctorType = (req.body.doctorType) ? req.body.doctorType : doctor.doctorData.doctorType;
                    doctor.doctorData.available = (req.body.available) ? req.body.available : doctor.doctorData.available;
                    if(req.body.specialDays && typeof doctor.doctorData.specialDays != 'undefined' && req.query.removeSpecial == 'true'){
                        let i, remove;
                        _.forEach(doctor.doctorData.specialDays, (day, index) => {
                            if(day.date == req.body.specialDays[0].date){
                                _.forEach(req.body.specialDays[0].slot, (s, inde) => {
                                    remove = true;
                                    if(day.slot[inde] != s){
                                        remove = false;
                                    }
                                });
                                if(remove){
                                    i = index;
                                }
                            }
                        });
                        if(typeof i != 'undefined'){
                            doctor.doctorData.specialDays.splice(i, 1);
                        }
                    } else if(req.body.specialDays && typeof doctor.doctorData.specialDays != 'undefined'){
                        if(req.body.specialDays.length == 0 || req.body.specialDays[0].slot.length == 0 || req.body.specialDays[0].date === null){
                            done = true;
                            res.send({error: true, message: 'Error! Please choose the date and timeslots'});
                        }
                        _.forEach(doctor.doctorData.specialDays, (day) => {
                            if(day.date == req.body.specialDays[0].date && !done){
                                _.forEach(req.body.specialDays[0].slot, (s) => {
                                    if(_.includes(day.slot, s) && !done){
                                        done = true;
                                        res.send({error: true, message: 'Some hours are already saved. You can not add it again. Check your saved overtime hours.'});
                                    }
                                })
                            }
                        })
                    }
                    if(typeof doctor.doctorData.specialDays == 'undefined'){
                        doctor.doctorData.specialDays = [];
                    }
                    if(req.query.removeSpecial != 'true'){
                        doctor.doctorData.specialDays = (req.body.specialDays) ? doctor.doctorData.specialDays.concat(req.body.specialDays) : doctor.doctorData.specialDays;
                    }
                    if(!done){
                        User.update({
                                _id: req.params.id
                            }, {
                                $set: {
                                    "username": doctor.username,
                                    "password": doctor.password,
                                    "name.first": doctor.name.first,
                                    "name.last": doctor.name.last,
                                    "name.patronymic": doctor.name.patronymic,
                                    "dateOfBirth": doctor.dateOfBirth,
                                    "doctorData.bio": doctor.doctorData.bio,
                                    "doctorData.doctorType": doctor.doctorData.doctorType,
                                    "doctorData.available": doctor.doctorData.available,
                                    "doctorData.specialDays": doctor.doctorData.specialDays,
                                    "photoUrl": doctor.photoUrl
                                }
                            }, function (err) {
                                if (err) {
                                    res.send(err);
                                }
                                User.findById(req.params.id, function (err, doctor) {
                                    res.send(doctor);
                                });
                            });
                    }
                }
                
            });
        }
    })
}