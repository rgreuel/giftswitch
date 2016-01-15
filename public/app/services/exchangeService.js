angular.module('exchangeService', [])

.factory('Exchange', function($http) {

	// create a new object
	var exchangeFactory = {};

	// get the exchanges
	exchangeFactory.all = function() {
		return $http.get('/api/exchange');
	};

	// create an exchange
	exchangeFactory.add = function(userData) {
		return $http.post('/api/exchange', userData);
	};

	// update the exchange
	exchangeFactory.update = function(id, userData) {
		return $http.put('/api/exchange/' + id, userData);
	};

	// remove item from the wishlist
	exchangeFactory.remove = function(id) {
		return $http.delete('/api/exchange/' + id);
	};

	return exchangeFactory;
});
