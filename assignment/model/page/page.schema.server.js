/**
 * Created by Ethan on 3/22/2017.
 */

module.exports = function (mongoose) {

    var PageSchema = mongoose.Schema({
        _website: {type: mongoose.Schema.Types.ObjectId, ref: 'WebsiteModel'},
        name: String,
        title: String,
        description: String,
        widgets: [{type: mongoose.Schema.Types.ObjectId, ref: 'WidgetModel'}],
        dateCreated: {type: Date, default: Date.now()}
    }, {collection: 'pages'});

    return PageSchema;
};
