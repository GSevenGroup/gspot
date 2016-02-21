var api = "http://localhost:8080";

var requests = {
  "login": {},

  "register":{
    "route": api + "/createuser"
  },

  "list_longgoals":{
    "route": api + "/api/longgoals"
  },
  "list_week":{
    "route": api + "/api/weeks"
  },
  "list_shortgoals":{
    "route": api + "/api/shortgoals"
  },
  "list_groups":{
    "route": api + "/api/groups"
  },

  "create_longgoal":{
    "route": api + "/api/createlonggoal"
  },
  "create_shortgoal":{
    "route": api + "/api/createshortgoal"
  },
  "create_week":{
    "route": api + "/api/addweek"
  },
  "create_group":{
    "route": api + "/api/addgroup"
  },

  "update_user":{
    "route": api + "/api/edituser"
  },
  "update_group":{
    "route": api + "/api/editgroup"
  },
  "update_shortgoal":{
    "route": api + "/api/editshortgoal"
  },
  "update_longgoal":{
    "route": api + "/api/editlonggoal"
  },

  "user":{
    route: api + "/api/user"
  }

};

var schemes = {
  "login": {
    "grantType": "password",
    "client_id": "f3d259ddd3ed8ff3843839b",
    "client_secret": "4c7f6f8fa93d59c455undefined2cundefinedae8c4a95b",
    "username": "",
    "password": ""
  },
  "register": {
    "email": "",
    "password": "",
    "name": "",
    "address": "",
    "city": "",
    "country": "",
    "phone": "",
    "code": ""
  },

  "sGoal": {
    "goal": "",
    "sketch": undefined,
    "assigned_id": undefined,
    "suggest_id": undefined,
    "week_id": undefined,
    "goal_id": undefined
  },

  "lGoal": {
    "goal": "",
    "sketch": undefined,
    "assigned_id": undefined,
    "suggest_id": undefined,
    "category_id": undefined,
    "goal_date": ""
  },

  "group": {
    "mentor": undefined,
    "name": ""
  }
};
var app = angular.module('gApp', [
	'ui.router', 'pascalprecht.translate' ,'ngMaterial', 'ngMdIcons', 'ngStorage'
]);

app.config(['$urlRouterProvider', '$stateProvider', '$translateProvider', function($urlRouterProvider, $stateProvider, $translateProvider){

	// routings
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '../tpl/home.tpl',
			controller: 'MainCtrl'
		})
		.state('register', {
			url: '/register',
			templateUrl: '../tpl/register.tpl',
			controller: 'RegisterCtrl'
		})
		.state('myg7', {
			url: '/mygseven',
			templateUrl: '../tpl/mygseven.tpl',
			controller: 'MyGSevenCtrl',
			params: {
				autoActivateChild: 'myg7.mysgoals'
			}
		})
		.state('myg7.mysgoals', {
			url: '/mysgoals',
			templateUrl: '../tpl/mysgoals.tpl',
			controller: 'MySGoalsCtrl'
		})
		.state('myg7.mylgoals', {
			url: '/mylgoals',
			templateUrl: '../tpl/mylgoals.tpl',
			controller: 'MyLGoalsCtrl'
		});

	// translating
	$translateProvider.preferredLanguage('en');

	$translateProvider.useStaticFilesLoader({
		prefix: 'langs/',
		suffix: '.json'
	});

}]);

