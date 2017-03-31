/**
 * Created by Ethan on 2/25/2017.
 */

module.exports = function (app) {

    var connectionString = 'mongodb://127.0.0.1:27017/assignment';

    if(process.env.MLAB_USERNAME) {
        connectionString = process.env.MLAB_USERNAME + ":" +
            process.env.MLAB_PASSWORD + "@" +
            process.env.MLAB_HOST + ':' +
            process.env.MLAB_PORT + '/' +
            process.env.MLAB_APP_NAME;
    }

    var mongoose = require("mongoose");
    mongoose.connect(connectionString);

    var userModel = require('./model/user/user.model.server')(mongoose);
    var websiteModel = require('./model/website/website.model.server')(mongoose, userModel);
    var pageModel = require('./model/page/page.model.server')(mongoose, websiteModel);
    var widgetModel = require('./model/widget/widget.model.server')(mongoose, pageModel);

    require("./services/user.service.server.js")(app, userModel);
    require("./services/website.service.server.js")(app, websiteModel);
    require("./services/page.service.server.js")(app, pageModel);
    require("./services/widget.service.server.js")(app, widgetModel);
};
