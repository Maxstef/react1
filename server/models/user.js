var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var UserSchema = new Schema({
    username: String,
    password: String,
    name: {
        first: String,
        last: String,
        patronymic: String
    },
    dateOfBirth: Date,
    patientData: { 
        type: {
            contacts: {
                email: String,
                phoneNumber: String
            },
            address: {
                street: String,
                building: String,
                appartment: String
            }
        }, 
        default: null
    },
    doctorData: {
        type: {
            doctorType: [{
                name: String,
                description: String
            }]
        }, 
        default: null
    },
    adminData: {
        type: {

        },
        default: null
    }
});

module.exports = mongoose.model('user', UserSchema);