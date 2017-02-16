/**
 * Created by Ethan on 2/15/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("ProfileController", ProfileController);

    function ProfileController($routeParams, UserService) {
        var vm = this;
        vm.userId = $routeParams['uid'];

        function init() {
            vm.user = UserService.findUserById(vm.userId);
        }
        init();

        vm.update = function (newUser) {
            var user = UserService.updateUser(vm.userId, newUser);
            if(user == null) {
                vm.error = "unable to update user";
            } else {
                vm.message = "user successfully updated"
            }
        };
    }
})();
