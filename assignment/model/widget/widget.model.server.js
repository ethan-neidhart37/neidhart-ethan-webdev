/**
 * Created by Ethan on 3/22/2017.
 */

module.exports = function (mongoose, PageModel) {
    var api = {
        createWidget: createWidget,
        findAllWidgetsForPage: findAllWidgetsForPage,
        findWidgetById: findWidgetById,
        updateWidget: updateWidget,
        deleteWidget: deleteWidget,
        reorderWidget: reorderWidget
    };

    var WidgetSchema = require('./widget.schema.server')(mongoose);
    var WidgetModel = mongoose.model('WidgetModel', WidgetSchema);

    return api;

    function createWidget(pageId, widget) {
        var page = PageModel.findPageById(pageId);
        page.widgets.push(widget);
        PageModel.updatePage(pageId, page);

        return WidgetModel.create(widget);
    }

    function findAllWidgetsForPage(pageId) {
        return WidgetModel.find({_page: pageId});
    }

    function findWidgetById(widgetId) {
        return WidgetModel.findById(widgetId);
    }

    function updateWidget(widgetId, widget) {
        return WidgetModel.update({_id: widgetId}, widget);
    }

    function deleteWidget(widgetId) {
        return WidgetModel.remove({_id: widgetId});
    }

    function reorderWidget(pageId, start, end) {
        var page = PageModel.findPageById(pageId);
        var widget = page.widgets[start];
        page.widgets.splice(start, 1);
        page.widgets.splice(end, 0, widget);
        PageModel.updatePage(pageId, page);
    }
};
