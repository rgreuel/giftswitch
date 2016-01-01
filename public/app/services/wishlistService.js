angular.module('wishlistService', [])

.factory('Wishlist', function($http) {

	// create a new object
	var wishlistFactory = {};

	// get the wishlist owner
	wishlistFactory.owner = function() {
		return $http.get('/api/me');
	};

	// get the wishlist
	wishlistFactory.all = function() {
		return $http.get('/api/wishlist');
	};

	// add to the wishlist
	wishlistFactory.add = function(userData) {
		return $http.post('/api/wishlist', userData);
	};

	// update the wishlist item
	wishlistFactory.update = function(id, userData) {
		return $http.put('/api/wishlist/' + id, userData);
	};

	// remove item from the wishlist
	wishlistFactory.remove = function(id) {
		return $http.delete('/api/wishlist/' + id);
	};

	return wishlistFactory;
});
