/**
 * Created by Ethan on 2/15/2017.
 */

(function() {
    angular
        .module("WebAppMaker")
        .controller("RegisterController", RegisterController);

        function RegisterController(UserService, $location) {
            var vm = this;
            vm.register = register;

            function register(user) {
                UserService
                    .findUserByUsername(user.username)
                    .success(function (user) {
                        vm.error = "That username is already taken.";
                    })
                    .error(function() {
                        UserService
                            .createUser(user)
                            .success(function(user) {
                                $location.url('/user/' + user._id);
                            })
                            .error(function() {
                                vm.error = "Could not register user.";
                            });
                    });
            }
        }
})();
