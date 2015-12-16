app.service('datasSce', function($http) {
    var promise = {};
    return {
        getTimeline: function() {
            if (!promise['albums']) {
                promise['albums'] = $http.get(config.timelineApiUrl).then(function(res) {
                    return res.data;
                });
            }
            return promise['albums'];
        },
        getNavG: function() {
            if (!promise['nav']) {
                promise['nav'] = $http.get(config.navApiUrl).then(function(res) {
                    return res.data;
                });
            }
            return promise['nav'];
        }
    };
});