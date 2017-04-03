/**
 * Created by Ethan on 3/22/2017.
 */

var q = require("q");
module.exports = function (mongoose) {
    var api = {
        createUser: createUser,
        findUserById: findUserById,
        findUserByUsername: findUserByUsername,
        findUserByCredentials: findUserByCredentials,
        updateUser: updateUser,
        deleteUser: deleteUser
    };

    var UserSchema = require('./user.schema.server')(mongoose);
    var UserModel = mongoose.model('UserModel', UserSchema);

    return api;

    function createUser(user) {
        console.log("Create DB: ");
        console.log(user);

        var deferred = q.defer();
        UserModel.create(user, function (err, usr) {
                deferred.resolve(usr);
        });

        return deferred.promise;
    }

    function findUserById(userId) {
        var deferred = q.defer();
        UserModel.findById(userId, function (err, user) {
            deferred.resolve(user);
        });
        return deferred.promise;
    }

    function findUserByUsername(username) {
        var deferred = q.defer();
        console.log("Find DB: ");
        console.log(username);
        UserModel.find({username: username}, function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function findUserByCredentials(username, password) {
        var deferred = q.defer();
        UserModel.find({username: username, password: password}, function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }

    function updateUser(userId, user) {
        var deferred = q.defer();
        UserModel.findByIdAndUpdate(userId, {$set: {username: user.username, password: user.password, firstName: user.firstName, lastName: user.lastName, email: user.email, phone: user.phone, websites: user.websites, dateCreated: user.dateCreated}}, function (err, user) {
            UserModel.findById(userId, function (err, user) {
                deferred.resolve(user);
            });
        });
        return deferred.promise;
    }

    function deleteUser(userId) {
        var deferred = q.defer();
        UserModel.remove({_id: userId}, function (err, result) {
            deferred.resolve(result);
        });
        return deferred.promise;
    }
};
