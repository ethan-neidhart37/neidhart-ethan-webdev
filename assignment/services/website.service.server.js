/**
 * Created by Ethan on 2/25/2017.
 */

module.exports = function (app) {
    app.post("/api/user/:userId/website", createWebsite);
    app.get("/api/user/:userId/website", findWebsitesByUser);
    app.get("/api/website/:websiteId", findWebsiteById);
    app.put("/api/website/:websiteId", updateWebsite);
    app.delete("/api/website/:websiteId", deleteWebsite);

    var websites = [
        {"_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem"},
        {"_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem"},
        {"_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem"},
        {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
        {"_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem"},
        {"_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem"}
    ];

    function createWebsite(req, res) {
        var userId = req.params["userId"];
        var newWebsite = req.body;
        newWebsite.developerId = userId;
        newWebsite._id = (new Date()).getTime() + "";
        websites.push(newWebsite);
        res.json(newWebsite);
    }

    function findWebsitesByUser(req, res) {
        var userId = req.params["userId"];
        var sites = [];
        for (var w in websites) {
            var website = websites[w];
            if (website.developerId == userId) {
                sites.push(website);
            }
        }
        if(sites) {
            res.send(sites);
        } else {
            res.status(404).send("Websites not found for user: " + userId);
        }
    }

    function findWebsiteById(req, res) {
        var websiteId = req.params["websiteId"];
        for (var w in websites) {
            var website = websites[w];
            if (website._id == websiteId) {
                res.send(website);
                return;
            }
        }
        res.status(404).send({});
    }

    function updateWebsite(req, res) {
        var websiteId = req.params["websiteId"];
        for (var w in websites) {
            var website = websites[w];
            if (website._id == websiteId) {
                var newWebsite = req.body;
                websites[w].name = newWebsite.name;
                websites[w].description = newWebsite.description;
                res.sendStatus(200);
                return;
            }
        }
        res.sendStatus(404);
    }

    function deleteWebsite(req, res) {
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