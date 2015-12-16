app.directive('navG', ['datasSce', function(datasSce) {
    return {
		restrict: 'A',
		link: function (scope, elm, attrs) {

			datasSce.getNavG().then(function(datas) {
				scope.nav = datas;
			});

		},
        templateUrl: config.inc + 'nav-g.html',
        replace: false
    };
}]);