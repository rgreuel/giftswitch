angular.module('appRoutes', ['ngRoute'])

.config(function($routeProvider, $locationProvider) {

	$routeProvider

	.when('/', {
		templateUrl: 'app/views/pages/home.html'
	})

	.when('/recipient', {
		templateUrl: 'app/views/pages/recipient.html',
		controller: 'recipientController',
		controllerAs: 'recipient'
	})

	.when('/settings', {
		templateUrl: 'app/views/pages/settings.html',
		controller: 'settingsController',
		controllerAs: 'settings'
	})

	.when('/exchange', {
		templateUrl: 'app/views/pages/exchange.html',
		controller: 'exchangeController',
		controllerAs: 'exchange'
	})

	.when('/login', {
		templateUrl: 'app/views/pages/login.html',
		controller: 'mainController',
		controllerAs: 'login'
	});

	$locationProvider.html5Mode({
		enabled: true,
		requireBase: false
	});
});
