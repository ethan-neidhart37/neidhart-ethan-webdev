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

            function register(user, verify) {
                if (user.password === verify) {
                    UserService
                        .findUserByUsername(user.username)
                        .success(function (foundUser) {
                            if (foundUser && foundUser.length === 0) {
                                addUser(user);
                            } else {
                                vm.error = "That username is already taken.";
                            }
                        })
                        .error(function() {
                            addUser(user);
                        });
                } else {
                    vm.error = "Password fields must match."
                }
            }

            function addUser(user) {
                UserService
                    .createUser(user)
                    .success(function(user) {
                        $location.url('/user/' + user._id);
                    })
                    .error(function() {
                        vm.error = "Could not register user.";
                    });
            }
        }
})();
