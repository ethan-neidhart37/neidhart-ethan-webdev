/**
 * Created by Ethan on 2/25/2017.
 */

module.exports = function (app, widgetModel) {
    var multer = require('multer'); // npm install multer --save
    var upload = multer({ dest: __dirname+'/../../public/uploads' });
    app.post("/api/page/:pageId/widget", createWidget);
    app.post("/api/upload", upload.single('myFile'), uploadImage);
    app.get("/api/page/:pageId/widget", findWidgetsByPageId);
    app.get("/api/widget/:widgetId", findWidgetById);
    app.put("/api/widget/:widgetId", updateWidget);
    app.put("/api/page/:pageId/widget", sortWidget);
    app.delete("/api/widget/:widgetId", deleteWidget);

    function createWidget(req, res) {
        var pageId = req.params["pageId"];
        var newWidget = req.body;

        widgetModel
            .createWidget(pageId, newWidget)
            .then(function (widget) {
                res.json(widget);
            }, function (error) {
                res.status(500).send(error);
            });

        // newWidget.pageId = pageId;
        // newWidget._id = (new Date()).getTime() + "";
        // widgets.push(newWidget);
        // res.json(newWidget);
    }

    function uploadImage(req, res) {

        var widgetId      = req.body.widgetId;
        var width         = req.body.width;
        var myFile        = req.file;

        var userId = req.body.userId;
        var websiteId = req.body.websiteId;
        var pageId = req.body.pageId;

        var originalname  = myFile.originalname; // file name on user's computer
        var filename      = myFile.filename;     // new file name in upload folder
        var path          = myFile.path;         // full path of uploaded file
        var destination   = myFile.destination;  // folder where file is saved to
        var size          = myFile.size;
        var mimetype      = myFile.mimetype;

        widget = getWidgetById(widgetId);
        widget.url = '/uploads/' + filename;

        var callbackUrl   = "/assignment/#/user/" + userId + "/website/" + websiteId + "/page/" + pageId + "/widget";

        res.redirect(callbackUrl);
    }


    function findWidgetsByPageId(req, res) {
        var pageId = req.params["pageId"];

        widgetModel
            .findAllWidgetsForPage(pageId)
            .then(function (widget) {
                res.send(widget);
            }, function (error) {
                res.status(404).send(error);
            });

        // var pagewidgets = [];
        // for (var w in widgets) {
        //     var widget = widgets[w];
        //     if (widget.pageId == pageId) {
        //         pagewidgets.push(widget);
        //     }
        // }
        // if(pagewidgets) {
        //     res.send(pagewidgets);
        // } else {
        //     res.status(404).send("Widgets not found for page: " + pageId);
        // }
    }

    function getWidgetById(widgetId) {
        for (var w in widgets) {
            var widget = widgets[w];
            if (widget._id == widgetId) {
                return widget;
            }
        }
        return null;
    }

    function findWidgetById(req, res) {
        var widgetId = req.params["widgetId"];

        widgetModel
            .findWidgetById(widgetId)
            .then(function (widget) {
                res.send(widget);
            }, function (error) {
                res.status(404).send(error);
            });

        // var widget = getWidgetById(widgetId);
        // if (widget != null) {
        //     res.send(widget);
        // } else {
        //     res.status(404).send({});
        // }
    }

    function updateWidget(req, res) {
        var widgetId = req.params["widgetId"];
        var newWidget = req.body;

        widgetModel
            .updateWidget(widgetId, newWidget)
            .then(function (widget) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            });

        // for (var w in widgets) {
        //     var widget = widgets[w];
        //     if (widget._id == widgetId) {
        //
        //         widgets[w].name = newWidget.name;
        //         widgets[w].description = newWidget.description;
        //         switch (newWidget.widgetType) {
        //             case "HEADING":
        //                 widgets[w].size = newWidget.size;
        //                 widgets[w].text= newWidget.text;
        //                 break;
        //             case "IMAGE":
        //                 widgets[w].width = newWidget.width;
        //                 widgets[w].url = newWidget.url;
        //                 break;
        //             case "YOUTUBE":
        //                 widgets[w].width = newWidget.width;
        //                 widgets[w].url = newWidget.url;
        //                 break;
        //             case "HTML":
        //                 widgets[w].text= newWidget.text;
        //                 break;
        //             default:
        //                 res.sendStatus(404);
        //                 return;
        //         }
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function sortWidget(req, res) {
        var pageId = req.params["pageId"];
        var startIndex = req.query['start'];
        var endIndex = req.query['end'];

        widgetModel
            .reorderWidget(pageId, startIndex, endIndex)
            .then(function (widget) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            });

        // var widget = widgets[startIndex];
        // widgets.splice(startIndex, 1);
        // widgets.splice(endIndex, 0, widget);
        // res.sendStatus(200);
    }

    function deleteWidget(req, res) {
        var widgetId = req.params["widgetId"];

        widgetModel
            .deleteWidget(widgetId)
            .then(function (widget) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            });

        // for (var w in widgets) {
        //     if (widgets[w]._id == widgetId) {
        //         widgets.splice(w, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

};