angular.module('mainCtrl', ['wishlistService', 'ng-sortable'])

.controller('mainController', function($window, $location, Wishlist) {
	var vm = this;

	vm.loggedIn = false;
	if ($location.path() !== '/login') {
		vm.loggedIn = true;


		Wishlist.owner()
			.success(function(data) {
				vm.owner = data;
			});

		// grab the wishlist at page load
		Wishlist.all()
			.success(function(data) {
				vm.wishlist = data;
			});
	}

	vm.addItem = function() {
		Wishlist.add(vm.userData)
			.success(function(data) {

				// clear the form
				vm.userData = {};

				// grab the returned new wishlist
				vm.wishlist = data;
			});
	};

	vm.removeItem = function(id) {
		Wishlist.remove(id)
			.success(function(data) {

				// grab the returned new wishlist
				vm.wishlist = data;
			});
	};

	vm.googleLogin = function() {
		$window.location.href = '/auth/google';
	};

	vm.logOut = function() {
		$window.location.href ='/logout';
	};
});
