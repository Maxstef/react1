var mongoose = require('mongoose'),
    User = require('./user'),
    Patient = require('./patient'),
    Doctor = require('./doctor'),
    config = require('../config');

module.exports = function () {
    'use strict';

    mongoose.connect(config.db);

    User.findById(1).exec(function(err, u){
        if(!u){
            var userPatient = new User({
                _id: 1,
                username: 'patient',
                password: 'patient',
                name: {
                    first: 'patient',
                    last: 'patient',
                    patronymic: 'patient'
                },
                dateOfBirth: new Date(),
                roles: [{
                    name: 'patient',
                    description: 'patient'
                }]
            });
            userPatient.save(function(err){
                if(err){
                    console.log(err);
                }
            });
        } 
    });

    User.findById(2).exec(function(err, u){
        if(!u){
            var userDoctor = new User({
                _id: 2,
                username: 'doctor',
                password: 'doctor',
                name: {
                    first: 'doctor',
                    last: 'doctor',
                    patronymic: 'doctor'
                },
                dateOfBirth: new Date(),
                roles: [{
                    name: 'doctor',
                    description: 'doctor'
                }]
            });
            userDoctor.save(function(err){
                if(err){
                    console.log(err);
                }
            });
        }
    });

    Doctor.findById(1).exec(function(err, u){
        if(!u){
            var doctor = new Doctor({
                _id: 1,
                user: 2,
                doctorType: [{
                    name: 'Therapist',
                    description: ''
                }]
            });
            doctor.save(function(err){
                if(err){
                    console.log(err);
                }
            });
        }
    });

    Doctor.findById(1).exec(function(err, u){
        if(!u){
            var patient = new Patient({
                _id: 1,
                user: 1,
                contacts: {
                    email: 'user@mail.com',
                    phoneNumber: '000000000'
                },
                address: {
                    street: 'street',
                    building: '1',
                    appartment: '1'
                }
            });
            patient.save(function(err){
                if(err){
                    console.log(err);
                }
            });
        }
        
    });
    
};