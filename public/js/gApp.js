var app = angular.module('gApp', ['ui.router', 'pascalprecht.translate' ,'ngMaterial', 'ngMdIcons']);
var scheme = undefined;
var requests = undefined;

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
		});

	// translating
	$translateProvider.preferredLanguage('en');

	$translateProvider.useStaticFilesLoader({
		prefix: 'langs/',
		suffix: '.json'
	});

}]);

// common
// angular.module('basic', ['basic.mainpage', 'basic.common', 'basic.cardprofil', 'basic.editprofil', 'basic.handlecards', 'basic.buycredit']);
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
	$http.get('scheme.json').then(function(d){
		scheme = d.data;
	}, function(d){});

	$http.get('requests.json').then(function(d){
		requests = d.data;
	}, function(d){});
}]);
app.controller('RegisterCtrl', ['$scope', '$translate', '$http', function($scope, $translate, $http) {

	//register

	// $scope.registerModel = scheme.register;



}]);