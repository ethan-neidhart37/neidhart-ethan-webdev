/**
 * Created by Ethan on 2/25/2017.
 */

module.exports = function (app) {
    app.post("api/website/:websiteId/page", createPage);
    app.get("api/website/:websiteId/page", findPagesByWebsiteId);
    app.get("api/page/:pageId", findPageById);
    app.put("api/page/:pageId", updatePage);
    app.delete("api/page/:pageId", deletePage);

    var websites = [
        {"_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem"}
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
            if (page.developerId == websiteId) {
                webpages.push(page);
            }
        }
        if(sites) {
            res.send(sites);
        } else {
            res.sendStatus(404).send("Pages not found for user: " + userId);
        }
    }

    function findPageById(req, res) {
        var websiteId = req.params["websiteId"];
        for (var w in websites) {
            var website = websites[w];
            if (website._id == websiteId) {
                res.send(website);
                return;
            }
        }
        res.sendStatus(404).send({});
    }

    function updatePage(req, res) {
        var websiteId = req.params["websiteId"];
        for (var w in websites) {
            var website = websites[w];
            if (website._id == websiteId) {
                var newPage = req.body;
                websites[w].name = newPage.name;
                websites[w].description = newPage.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deletePage(req, res) {
        var websiteId = req.params["websiteId"];
        for (var w in websites) {
            if (websites[w]._id == websiteId) {
                websites.splice(w, 1);
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

};