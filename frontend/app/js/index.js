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