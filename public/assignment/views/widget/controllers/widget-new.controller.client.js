/**
 * Created by Ethan on 2/15/2017.
 */

(function(){
    angular
        .module("WebAppMaker")
        .controller("NewWidgetController", NewWidgetController);

    function NewWidgetController($routeParams, WidgetService, $location) {
        var vm = this;
        vm.userId = $routeParams.uid;
        vm.websiteId = $routeParams.wid;
        vm.pageId = $routeParams.pid;
        vm.widgetId = $routeParams.wgid;
        vm.getEditorTemplateUrl = getEditorTemplateUrl;
        vm.createWidget = createWidget;


        function init() {
            WidgetService
                .findWidgetsByPageId(vm.pageId)
                .success(function (widgets) {
                    vm.widgets = widgets;
                })
                .error(function (err) {
                    vm.error = err;
                });
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-' + type + '-edit.view.client.html';
        }

        function createWidget(widget, type) {
            widget.widgetType = type;
            WidgetService
                .createWidget(vm.pageId, widget)
                .success(function (newWidget) {
                    $location.url("/user/" + vm.userId + "/website/" + vm.websiteId + "/page/" + vm.pageId + "/widget/" + newWidget._id);
                })
                .error(function (err) {
                    vm.error = err;
                });
        }
    }
})();
