var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var MeetingSchema = new Schema({
    patient: {type: Number, ref: 'patient'},
    doctor: {type: Number, ref: 'doctor'},
    time: {
        start: Date,
        end: Date
    }
});

module.exports = mongoose.model('Patient', MeetingSchema);