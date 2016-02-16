app.controller('RegisterCtrl', ['$scope', '$translate', '$http', function($scope, $translate, $http) {

	//register

	$scope.registerModel = scheme.register;
	// 'name', 'email', 'password','email','level','landing_page','user_group','country','city','address','phone'


	$scope.register = function(){
		$http.post(requests.register.route, $scope.registerModel)
			.success(function(d){
				console.log(d);
			})
			.error(function(d){
				console.log(d);
			});
	}

}]);