var requests = {
  "login": {},

  "register":{
    "route": "/register",
    "body": {
      "email": "",
      "password": "",
      "firstname": "",
      "lastname": "",
      "language": ""
    }
  }
};

var schemes = {
  "login": {
    "grantType": "password",
    "client_id": "f3d259ddd3ed8ff3843839b",
    "client_secret": "4c7f6f8fa93d59c45502c0ae8c4a95b",
    "username": "",
    "password": ""
  },
  "register": {
    "email": "",
    "pwd": "",
    "fname": "",
    "lname": "",
    "lang": ""
  }
};
var app = angular.module('gApp', ['ui.router', 'pascalprecht.translate' ,'ngMaterial', 'ngMdIcons']);

app.config(['$urlRouterProvider', '$stateProvider', '$translateProvider', function($urlRouterProvider, $stateProvider, $translateProvider){

	// routings
	$urlRouterProvider.otherwise('/');

	$stateProvider
		.state('home', {
			url: '/',
			templateUrl: '../tpl/home.tpl',
			controller: 'HomeCtrl'
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
				autoActivateChild: 'parentState.childState'
			}
		})
		.state('myg7.mygoals', {
			url: '/mygoals',
			templateUrl: '../tpl/mygoals.tpl',
			controller: 'MyGoalsCtrl'
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
		grantType: 'password',
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
	$scope.loginUser = function(){
		$scope.req = {
			method: 'POST',
			url: 'http://localhost:8080/oauth/access_token',
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded',
				'charset': 'charset=UTF-8'
			},
			data: $scope.loginUser
		};
		/*$http.post("http://localhost:8080/oauth/access_token", $scope.loginUser)
			.success(function(d){

			})
			.error(function(e){
				console.log(e);
			})*/

		$http($scope.req).then(function(data){
			console.log(1);
		}, function(data){})
	};

	//To-DO:
	// Write a route.json with all the routings
	//Write a scheme.json for all the schemes like: User, loginUser, registerUser

}]);
app.controller('MainCtrl', ['$scope', '$http', function($scope, $http){

	//main stuff could come here

}]);
app.controller('MyGSevenCtrl', ['$scope', '$http', '$mdSidenav', function($scope, $http, $mdSidenav){
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

	$scope.user = {
		fullName: "Lassu Henrik"
	};
}]);
app.controller('RegisterCtrl', ['$scope', '$translate', '$http', function($scope, $translate, $http) {

	//register

	$scope.registerModel = schemes.register;
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