var mongoose = require('mongoose');
var Schema = mongoose.Schema;
 
var UserSchema = new Schema({
    _id: Number,
    username: String,
    password: String,
    name: {
        first: String,
        last: String,
        patronymic: String
    },
    dateOfBirth: Date,
    roles: [{
        name: String,
        description: String
    }]
});

module.exports = mongoose.model('user', UserSchema);