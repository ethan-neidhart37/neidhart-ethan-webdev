/**
 * Created by Ethan on 3/22/2017.
 */

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
        return UserModel.create(user);
    }

    function findUserById(userId) {
        return UserModel.findById(userId);
    }

    function findUserByUsername(username) {
        return UserModel.find({username: username});
    }

    function findUserByCredentials(username, password) {
        return UserModel.find({username: username, password: password});
    }

    function updateUser(userId, user) {
        return UserModel.update({_id: userId}, user);
    }

    function deleteUser(userId) {
        return UserModel.remove({_id: userId});
    }
};
