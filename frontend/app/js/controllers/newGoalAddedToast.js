app.controller('NewGoalAddedToastCtrl', ['$scope', '$mdToast', function($scope, $mdToast){
	$scope.closeToast = function() {
		$mdToast.hide();
	};
}]);