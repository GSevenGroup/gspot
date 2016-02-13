app.controller('HomeCtrl', ['$scope', '$translate', function($scope, $translate){

	$scope.changeTransTo = function(lang){
		$translate.use(lang);
	};

	$scope.loginUser = function(){
		//$http.post()
	}


}]);