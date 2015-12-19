app.service('datasSce', function($http) {
    var promise = {};
    return {
        getTimeline: function() {
            if (!promise['events']) {
                promise['events'] = $http.get(config.timelineApiUrl.replace("{{timelineId}}", timelineId)).then(function(res) {
                    return res.data;
                });
            }
            return promise['events'];
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