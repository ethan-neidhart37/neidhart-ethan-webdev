/**
 * Created by Ethan on 3/22/2017.
 */

var q = require("q");
module.exports = function (mongoose, UserModel) {
    var api = {
        createWebsiteForUser: createWebsiteForUser,
        findAllWebsitesForUser: findAllWebsitesForUser,
        findWebsiteById: findWebsiteById,
        updateWebsite: updateWebsite,
        deleteWebsite: deleteWebsite
    };

    var WebsiteSchema = require('./website.schema.server')(mongoose);
    var WebsiteModel = mongoose.model('WebsiteModel', WebsiteSchema);

    return api;

    function createWebsiteForUser(userId, website) {
        var deferred = q.defer();
        website._user = userId;

        //UserModel.addWebsiteToUser(userId, website._)
        
        WebsiteModel.create(website, function (err, web) {
            UserModel
                .addWebsiteToUser(userId, web._id)
                .then(function (user) {
                    console.log(user);
                });
            deferred.resolve(web);
        });
        return deferred.promise;
    }
    
    function findAllWebsitesForUser(userId) {
        var deferred = q.defer();
        WebsiteModel.find({_user: userId}, function (err, web) {
            deferred.resolve(web);
        });
        return deferred.promise;
    }

    function findWebsiteById(websiteId) {
        var deferred = q.defer();
        WebsiteModel.findById(websiteId, function (err, web) {
            deferred.resolve(web);
        });
        return deferred.promise;
    }

    function updateWebsite(websiteId, website) {
        var deferred = q.defer();
        WebsiteModel.findByIdAndUpdate(websiteId, {$set: {name: website.name, description: website.description}}, function (err, web) {
            WebsiteModel.findById(websiteId, function (err, web) {
                deferred.resolve(web);
            });
        });
        return deferred.promise;
    }

    function deleteWebsite(websiteId) {
        var deferred = q.defer();
        WebsiteModel.remove({_id: websiteId}, function (err, web) {
            deferred.resolve(web);
        });
        return deferred.promise;
    }
};
