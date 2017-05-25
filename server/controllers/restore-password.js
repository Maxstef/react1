var express = require('express');
var router = express.Router();
var config = require('../config');
var smtpConfig = require('../smtpConfig');
var User = require('../models/user');
var crypto = require('crypto');
var nodemailer = require("nodemailer");

module.exports = function (router) {
    router.post('/', function(req, res) {
        var token;
        crypto.randomBytes(20, function(err, buf) {
            token = buf.toString('hex');
        });
        User.findOne({'patientData.contacts.email': req.body.email}, function(err, user){
            if(user === null){
                res.send({error: true, message: "No account with that email address exists."});
            } else {
                 res.send({error: false, message: 'An e-mail has been sent to ' + user.patientData.contacts.email + ' with further instructions.'});
                 // create reusable transporter object using the default SMTP transport
                var transporter = nodemailer.createTransport({
                    service: smtpConfig.service,
                    auth: {
                        user: smtpConfig.user,
                        pass: smtpConfig.password
                    }
                });

                // setup email data with unicode symbols
                var mailOptions = {
                    to: user.patientData.contacts.email,
                    from: 'casstefaks@gmail.com',
                    subject: 'Node.js Password Reset',
                    text: 'You are receiving this because you (or someone else) have requested the reset of the password for your account.\n\n' +
                    'Please click on the following link, or paste this into your browser to complete the process:\n\n' +
                    'http://' + config.client + '/restore-password?token=' + token + '\n\n' +
                    'If you did not request this, please ignore this email and your password will remain unchanged.\n'
                };

                // send mail with defined transport object
                transporter.sendMail(mailOptions, (error, info) => {
                    if (error) {
                        return console.log(error);
                    }
                });
            }
        });
        
    });
}