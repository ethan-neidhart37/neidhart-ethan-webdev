/**
 * Created by Ethan on 2/25/2017.
 */

module.exports = function (app) {
    app.post("/api/website/:websiteId/page", createPage);
    app.get("/api/website/:websiteId/page", findPagesByWebsiteId);
    app.get("/api/page/:pageId", findPageById);
    app.put("/api/page/:pageId", updatePage);
    app.delete("/api/page/:pageId", deletePage);

    var pages = [
        {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
        {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
        {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
    ];

    function createPage(req, res) {
        var websiteId = req.params["websiteId"];
        var newPage = req.body;
        newPage.websiteId = websiteId;
        newPage._id = (new Date()).getTime() + "";
        pages.push(newPage);
        res.json(newPage);
    }

    function findPagesByWebsiteId(req, res) {
        var websiteId = req.params["websiteId"];
        var webpages = [];
        for (var p in pages) {
            var page = pages[p];
            if (page.websiteId == websiteId) {
                webpages.push(page);
            }
        }
        if(sites) {
            res.send(sites);
        } else {
            res.sendStatus(404).send("Pages not found for website: " + websiteId);
        }
    }

    function findPageById(req, res) {
        var pageId = req.params["pageId"];
        for (var p in pages) {
            var page = pages[p];
            if (page._id == pageId) {
                res.send(page);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    function updatePage(req, res) {
        var pageId = req.params["pageId"];
        for (var p in pages) {
            var page = pages[p];
            if (page._id == pageId) {
                var newPage= req.body;
                pages[p].name = newPage.name;
                pages[p].description = newPage.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var pageId = req.params["pageId"];
        for (var p in pages) {
            if (pages[p]._id == pageId) {
                pages.splice(p, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

};