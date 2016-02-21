app.controller('MySGoalsCtrl', ['$scope', '$http', function($scope, $http){

	$scope.stg = [];
	$scope.ltg = [];
	$scope.stgAll = {};
	$scope.actWeek = undefined;
	$scope.weeks = {};

	$scope.stgModel = schemes.sGoal;

	$scope.getSTG = function(){
		$scope.http(
			requests.list_shortgoals.route,
			"POST",
			{	"group_id": $scope.user.user_group },
			function(d){
				$scope.stgAll = d.data;
			}
		);
	};

	$scope.getLTG = function() {
		$scope.http(
			requests.list_longgoals.route,
			"POST",
			{"group_id": $scope.user.user_group},
			function (d) {
				_.each(d.data, function(v){

					if(v.longtermgoals.length > 0){
						_.each(v.longtermgoals, function(w){
							$scope.ltg.push({
								user_id: v.user.id,
								goal: w.goal.goal,
								goal_id: w.goal.id
							})
						});
					}
				});
			}
		);
	};

	$scope.editSTG = function(){

	};

	$scope.deleteSTG = function(){

	};

	$scope.setSTGStatus = function(b){

	};

	$scope.commentOnSTG = function(){

	};

	$scope.goalsUpdated = function(){
		$scope.getSTG();
	};

	$scope.getWeeks = function(){
		$scope.http(
			requests.list_week.route,
			'POST',
			{ "group_id": $scope.user.user_group },
			function(d){
				$scope.weeks = d.data;
				_.each($scope.weeks, function(v){
					if(( moment().isBefore(v.date_to) && moment().isAfter(v.date_from) ) || (moment().isSame(v.date_from)) || (moment().isSame(v.date_from))){
						$scope.actWeek = v.week_id;
					}
				});
				$scope.selectNewWeek();
			}
		);
	};

	$scope.getUserFromGroup = function(id){
		var userRequested = {};

		_.each($scope.stg, function(v){
			if(v.user.id === id){
				userRequested = v.user;
			}
		});

		return userRequested;
	};

	$scope.getLTGPerPerson = function(id){
		return _.filter($scope.ltg, function(g){
			return (g.user_id === id);
		});
	};

	$scope.goalsUpdated = function(){
		$scope.getSTG();
	};

	$scope.newGoalAddedToast = function() {
		$mdToast.show({
			controller: 'NewGoalAddedToastCtrl',
			templateUrl: '../tpl/new-goal-added-toast.tpl',
			hideDelay: 4000,
			position: "top right"
		});
	};

	$scope.addSTG = function(){
		$scope.http(
			requests.create_longgoal.route,
			'POST',
			$scope.stgModel,
			function(d){
				$scope.goalsUpdated();
				$scope.newGoalAddedToast();
			}
		)
	};

	$scope.validateNewGoal = function(){
		if($scope.stgModel.goal && $scope.stgModel.goal_id){
			$scope.ltgModel.assigned_id = $scope.user.id;
			$scope.ltgModel.sketch = 0;
			$scope.ltgModel.suggest_id = $scope.user.id;
			$scope.ltgModel.week_id = 1;
			$scope.errorValidatingNewGoal = false;
		} else {
			$scope.errorValidatingNewGoal = true;
		}
	};

	$scope.selectNewWeek = function(){
		$scope.stg = [];
		_.each($scope.stgAll, function(v){
			if(v.shorttermgoals.week_id === $scope.actWeek){
				$scope.stg.push(v);
			}
		});
	};

	$scope.isSelected = function(id){
		return ($scope.actWeek === id);
	};

	//init
	$scope.getSTG();
	$scope.getLTG();
	$scope.getWeeks();

}]);