var mongoose = require('mongoose');
var Schema = mongoose.Schema,
    ObjectId = Schema.ObjectId;
 
var MeetingSchema = new Schema({
    patient: {type: ObjectId, ref: 'user'},
    doctor: {type: ObjectId, ref: 'user'},
    time: {
        start: Date,
        end: Date
    }
});

module.exports = mongoose.model('meeting', MeetingSchema);