/**
 * Created by eneid on 4/20/2017.
 */

(function () {
    angular
        .module("ClassScheduler")
        .config(configuration);

    function configuration($routeProvider) {
        $routeProvider

            // User
            .when("default",{
                templateUrl: 'views/home.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when("/",{
                templateUrl: 'views/home.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when("/home",{
                templateUrl: 'views/home.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when("/login",{
                templateUrl: 'views/user/templates/login.view.client.html',
                controller: 'LoginController',
                controllerAs: 'model'
            })
            .when("/register",{
                templateUrl: 'views/user/templates/register.view.client.html',
                controller: 'RegisterController',
                controllerAs: 'model'
            })
            .when("/user/:uid",{
                templateUrl: 'views/user/templates/profile.view.client.html',
                controller: 'ProfileController',
                controllerAs: 'model'
            })

            // Course
            .when("course",{
                templateUrl: 'views/course/templates/course-list.controller.client.html',
                controller: 'CourseListController',
                controllerAs: 'model'
            })
            .when("course/new",{
                templateUrl: 'views/course/templates/course-new.controller.client.html',
                controller: 'NewCourseController',
                controllerAs: 'model'
            })
            .when("user/:uid/course",{
                templateUrl: 'views/course/templates/course-list.controller.client.html',
                controller: 'CourseListController',
                controllerAs: 'model'
            })
            .when("user/:uid/course/new",{
                templateUrl: 'views/course/templates/course-new.controller.client.html',
                controller: 'NewCourseController',
                controllerAs: 'model'
            })
            .when("user/:uid/course/:cid",{
                templateUrl: 'views/course/templates/course-details.controller.client.html',
                controller: 'CourseDetailsController',
                controllerAs: 'model'
            })
            .when("user/:uid/course/:cid/edit",{
                templateUrl: 'views/course/templates/course-edit.controller.client.html',
                controller: 'CourseEditController',
                controllerAs: 'model'
            });
    }
})();