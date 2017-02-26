/**
 * Created by Ethan on 2/15/2017.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("PageService", PageService);
    function PageService() {
        var pages = [
            {"_id": "321", "name": "Post 1", "websiteId": "456", "description": "Lorem"},
            {"_id": "432", "name": "Post 2", "websiteId": "456", "description": "Lorem"},
            {"_id": "543", "name": "Post 3", "websiteId": "456", "description": "Lorem"}
        ];
        var api = {
            "createPage"           : createPage,
            "findPagesByWebsiteId" : findPagesByWebsiteId,
            "findPageById"         : findPageById,
            "updatePage"           : updatePage,
            "deletePage"           : deletePage
        };
        return api;

        function createPage(websiteId, page) {
            return $http.post("/api/website/" + websiteId + "/page", page);
        }

        function findPagesByWebsiteId(websiteId) {
            return $http.get("/api/website/" + websiteId + "/page");
        }

        function findPageById(pageId) {
            return $http.get("/api/page/" + pageId);
        }

        function updatePage(pageId, newPage) {
            return $http.put("/api/page/" + pageId, newPage);
        }

        function deletePage(pageId) {
            return $http.delete("/api/page/" + pageId);
    }
})();
