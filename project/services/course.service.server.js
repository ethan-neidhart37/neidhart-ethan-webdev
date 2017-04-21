/**
 * Created by Ethan on 4/21/2017.
 */

module.exports = function (app, CourseModel) {
    app.post("/api/user/:userId/course", createCourse);
    app.get("/api/user/:userId/course", findCoursesByUser);
    app.get("/api/course/:courseId", findCourseById);
    app.put("/api/course/:courseId", updateCourse);
    app.delete("/api/course/:courseId", deleteCourse);

    function createCourse(req, res) {
        var userId = req.params["userId"];
        var newCourse = req.body;

        CourseModel
            .createCourseForUser(userId, newCourse)
            .then(function (course) {
                res.json(course);
            }, function (error) {
                res.status(500).send(error);
            });
    }

    function findCoursesByUser(req, res) {
        var userId = req.params["userId"];

        CourseModel
            .findAllCoursesForUser(userId)
            .then(function (sites) {
                res.send(sites);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function findCourseById(req, res) {
        var courseId = req.params["courseId"];

        CourseModel
            .findCourseById(courseId)
            .then(function (course) {
                res.send(course);
            }, function (error) {
                res.status(404).send(error);
            });
    }

    function updateCourse(req, res) {
        var courseId = req.params["courseId"];
        var newCourse = req.body;

        CourseModel
            .updateCourse(courseId, newCourse)
            .then(function (course) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            });
    }

    function deleteCourse(req, res) {
        var courseId = req.params["courseId"];

        CourseModel
            .deleteCourse(courseId)
            .then(function (course) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            });
    }

};