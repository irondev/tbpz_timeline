var app;
var documentHeight = document.documentElement.clientHeight;
var documentScroll = window.pageYOffset;
var timelineId = document.body.attributes['data-timelineId'].value;

(function() {
	
	app = angular.module('app', ['ngSanitize', 'ngTouch', 'duScroll']);

	app.run(['$rootScope', function($scope) {			

		$scope.appReady = false;
		$scope.config = config;
		$scope.timelineId = timelineId;

		$scope.documentHeight = documentHeight;
		angular.element(window).bind('resize', function() {
		    documentHeight = document.documentElement.clientHeight;
		    $scope.documentHeight = documentHeight;
		    $scope.$apply();
		});

		angular.element(window).bind('scroll', function() {
		    documentScroll = window.pageYOffset;
		});

		$scope.isNavigating = false;
		$scope.toggleNav = function() {
			$scope.isNavigating = $scope.isNavigating ? false : true;
		};

		$scope.skipCover = function() {
			jQuery("html, body").animate({scrollTop:documentHeight - 55}, 'slow');
		};

		$scope.backToTop = function($event) {
			if (documentScroll > 0) {
				jQuery("html, body").animate({scrollTop:0}, 'slow');
				$event.preventDefault();
			}	
		};
		
	}]);

})();