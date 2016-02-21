app.controller('MyGSevenCtrl', ['$scope', '$http', '$mdSidenav', '$location', '$sessionStorage', function($scope, $http, $mdSidenav, $location, $sessionStorage){

	$scope.$storage = $sessionStorage;

	$http.defaults.headers.common['Authorization'] = $scope.$storage.Authorization;

	$scope.user = $scope.$storage.user;

	$scope.weeks = [];

	if(!$scope.$storage.auth){
		console.error("User is not logged in, redirecting to main page!");
		$location.url('/');
	}

	// material stuff
	$scope.toggleLeft = buildDelayedToggler('left');
	$scope.toggleRight = buildToggler('right');
	$scope.isOpenRight = function(){
		return $mdSidenav('right').isOpen();
	};
	/**
	 * Supplies a function that will continue to operate until the
	 * time is up.
	 */
	function debounce(func, wait, context) {
		var timer;
		return function debounced() {
			var context = $scope,
				args = Array.prototype.slice.call(arguments);
			$timeout.cancel(timer);
			timer = $timeout(function() {
				timer = undefined;
				func.apply(context, args);
			}, wait || 10);
		};
	}
	/**
	 * Build handler to open/close a SideNav; when animation finishes
	 * report completion in console
	 */
	function buildDelayedToggler(navID) {
		return debounce(function() {
			$mdSidenav(navID)
				.toggle()
				.then(function () {
					$log.debug("toggle " + navID + " is done");
				});
		}, 200);
	}
	function buildToggler(navID) {
		return function() {
			$mdSidenav(navID)
				.toggle()
				.then(function () {
					$log.debug("toggle " + navID + " is done");
				});
		}
	};


	// common functions stuff

	$scope.categories = [
		"",
		"H",
		"J",
		"P",
		"Ch",
		"M"
	];

	$scope.http = function(url, method, data, successFn, errorFn){
		$http({
			url: url,
			data: data,
			method: method,
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'charset': 'charset=UTF-8'
			},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			}
		})
			.then(function(d){
				successFn(d);
			},
			function(d){
				show_error(d);
			});
		//.error(function(d){
		//	errorFn(d);
		//})
	};

	$scope.getWeeks = function(){
		$scope.http(
			requests.list_week.route,
			'POST',
			{ "group_id": $scope.user.group_id },
			function(d){
				$scope.weeks = d.data;
			}
		)
	}
}]);