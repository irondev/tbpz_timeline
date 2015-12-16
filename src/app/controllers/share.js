(function() {

	app.controller('ShareCtrl', function($scope) {

		var shareUrl,
			popupWidth = 640,
			popupHeight = 480,
			canonicalUrl = angular.element("meta[property='og:url']").attr("content"),
			title = angular.element("meta[property='og:title']").attr("content"),
			description = angular.element("meta[property='og:description']").attr("content"),
			image = angular.element("meta[property='og:image']").attr("content");

		$scope.share = function(provider) {
			switch (provider) {
				case 'facebook': 
					shareUrl = "http://www.facebook.com/sharer.php?s=100&p[title]="+ encodeURIComponent(title) +"&p[url]=" + encodeURIComponent(canonicalUrl) +"&p[images][0]="+ image +"&p[summary]=" + encodeURIComponent(description);
				break;
				case 'twitter': 
					shareUrl = "https://twitter.com/share?url=" + encodeURIComponent(canonicalUrl) + "&text=" + encodeURIComponent(title) + "&via=lequipe";
				break;
				case 'google': 
					shareUrl = "https://plus.google.com/share?url=" + encodeURIComponent(canonicalUrl);
				break;
			};
			var popupX = (screen.availWidth / 2) - (popupWidth / 2);
			var popupY = (screen.availHeight / 2) - (popupHeight / 2);
			window.open(shareUrl, provider, "width="+ popupWidth +",height="+ popupHeight +",left="+ popupX +",top="+ popupY);
		};

	});

})();