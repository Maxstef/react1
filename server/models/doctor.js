var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var DoctorSchema = new Schema({
    _id: Number,
    user: { type: Number, ref: 'user' },
    doctorType: [{
        name: String,
        description: String
    }],
});

module.exports = mongoose.model('doctor', DoctorSchema);