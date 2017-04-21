/**
 * Created by Ethan on 4/21/2017.
 */

(function(){
    angular
        .module("ClassScheduler")
        .controller("EditCourseController", EditCourseController);

    function EditCourseController($routeParams, $location, CourseService) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.courseId = $routeParams.cid;
        vm.deleteCourse = deleteCourse;
        vm.updateCourse = updateCourse;

        function init() {
            CourseService
                .findCoursesByUser(vm.userId)
                .success(function (courses) {
                    vm.courses = courses;
                })
                .error(function (err) {
                    vm.error = err;
                });
            CourseService
                .findCourseById(vm.courseId)
                .success(function (course) {
                    vm.course = course;
                })
                .error(function (err) {
                    vm.error = err;
                });
        }
        init();

        function updateCourse(course) {
            CourseService
                .updateCourse(vm.courseId, course)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/course");
                })
                .error(function () {
                    vm.error = "Could not update course.";
                });
        }

        function deleteCourse () {
            CourseService
                .deleteCourse(vm.courseId)
                .success(function () {
                    $location.url("/user/"+vm.userId+"/course");
                })
                .error(function () {
                    vm.error = "Could not delete course.";
                });
        }
    }
})();