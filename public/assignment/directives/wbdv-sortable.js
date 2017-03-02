/**
 * Created by Ethan on 3/1/2017.
 */

(function() {
    angular
        .module("WebAppMaker")
        .directive("wbdvSortable", makeSortable);

    function makeSortable($routeParams, $http) {
        var pageId = $routeParams.pid;

        function linkFunc(scope, element, attributes) {
            var startIndex = -1;
            var endIndex = -1;
            element.sortable({
                axis: 'y',
                start: function(event, ui) {
                    startIndex = ui.item.index();
                },
                stop: function(event, ui) {
                    endIndex = ui.item.index();
                    $http.put("/api/page/" + pageId + "/widget?initial=" + startIndex + "&final=" + endIndex);
                }
            });
        }
        return {link: linkFunc};
    }
})();