// common
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
app.controller('MyLGoalsCtrl', ['$scope', '$mdToast', function($scope, $mdToast){

	$scope.ltg = {};

	$scope.ltgModel = schemes.lGoal;

	$scope.categoriesInNumber = [1, 2, 3, 4, 5];

	$scope.getLTG = function() {
		$scope.http(
			requests.list_longgoals.route,
			"POST",
			{"group_id": $scope.user.user_group},
			function (d) {
				$scope.ltg = d.data;
			}
		);
	};

	$scope.editLTG = function(){

	};

	$scope.deleteLTG = function(){

	};

	$scope.setLTGStatus = function(b){

	};

	$scope.commentOnLTG = function(){

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
app.controller('NewGoalAddedToastCtrl', ['$scope', '$mdToast', function($scope, $mdToast){
	$scope.closeToast = function() {
		$mdToast.hide();
	};
}]);
app.controller('RegisterCtrl', ['$scope', '$translate', '$http', '$location', function($scope, $translate, $http, $location) {

	//register

	$scope.isRegErrorFromBE = false;

	$scope.registerModel = schemes.register;
	$scope.registerErrors = {
		'email':{
			act: false,
			text: 'EMAIL'
		},
		'name':{
			act: false,
			text: 'NAME'
		},
		'phone':{
			act: false,
			text: 'PHONE'
		},
		'address':{
			act: false,
			text: 'ADDRESS'
		},
		'city':{
			act: false,
			text: 'CITY'
		},
		'password':{
			act: false,
			text: 'PWD'
		},
		'country':{
			act: false,
			text: 'COUNTRY'
		}
	};
	// 'name', 'email', 'password','email','level','landing_page','user_group','country','city','address','phone'

	if($location.search().code){
		$scope.registerModel.code = $location.search().code;
	} else{
		$location.url('/');
	}

	if($location.search().error){
		$scope.isRegErrorFromBE = true;
	}

	/**
	 * @description registers the user
	 */
	$scope.reg = function(){
		$http({
			url: requests.register.route,
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
			data: $scope.registerModel,
			method: 'POST'
		})
			.success(function(data){
				console.log("User registered successfully!");
				$location.url('/');
			})
			.error(function(data){
				show_error(data);
				$location.url('/register?error&code=' + $scope.registerModel.code);
			});
	};

	/**
	 * @description validates the form
	 * @param type
	 */
	$scope.validate = function(type){
		switch(type){
			case 'email':
				var cond = (!$scope.registerModel.email || $scope.registerModel.email.length < 4 || !_.contains($scope.registerModel.email, '@') || !_.contains($scope.registerModel.email, '.'));
				if(cond){
					$scope.registerErrors.email.act = true;
				} else {
					$scope.registerErrors.email.act = false;
				}
					break;
			case 'password':
				var cond = (!$scope.registerModel.password || $scope.registerModel.password.length < 8);
				if(cond){
					$scope.registerErrors.password.act = true;
				} else {
					$scope.registerErrors.password.act = false;
				}
				break;
			case 'name':
				var cond = (!$scope.registerModel.name || $scope.registerModel.name.length < 4);
				if(cond){
					$scope.registerErrors.name.act = true;
				} else {
					$scope.registerErrors.name.act = false;
				}
				break;
			case 'phone':
				var cond = (!$scope.registerModel.phone || $scope.registerModel.phone.length < 11 || $scope.registerModel.phone[0] != '+');
				if(cond){
					$scope.registerErrors.phone.act = true;
				} else {
					$scope.registerErrors.phone.act = false;
				}
				break;
			case 'city':
				var cond = (!$scope.registerModel.city || $scope.registerModel.city.length < 4);
				if(cond){
					$scope.registerErrors.city.act = true;
				} else {
					$scope.registerErrors.city.act = false;
				}
				break;
			case 'address':
				var cond = (!$scope.registerModel.address || $scope.registerModel.address.length < 4);
				if(cond){
					$scope.registerErrors.address.act = true;
				} else {
					$scope.registerErrors.address.act = false;
				}
				break;
			case 'country':
				var cond = (!$scope.registerModel.country || $scope.registerModel.country.length < 4);
				if(cond){
					$scope.registerErrors.country.act = true;
				} else {
					$scope.registerErrors.country.act = false;
				}
				break;
			default:
				break;
		}
	};

	/**
	 * @description returns the reg errors object
	 * @returns {{email: {act: boolean, text: string}, name: {act: boolean, text: string}, phone: {act: boolean, text: string}, address: {act: boolean, text: string}, city: {act: boolean, text: string}, password: {act: boolean, text: string}, country: {act: boolean, text: string}}|*}
	 */
	$scope.getRegError = function(){
		return $scope.registerErrors;
	};

	/**
	 * @description returns if there's an error to show
	 * @returns {boolean}
	 */
	$scope.isRegError = function(){
		return (
			$scope.registerErrors.email.act ||
			$scope.registerErrors.name.act ||
			$scope.registerErrors.phone.act ||
			$scope.registerErrors.city.act ||
			$scope.registerErrors.country.act ||
			$scope.registerErrors.address.act ||
			$scope.registerErrors.password.act
		)
	};

}]);