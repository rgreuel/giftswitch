angular.module('mainCtrl', ['wishlistService', 'exchangeService', 'ng-sortable', 'moment-picker'])

.controller('mainController', function($window, $scope, $location, Wishlist, Exchange) {
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

		// grab the exchanges at page load
		Exchange.all()
			.success(function(data) {
				vm.exchanges = data;
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

	vm.addExchange = function() {
		Exchange.add(vm.userData)
			.success(function(data) {

				// close and reset the create exchange modal
				$scope.dismiss();
				$scope.reset();

				// grab the new list of exchanges
				Exchange.all()
					.success(function(data) {
						vm.exchanges = data;
					});
			});
	};

	vm.clearExchangeForm = function() {
		$scope.reset();
	}

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
