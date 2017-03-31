/**
 * Created by Ethan on 3/22/2017.
 */

module.exports = function (mongoose, WebsiteModel) {
    var api = {
        createPage: createPage,
        findAllPagesForWebsite: findAllPagesForWebsite,
        findPageById: findPageById,
        updatePage: updatePage,
        deletePage: deletePage
    };

    var PageSchema = require('./page.schema.server')();
    var PageModel = mongoose.model('PageModel', PageSchema);

    return api;

    function createPage(websiteId, page) {
        var website = WebsiteModel.findWebsiteById(websiteId);
        website.pages.push(page);
        WebsiteModel.updateWebsite(websiteId, website);

        return PageModel.create(page);
    }

    function findAllPagesForWebsite(websiteId) {
        return PageModel.find({_website: websiteId});
    }

    function findPageById(pageId) {
        return PageModel.findById(pageId);
    }

    function updatePage(pageId, page) {
        return PageModel.update({_id: pageId}, page);
    }

    function deletePage(pageId) {
        return PageModel.remove({_id: pageId});
    }
};
