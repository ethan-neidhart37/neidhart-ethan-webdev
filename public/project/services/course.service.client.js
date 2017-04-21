/**
 * Created by Ethan on 4/21/2017.
 */

(function() {
    angular
        .module("ClassScheduler")
        .factory("CourseService", CourseService);
    function CourseService($http) {

        var api = {
            "createCourse"      : createCourse,
            "findCoursesByUser" : findCoursesByUser,
            "findCourseById"    : findCourseById,
            "updateCourse"      : updateCourse,
            "deleteCourse"      : deleteCourse
        };
        return api;

        function createCourse(userId, course) {
            return $http.post("/api/user/" + userId + "/course", course);
        }

        function findCoursesByUser(userId) {
            return $http.get("/api/user/" + userId + "/course");
        }

        function findCourseById(courseId) {
            return $http.get("/api/course/" + courseId);
        }

        function updateCourse(courseId, newCourse) {
            return $http.put("/api/course/" + courseId, newCourse);
        }

        function deleteCourse(courseId) {
            return $http.delete("/api/course/" + courseId);
        }
    }
})();