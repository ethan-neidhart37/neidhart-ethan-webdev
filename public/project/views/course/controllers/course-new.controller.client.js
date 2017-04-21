/**
 * Created by Ethan on 4/21/2017.
 */

(function(){
    angular
        .module("ClassScheduler")
        .controller("NewCourseController", NewCourseController);

    function NewCourseController($routeParams, $location, CourseService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.createCourse = createCourse;

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

        function createCourse (course) {
            CourseService
                .createCourse(vm.userId, course)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/course");
                })
                .error(function () {
                    vm.error = "Could not create course.";
                });
        }
    }
})();