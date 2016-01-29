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
	}

	vm.addItem = function() {
		Wishlist.add(vm.currentExchange, vm.userData)
			.success(function(data) {

				// clear the form
				vm.userData = {};

				// grab the new wishlist
				Wishlist.all(vm.currentExchange)
					.success(function(data) {
						vm.wishlist = data;
					});
			});
	};

	vm.updateItem = function(item_id, index) {

		var newData = {};
		newData.description = document.getElementsByName("newDescription")[index].value;
		newData.url = document.getElementsByName("newUrl")[index].value;

		// call the update API
		Wishlist.update(vm.currentExchange, item_id, newData)
			.success(function(data) {
				vm.wishlist[index] = data;
			});
	};

	vm.removeItem = function(item_id) {
		Wishlist.remove(vm.currentExchange, item_id)
			.success(function(data) {

				// grab the new wishlist
				Wishlist.all(vm.currentExchange)
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
})
.directive('exchangeModal', function() {
	return {
		restrict: 'A',
		link: function(scope, element, attr) {

			scope.dismiss = function() {
				element.modal('hide');
			};

			scope.reset = function() {
				element.on('hidden.bs.modal', function() {
					$(this).find('form')[0].reset();
				});
			};
		}
	};
});
