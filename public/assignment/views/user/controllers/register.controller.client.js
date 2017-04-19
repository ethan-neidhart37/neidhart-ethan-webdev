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
                    .success(function (foundUser) {
                        console.log("Find User: ");
                        console.log(foundUser);
                        if (foundUser && foundUser.length === 0) {
                            console.log("Empty list");
                            addUser(user);
                        } else {
                            console.log("Not an empty list");
                            vm.error = "That username is already taken.";
                        }
                    })
                    .error(function() {
                        addUser(user);
                    });
            }

            function addUser(user) {
                UserService
                    .createUser(user)
                    .success(function(user) {
                        console.log("Create User: ");
                        console.log(user);

                        $location.url('/user/' + user._id);
                    })
                    .error(function() {
                        vm.error = "Could not register user.";
                    });
            }
        }
})();
