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


// angular.module('basic', ['basic.mainpage', 'basic.common', 'basic.cardprofil', 'basic.editprofil', 'basic.handlecards', 'basic.buycredit']);
app.controller('HomeCtrl', ['$scope', '$translate', function($scope, $translate){

	$scope.changeTransTo = function(lang){
		$translate.use(lang);
	};

	$scope.loginUser = function(){
		//$http.post()
	}


}]);