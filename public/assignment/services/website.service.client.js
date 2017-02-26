/**
 * Created by Ethan on 2/15/2017.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WebsiteService", WebsiteService);
    function WebsiteService($http) {
        var websites = [
            {"_id": "123", "name": "Facebook",    "developerId": "456", "description": "Lorem"},
            {"_id": "234", "name": "Tweeter",     "developerId": "456", "description": "Lorem"},
            {"_id": "456", "name": "Gizmodo",     "developerId": "456", "description": "Lorem"},
            {"_id": "567", "name": "Tic Tac Toe", "developerId": "123", "description": "Lorem"},
            {"_id": "678", "name": "Checkers",    "developerId": "123", "description": "Lorem"},
            {"_id": "789", "name": "Chess",       "developerId": "234", "description": "Lorem"}
        ];
        var api = {
            "createWebsite"      : createWebsite,
            "findWebsitesByUser" : findWebsitesByUser,
            "findWebsiteById"    : findWebsiteById,
            "updateWebsite"      : updateWebsite,
            "deleteWebsite"      : deleteWebsite
        };
        return api;

        function createWebsite(userId, website) {
            return $http.post("/api/user/" + userId + "/website", website);
        }

        function findWebsitesByUser(userId) {
            return $http.get("/api/user/" + userId + "/website");
        }

        function findWebsiteById(websiteId) {
            return $http.get("/api/website/" + websiteId);
        }

        function updateWebsite(websiteId, newWebsite) {
            return $http.put("/api/website/" + websiteId, newWebsite);
        }

        function deleteWebsite(websiteId) {
            return $http.delete("/api/website/" + websiteId);
        }
    }
})();
