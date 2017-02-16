/**
 * Created by Ethan on 2/15/2017.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("UserService", UserService);
    function UserService() {
        var users = [
            {_id: "123", username: "alice", password: "alice", email: "alice@wonderland.com", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", email: "bob@marley.com", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", email: "charly@garcia.com", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", email: "jannunzi@gmail.com", firstName: "Jose", lastName: "Annunzi"}
        ];
        var api = {
            "createUser"            : createUser,
            "findUserById"          : findUserById,
            "findUserByUsername"    : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser"            : updateUser,
            "deleteUser"            : deleteUser
        };
        return api;

        function createUser(user) {
            user._id = (new Date()).getTime();
            users.push(user);
        }

        function findUserById(userId) {
            for (var u in users) {
                var user = users[u];
                if (user._id == userId) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByUsername(username) {
            for (var u in users) {
                var user = users[u];
                if (user.username == username) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function findUserByCredentials(username, password) {
            for (var u in users) {
                var user = users[u];
                if (user.username == username &&
                    user.password == password) {
                    return angular.copy(user);
                }
            }
            return null;
        }

        function updateUser(userId, newUser) {
            for (var u in users) {
                var user = users[u];
                if (user._id == userId) {
                    users[u].username = newUser.username;
                    users[u].email = newUser.email;
                    users[u].firstName = newUser.firstName;
                    users[u].lastName = newUser.lastName;
                    return user;
                }
            }
            return null;
        }

        function deleteUser(userId) {
            for (var u in users) {
                var user = users[u];
                if (user._id == userId) {
                    users.splice(u, 1);
                    return user;
                }
            }
            return null;
        }
    }
})();
