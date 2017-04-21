/**
 * Created by Ethan on 4/21/2017.
 */

(function(){
    angular
        .module("ClassScheduler")
        .controller("CourseListController", CourseListController);

    function CourseListController($routeParams, CourseService) {
        var vm = this;
        vm.userId = $routeParams.uid;

        function init() {
            CourseService
                .findCoursesByUser(vm.userId)
                .success(function (courses) {
                    vm.courses = courses;
                })
                .error(function (err) {
                    vm.error = err;
                });
        }
        init();
    }
})();