/**
 * Created by Ethan on 3/22/2017.
 */

module.exports = function () {

    var mongoose = require('mongoose');

    var WebsiteSchema = mongoose.Schema({
        _user: {type: mongoose.Schema.Types.ObjectId, ref: 'UserModel'},
        name: String,
        description: String,
        pages: [{type: mongoose.Schema.Types.ObjectId, ref: 'PageModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'assignment.websites'});

    return WebsiteSchema;
};
