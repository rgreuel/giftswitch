angular.module('mainCtrl', ['wishlistService', 'ng-sortable'])

.controller('mainController', function($window, $scope, $location, Wishlist) {
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

				// grab the new wishlist
				Wishlist.all()
					.success(function(data) {
						vm.wishlist = data;
					});
			});
	};

	vm.updateItem = function(id, index) {

		var newData = {};
		newData.description = document.getElementsByName("newDescription")[index].value;
		newData.url = document.getElementsByName("newUrl")[index].value;

		// call the update API
		Wishlist.update(id, newData)
			.success(function(data) {
				vm.wishlist[index] = data;
			});
	};

	vm.removeItem = function(id) {
		Wishlist.remove(id)
			.success(function(data) {

				// grab the new wishlist
				Wishlist.all()
					.success(function(data) {
						vm.wishlist = data;
					});
			});
	};

	vm.isActive = function(viewLocation) {
		return viewLocation === $location.path();
	};

	vm.googleLogin = function() {
		$window.location.href = '/auth/google';
	};

	vm.logOut = function() {
		$window.location.href ='/logout';
	};
});
