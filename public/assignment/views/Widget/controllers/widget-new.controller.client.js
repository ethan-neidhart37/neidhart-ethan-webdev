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
            vm.widget = WidgetService.findWidgetById(vm.widgetId);
        }
        init();

        function getEditorTemplateUrl(type) {
            return 'views/widget/templates/editors/widget-'+type+'-editor.view.client.html';
        }

        function createWidget(widget, type) {
            widget.widgetType = type;
            var id = WidgetService.createWidget(vm.pageId, widget);
            $location.url("/user/"+vm.userId+"/website/"+vm.websiteId+"/page/"+vm.pageId+"/widget/"+id);
        }
    }
})();
