/**
 * Created by Ethan on 2/25/2017.
 */

module.exports = function (app, userModel) {
    app.post("/api/user", createUser);
    app.get("/api/user", findUser);
    app.get("/api/user/:userId", findUserById);
    app.put("/api/user/:userId", updateUser);
    app.delete("/api/user/:userId", deleteUser);

    function createUser(req, res) {
        var newUser = req.body;

        userModel
            .createUser(newUser)
            .then(function(user) {
                res.json(user);
            }, function(error) {
                res.status(500).send(error);
            });

        //newUser._id = (new Date()).getTime() + "";
        //users.push(newUser);
        //res.json(newUser);
    }

    function findUser(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];
        if(username && password) {
            findUserByCredentials(req, res);
        } else if(username) {
            findUserByUsername(req, res);
        }
    }

    function findUserByCredentials(req, res) {
        var username = req.query['username'];
        var password = req.query['password'];

        userModel
            .findUserByCredentials(username, password)
            .then(function(user) {
                res.send(user);
            }, function(error) {
                res.status(404).send(error);
            });

        // var user = users.find(function (user) {
        //     return user.username == username && user.password == password;
        // });
        // if(user) {
        //     res.send(user);
        // } else {
        //     res.status(404).send("User not found for username: " + username + " and password: " + password);
        // }
    }

    function findUserByUsername(req, res) {
        var username = req.query['username'];

        userModel
            .findUserByUsername(username)
            .then(function(user) {
                res.send(user);
            }, function(error) {
                res.status(404).send(error);
            });

        // var user = users.find(function (user) {
        //     return user.username == username;
        // });
        // if(user) {
        //     res.send(user);
        // } else {
        //     res.status(404).send("User not found for username: " + username);
        // }
    }

    function findUserById(req, res) {
        var userId = req.params['userId'];

        userModel
            .findUserById(userId)
            .then(function(user) {
                res.send(user);
            }, function(error) {
                res.status(404).send(error);
            });

        // for (var u in users) {
        //     var user = users[u];
        //     if (user._id == userId) {
        //         res.send(user);
        //         return;
        //     }
        // }
        // res.status(404).send({});
    }

    function updateUser(req, res) {
        var userId = req.params["userId"];
        var newUser = req.body;

        userModel
            .updateUser(userId, newUser)
            .then(function(status) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            });

        // for (var u in users) {
        //     var user = users[u];
        //     if (user._id == userId) {
        //         var newUser = req.body;
        //         users[u].username = newUser.username;
        //         users[u].email = newUser.email;
        //         users[u].firstName = newUser.firstName;
        //         users[u].lastName = newUser.lastName;
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }

    function deleteUser(req, res) {
        var userId = req.params['userId'];

        userModel.deleteUser(userId)
            .then(function (status) {
                res.sendStatus(200);
            }, function (error) {
                res.sendStatus(404);
            });

        // for (var u in users) {
        //     if (users[u]._id == userId) {
        //         users.splice(u, 1);
        //         res.sendStatus(200);
        //         return;
        //     }
        // }
        // res.sendStatus(404);
    }
};
