/**
 * Created by Ethan on 2/15/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("EditPageController", EditPageController);

    function EditPageController($routeParams, $location, PageService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.deletePage = deletePage;
        vm.updatePage = updatePage;

        function init() {
            PageService
                .findPagesByWebsiteId(vm.websiteId)
                .success(function (pages) {
                    vm.pages = pages;
                })
                .error(function (err) {
                    vm.err = err;
                });
            PageService
                .findPagesById(vm.pageId)
                .success(function (page) {
                    vm.page = page;
                })
                .error(function (err) {
                    vm.err = err;
                });
        }
        init();

        function updatePage(page) {
            PageService
                .updatePage(vm.pageId, page)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function () {
                    vm.error = "Could not update page.";
                });
        }

        function deletePage () {
            PageService
                .deletePage(vm.pageId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page");
                })
                .error(function () {
                    vm.error = "Could not delete page.";
                });
        }
    }
})();
