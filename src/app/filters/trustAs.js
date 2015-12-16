app.filter('trustAsHtml', ['$sce', function($sce) {
    return function(html) {
        return $sce.trustAsHtml(html);
    };
}]);

app.filter('trustAsUrl', ['$sce', function($sce) {
    return function(url) {
        return $sce.trustAsResourceUrl(url);
    };
}]);