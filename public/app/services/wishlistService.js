angular.module('wishlistService', [])

.factory('Wishlist', function($http) {

	// create a new object
	var wishlistFactory = {};

	// get the wishlist owner
	wishlistFactory.owner = function() {
		return $http.get('/api/me');
	};

	// get the wishlist
	wishlistFactory.all = function(exchange_id) {
		return $http.get('/api/' + exchange_id + '/wishlist');
	};

	// add to the wishlist
	wishlistFactory.add = function(exchange_id, userData) {
		return $http.post('/api/' + exchange_id + '/wishlist', userData);
	};

	// update the wishlist item
	wishlistFactory.update = function(exchange_id, item_id, userData) {
		return $http.put('/api/' + exchange_id + '/wishlist/' + item_id, userData);
	};

	// remove item from the wishlist
	wishlistFactory.remove = function(exchange_id, item_id) {
		return $http.delete('/api/' + exchange_id + '/wishlist/' + item_id);
	};

	return wishlistFactory;
});
