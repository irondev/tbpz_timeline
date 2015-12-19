var app;
var documentWidth = document.documentElement.clientWidth;
var documentHeight = document.documentElement.clientHeight;
var documentScroll = window.pageYOffset;
var timelineId = document.body.attributes['data-timelineId'].value;console.log("timelineId:", timelineId);

(function() {
	
	app = angular.module('app', ['ngSanitize', 'ngTouch', 'duScroll']);

	app.run(['$rootScope', function($scope) {			

		$scope.appReady = false;
		$scope.config = config;
		$scope.timelineId = timelineId;

		$scope.documentHeight = documentHeight;
	    if (documentWidth < 768) {
	    	$scope.inApp = true;
	    } else {
	    	$scope.inApp = false;
	    }
		angular.element(window).bind('resize', function() {
			documentWidth = document.documentElement.clientWidth;
		    documentHeight = document.documentElement.clientHeight;
		    $scope.documentHeight = documentHeight;
		    if (documentWidth < 768) {
		    	$scope.inApp = true;
		    } else {
		    	$scope.inApp = false;
		    }
		    $scope.$apply();
		});

		angular.element(window).bind('scroll', function() {
		    documentScroll = window.pageYOffset;
		    $scope.documentScroll = documentScroll;
		    $scope.$apply();
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