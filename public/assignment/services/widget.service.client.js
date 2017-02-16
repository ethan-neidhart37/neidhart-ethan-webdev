/**
 * Created by Ethan on 2/15/2017.
 */

(function() {
    angular
        .module("WebAppMaker")
        .factory("WidgetService", WidgetService);
    function WidgetService() {
        var widgets = [
            { "_id": "123", "widgetType": "HEADING", "pageId": "321", "size": 2, "text": "GIZMODO"},
            { "_id": "234", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "345", "widgetType": "IMAGE", "pageId": "321", "width": "100%",
                "url": "http://lorempixel.com/400/200/"},
            { "_id": "456", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"},
            { "_id": "567", "widgetType": "HEADING", "pageId": "321", "size": 4, "text": "Lorem ipsum"},
            { "_id": "678", "widgetType": "YOUTUBE", "pageId": "321", "width": "100%",
                "url": "https://youtu.be/AM2Ivdi9c4E" },
            { "_id": "789", "widgetType": "HTML", "pageId": "321", "text": "<p>Lorem ipsum</p>"}
        ];
        var api = {
            "createWidget"        : createWidget,
            "findWidgetsByPageId" : findWidgetsByPageId,
            "findWidgetById"      : findWidgetById,
            "updateWidget"        : updateWidget,
            "deleteWidget"        : deleteWidget
        };
        return api;

        function createWidget(pageId, widget) {
            widget.pageId = pageId;
            widgets.push(widget);
        }

        function findWidgetsByPageId(pageId) {
            var pagewidgets = [];
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget.pageId === pageId) {
                    pagewidgets.push(widget);
                }
            }
            return angular.copy(pagewidgets);
        }

        function findWidgetById(widgetId) {
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget._id === widgetId) {
                    return angular.copy(widget);
                }
            }
            return null;
        }

        function updateWidget(widgetId, newWidget) {
            for (var w in widgets) {
                var widget = widgets[p];
                if (widget._id === widgetId) {
                    widgets[w] = newWidget;
                    widgets[w]._id = widgetId;
                    return widget;
                }
            }
            return null;
        }

        function deleteWidget(widgetId) {
            for (var w in widgets) {
                var widget = widgets[w];
                if (widget._id === widgetId) {
                    widgets.splice(w, 1);
                    return widget;
                }
            }
            return null;
        }
    }
})();
