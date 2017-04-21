/**
 * Created by Ethan on 4/21/2017.
 */

(function () {
    angular
        .module("ClassScheduler")
        .factory("UserService", UserService);

    function UserService($http) {
        var users = [
            {_id: "123", username: "alice", password: "alice", email: "alice@wonderland.com", firstName: "Alice", lastName: "Wonder"},
            {_id: "234", username: "bob", password: "bob", email: "bob@marley.com", firstName: "Bob", lastName: "Marley"},
            {_id: "345", username: "charly", password: "charly", email: "charly@garcia.com", firstName: "Charly", lastName: "Garcia"},
            {_id: "456", username: "jannunzi", password: "jannunzi", email: "jannunzi@gmail.com", firstName: "Jose", lastName: "Annunzi"}
        ];

        var api = {
            "createUser"            : createUser,
            "findAllUsers"          : findAllUsers,
            "findUserById"          : findUserById,
            "findUserByUsername"    : findUserByUsername,
            "findUserByCredentials" : findUserByCredentials,
            "updateUser"            : updateUser,
            "deleteUser"            : deleteUser
        };
        return api;

        function createUser(user) {
            return $http.post("/api/user", user);
        }

        function findAllUsers() {
            return $http.get("/api/user");
        }

        function findUserById(userId) {
            return $http.get("/api/user/" + userId);
        }

        function findUserByUsername(username) {
            return $http.get("/api/user?username=" + username);
        }

        function findUserByCredentials(username, password) {
            return $http.get("/api/user?username=" + username + "&password=" + password);
        }

        function updateUser(userId, newUser) {
            return $http.put("/api/user/" + userId, newUser);
        }

        function deleteUser(userId) {
            return $http.delete("/api/user/" + userId);
        }
    }
});