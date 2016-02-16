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
		});

	// translating
	$translateProvider.preferredLanguage('en');

	$translateProvider.useStaticFilesLoader({
		prefix: 'langs/',
		suffix: '.json'
	});

}]);

// common