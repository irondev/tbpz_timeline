(function() {

	app.controller('TimelineCtrl', function($scope, $rootScope, $document, $timeout, $q, datasSce, imgCacheSce) {

		var timestamps = [],
			timestampMin,
			timestampMax,
			navTop,
			items,
			dataPromise = {},
			documentHeight = $document.height(),
			documentWidth = $document.width(),
			scrollTop = $document.scrollTop();

		dataPromise = datasSce.getTimeline(timelineId).then(function(datas) {
			datas.reverse();
			$scope.timeline = datas[0];console.log("timeline:", $scope.timeline);
			datas.splice(0, 1);
			$scope.events = datas;console.log("events:", $scope.events);
			$scope.order = 'date';

			$timeout(function() {
				$items = angular.element('.js-article');
			}, 0);			

			for (var i in $scope.events) {
				var ev = $scope.events[i]
				timestamps.push($scope.dateToTimestamp(ev.date));
			};
			timestamps.sort(function(a,b) {
				if ($scope.order == '-date')
					return a - b;
				else
					return b - a;
			});
			timestampMin = timestamps[(timestamps.length - 1)];
			timestampMax = timestamps[0];
			$scope.dateMin = timestampMin;
			$scope.dateMax = timestampMax;
		});

		$q.all([dataPromise]).then(function() {
			$scope.navFixed = false;
			$scope.activeItem = 0;
			$document.bind("scroll", function() {
				scrollTop = $document.scrollTop();
				if (scrollTop >= navTop) {
					$scope.navFixed = true;
				} else {
					$scope.navFixed = false;
				}
				angular.forEach($items, function(item, index) {
					var itemTop = angular.element(item).offset().top;
					var prevItemTop = angular.element($items.eq(index - 1)).offset().top;
					if (scrollTop + documentHeight - (documentHeight * 0.25) >= itemTop && (index == 0 || prevItemTop < scrollTop)) {
						$scope.activeItem = index;
						return;
					}
				});
				$scope.$apply();
			});

			imgCacheSce.Cache([$scope.timeline.featured_image.guid]).then(function() {
				$scope.appReady = true;
				navTop = angular.element(".js-nav").offset().top;
			});
		});

		$scope.dateToTimestamp = function(date, locale) {
			if (date) {
				if (locale == 'fr') {
					var year = date.substr(6, 4);
					var month = parseInt(date.substr(3, 2)) - 1;
					var day = date.substr(0, 2);
				} else {
					var year = date.substr(0, 4);
					var month = parseInt(date.substr(5, 2)) - 1;
					var day = date.substr(8, 2);	
				}
				var hours = date.substr(11, 2);
				var minutes = date.substr(14, 2);
				var seconds = date.substr(17, 2);
				var milliseconds = '000';
				return Math.round(new Date(year, month, day, hours, minutes, seconds, milliseconds));
			}
		};

		$scope.getDatePosition = function(date) {
			var timestamp = $scope.dateToTimestamp(date);
			return {'left':Math.round((timestamp - timestampMin) * 100 / (timestampMax - timestampMin))+'%'};
		};

		$scope.setActiveItem = function(index) {
			if (index < 0 || index >= $scope.events.length)
				return false;
			if ($items.eq(index).length) {
				var $element = $items.eq(index);
				var offset = 75;
			}
			var scrollDest = $element.offset().top;
			var duration = Math.round(Math.abs(scrollDest - scrollTop - offset) / 5);
			$document.scrollToElement($element, offset, duration);
		};

	});

})();