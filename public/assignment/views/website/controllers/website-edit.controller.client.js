/**
 * Created by Ethan on 2/15/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("EditWebsiteController", EditWebsiteController);

    function EditWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.deleteWebsite = deleteWebsite;
        vm.updateWebsite = updateWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (err) {
                    vm.error = err;
                });
            WebsiteService
                .findWebsiteById(vm.websiteId)
                .success(function (website) {
                    vm.website = website;
                })
                .error(function (err) {
                    vm.error = err;
                });
        }
        init();

        function updateWebsite(website) {
            WebsiteService
                .updateWebsite(vm.websiteId, website)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.error = "Could not update website.";
                });
        }

        function deleteWebsite () {
            WebsiteService
                .deleteWebsite(vm.websiteId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.error = "Could not delete website.";
                });
        }
    }
})();
