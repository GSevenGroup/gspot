var show_error = function(d){
	console.log("Error in $http req!");
	console.log("|-- data: " + d.data);
	console.log("|-- status code: " + d.status);
	console.log("|-- headers: " + d.headers);
	console.log("|-- config: " + d.config);
	console.log("|-- statusText: " + d.statusText);
};

app.controller('MainCtrl', ['$scope', '$http', '$localStorage', '$sessionStorage', '$location',
	function($scope, $http, $localStorage, $sessionStorage, $location){

	//main stuff could come here

	$scope.$storage = $sessionStorage.$default({
		auth: false
	});

	//stuff to determinate if user is logged in
	$scope.userLoginSuccess = function(data){
		$http.defaults.headers.common['Authorization'] = data.data.token_type + " " + data.data.access_token;
		$scope.$storage.Authorization = data.data.token_type + " " + data.data.access_token;

		$http.get(requests.user.route)
			.success(function(d){
				$scope.$storage.auth = true;
				$scope.$storage.user = d;
				$location.url("/mygseven/mysgoals");
				console.log("User logged in successfully: " + $http.defaults.headers.common.Authorization);
			})
			.error(function(d){
				show_error(d);
			});
	};

}]);