var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;

var MeetingSchema = new Schema({
    patient: { type: ObjectId, ref: 'user' },
    doctor: { type: ObjectId, ref: 'user' },
    date: Date,
    slot: Number,
    patientNotRegister: {
        phone: String,
        name: {
            first: String,
            last: String
        }
    },
    patientId: String,
    doctorId: String,
    approved: Boolean
});

module.exports = mongoose.model('meeting', MeetingSchema);