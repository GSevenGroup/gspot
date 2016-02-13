var app = angular.module('gApp', ['ui.router', 'pascalprecht.translate']);

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

