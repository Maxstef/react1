var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var PatientSchema  = new Schema({
    _id: Number,
    user: { type: Number, ref: 'user' },
    contacts: {
        email: String,
        phoneNumber: String
    },
    address: {
        street: String,
        building: String,
        appartment: String
    }
});

module.exports = mongoose.model('patient', PatientSchema);