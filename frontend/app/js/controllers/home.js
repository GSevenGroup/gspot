app.controller('HomeCtrl', ['$scope', '$translate', '$http', function($scope, $translate, $http){

	$scope.loginUser = {
		grant_type: 'password',
		client_id: 'f3d259ddd3ed8ff3843839b',
		client_secret: '4c7f6f8fa93d59c45502c0ae8c4a95b',
		username: '',
		password: ''
	};

	/**
	 * @description changes the translation
	 * @param lang
	 */
	$scope.changeTransTo = function(lang){
		$translate.use(lang);
	};

	/**
	 * @description authenticates user
	 */
	$scope.login = function(){
		$scope.req = {
			method: 'POST',
			url: 'http://localhost:8080/oauth/access_token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'charset': 'charset=UTF-8'
			},
			transformRequest: function(obj) {
				var str = [];
				for(var p in obj)
					str.push(encodeURIComponent(p) + "=" + encodeURIComponent(obj[p]));
				return str.join("&");
			},
			data: $scope.loginUser
		};

		$http($scope.req).then(function(data){
			$scope.userLoginSuccess(data);
		}, function(data){
			show_error(data);
		});
	};

}]);