app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){
	$http.get('scheme.json').then(function(d){
		scheme = d.data;
	}, function(d){});

	$http.get('requests.json').then(function(d){
		requests = d.data;
	}, function(d){});
}]);