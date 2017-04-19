/**
 * Created by Ethan on 2/25/2017.
 */

module.exports = function (app, pageModel) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    function createPage(req, res) {
        var websiteId = req.params["websiteId"];
        var newPage = req.body;

        pageModel
            .createPage(websiteId, newPage)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.status(500).send(error);
            });

        // newPage.websiteId = websiteId;
        // newPage._id = (new Date()).getTime() + "";
        // pages.push(newPage);
        // res.json(newPage);
    }

    function findPagesByWebsiteId(req, res) {
        var websiteId = req.params["websiteId"];

        pageModel
            .findAllPagesForWebsite(websiteId)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.status(404).send(error);
            });

        // var webpages = [];
        // for (var p in pages) {
        //     var page = pages[p];
        //     if (page.websiteId == websiteId) {
        //         webpages.push(page);
        //     }
        // }
        // if(webpages) {
        //     res.send(webpages);
        // } else {
        //     res.status(404).send("Pages not found for website: " + websiteId);
        // }
    }

    function findPageById(req, res) {
        var pageId = req.params["pageId"];

        pageModel
            .findPageById(pageId)
            .then(function (page) {
                res.json(page);
            }, function (error) {
                res.status(404).send(error);
            });

        // for (var p in pages) {
        //     var page = pages[p];
        //     if (page._id == pageId) {
        //         res.send(page);
        //         return;
        //     }
        // }
        // res.status(404).send({});
    }

    function updatePage(req, res) {
        var pageId = req.params["pageId"];
        var newPage= req.body;

        pageModel
            .updatePage(pageId, newPage)
            .then(function (page) {
                res.sendStatus(200)
            }, function (error) {
                res.sendStatus(404);
            });

        // for (var p in pages) {
        //     var page = pages[p];
        //     if (page._id == pageId) {
        //         var newPage= req.body;
        //         pages[p].name = newPage.name;
        //         pages[p].description = newPage.description;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pageId = req.params["pageId"];

        pageModel
            .deletePage(pageId)
            .then(function (page) {
                res.sendStatus(200)
            }, function (error) {
                res.sendStatus(404);
            });

        // for (var p in pages) {
        //     if (pages[p]._id == pageId) {
        //         pages.splice(p, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

};