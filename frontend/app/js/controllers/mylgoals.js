app.controller('MyLGoalsCtrl', ['$scope', '$mdToast', function($scope, $mdToast){

	$scope.ltg = {};

	$scope.ltgModel = schemes.lGoal;

	$scope.categoriesInNumber = [1, 2, 3, 4, 5];

	$scope.isCommentOpen = {};
	$scope.newComments = {};

	$scope.getLTG = function() {
		$scope.http(
			requests.list_longgoals.route,
			"POST",
			{"group_id": $scope.user.user_group},
			function (d) {
				$scope.ltg = d.data;
				_.each($scope.ltg, function(v){
					_.each(v.longtermgoals, function(w){
						$scope.newComments[w.goal.id] =  angular.copy(schemes.comment);
						$scope.newComments[w.goal.id].goal_id = w.goal.id;
						$scope.isCommentOpen[w.goal.id] = false;
					});
				});
			}
		);
	};

	$scope.toggleCommentAdding = function(id){
		$scope.isCommentOpen[id] = !$scope.isCommentOpen[id];
	};

	$scope.addComment = function(id){
		$scope.http(
			requests.create_ltg_comment.route,
			'POST',
			$scope.newComments[id],
			function(d){
				$scope.goalsUpdated();
				// $scope.newCommentAddedToast();
			}
		)
	};

	$scope.editLTG = function(){

	};

	$scope.deleteLTG = function(){

	};

	$scope.setLTGStatus = function(b){

	};

	$scope.goalsUpdated = function(){
		$scope.getLTG();
	};

	$scope.newGoalAddedToast = function() {
		$mdToast.show({
			controller: 'NewGoalAddedToastCtrl',
			templateUrl: '../tpl/new-goal-added-toast.tpl',
			hideDelay: 3000,
			position: "top right"
		});
	};

	$scope.addLTG = function(){
		$scope.http(
			requests.create_longgoal.route,
			'POST',
			$scope.ltgModel,
			function(d){
				$scope.goalsUpdated();
				$scope.newGoalAddedToast();
			}
		)
	};

	$scope.getUserFromGroup = function(id){
		var userRequested = {};

		_.each($scope.ltg, function(v){
			if(v.user.id === id){
				userRequested = v.user;
			}
		});

		return userRequested;
	};

	$scope.validateNewGoal = function(){
		if($scope.ltgModel.goal && $scope.ltgModel.category_id){
			$scope.ltgModel.assigned_id = $scope.user.id;
			$scope.ltgModel.sketch = 0;
			$scope.ltgModel.suggest_id = 0;
			$scope.ltgModel.goal_date = "2016";
			$scope.errorValidatingNewGoal = false;
		} else {
			$scope.errorValidatingNewGoal = true;
		}
	};

	//init
	$scope.getLTG();
}]);