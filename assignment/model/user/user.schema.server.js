/**
 * Created by Ethan on 3/22/2017.
 */


module.exports = function () {
    var mongoose = require('mongoose');

    var UserSchema = mongoose.Schema({
        username: String,
        password: String,
        firstName: String,
        lastName: String,
        email: String,
        phone: String,
        websites: [Website],
        dateCreated: Date
    }, {collection: 'assignment.user'});
};