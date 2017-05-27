var express = require('express');
var router = express.Router();
var config = require('../config');
var smtpConfig = require('../smtpConfig');
var User = require('../models/user');
var crypto = require('crypto');
var nodemailer = require("nodemailer");
var moment = require('moment');
var passwordHash = require('password-hash');

module.exports = function (router) {
    router.post('/', function (req, res) {
        if (typeof req.query.restorePassword !== 'undefined') {

            User.findOne({
                $and: [
                    { 'patientData.passwordReset.token': req.body.token },
                    { 'patientData.passwordReset.expirationDate': { $gt: moment().format() } }
                ]
            },
                function (err, user) {
                    if (user === null) {
                        res.send({ error: true, message: "Your restore password token is invalid or has expired" });
                    } else {
                        User.update({
                            'patientData.passwordReset.token': req.body.token
                        }, {
                                $set: {
                                    "password": passwordHash.generate(req.body.password, {algorithm: config.hashAlgorithm}),
                                    "patientData.passwordReset.token": null,
                                    "patientData.passwordReset.expirationDate": null
                                }
                            }, function (err) {
                                if (err) {
                                    res.send(err);
                                }
                                res.send({ error: false, message: 'Success! Your password has been changed.' });
                            });
                    }

                }
            );

        } else {
            var token;
            crypto.randomBytes(20, function (err, buf) {
                token = buf.toString('hex');
                User.findOne({ 'patientData.contacts.email': req.body.email }, function (err, user) {
                    if (user === null) {
                        res.send({ error: true, message: "No account with that email address exists." });
                    } else {
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
                            from: smtpConfig.user,
                            subject: 'Clinic Password Reset',
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
                            User.update({
                                'patientData.contacts.email': req.body.email
                            }, {
                                    $set: {
                                        "patientData.passwordReset.token": token,
                                        "patientData.passwordReset.expirationDate": moment().add(1, 'hours').format()
                                    }
                                }, function (err) {
                                    if (err) {
                                        res.send(err);
                                    }
                                    res.send({ error: false, message: 'An e-mail has been sent to ' + user.patientData.contacts.email + ' with further instructions.' });
                                });
                        });
                    }
                });
            });
        }

    });
}