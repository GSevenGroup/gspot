var app = angular.module('gApp', ['ui.router', 'pascalprecht.translate' ,'ngMaterial', 'ngMdIcons']);

app.config(['$urlRouterProvider', '$stateProvider', '$translateProvider', function($urlRouterProvider, $stateProvider, $translateProvider){

	// routings
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url: '/',
		templateUrl: '../tpl/home.tpl',
		controller: 'HomeCtrl'
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
		username: 'valami',
		password: 'valami'
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
		$http.post("localhost:8080/oauth/access_token", $scope.loginUser)
			.success(function(d){

			})
			.error(function(e){
				console.log(e);
			})
	}

	//To-DO:
	// Write a route.json with all the routings
	//Write a scheme.json for all the schemes like: User, loginUser, registerUser

}]);