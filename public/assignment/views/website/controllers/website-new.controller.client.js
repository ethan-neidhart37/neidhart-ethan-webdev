/**
 * Created by Ethan on 2/15/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWebsiteController", NewWebsiteController);

    function NewWebsiteController($routeParams, $location, WebsiteService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createWebsite = createWebsite;

        function init() {
            WebsiteService
                .findWebsitesByUser(vm.userId)
                .success(function (websites) {
                    vm.websites = websites;
                })
                .error(function (err) {
                    vm.error = err;
                });
        }
        init();

        function createWebsite (website) {
            WebsiteService
                .createWebsite(vm.userId, website)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website");
                })
                .error(function () {
                    vm.error = "Could not create website.";
                });
        }
    }
})();
