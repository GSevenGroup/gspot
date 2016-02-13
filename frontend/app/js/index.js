var app = angular.module('gApp', ['ui.router']);

app.config(['$urlRouterProvider', '$stateProvider', '$translateProvider', function($urlRouterProvider, $stateProvider, $translateProvider){

	// routings
	$urlRouterProvider.otherwise('/');

	$stateProvider.state('home', {
		url: '/',
		templateUrl: '../tpl/home.tpl',
		controller: 'HomeCtrl'
	});

	// translating
	$http.get('langs/en.json').success(function(data) {
		$translateProvider.translations('en', data);
	});

	$translateProvider.preferredLanguage('en');

}]);

