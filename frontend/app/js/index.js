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