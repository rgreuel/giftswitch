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

		// grab the exchanges at page load
		Exchange.all()
			.success(function(data) {
				vm.exchanges = data;
				// default to first exchange in the list
				if (vm.exchanges[0]) {
					vm.currentExchange = vm.exchanges[0].id;
					vm.currentExchangeName = vm.exchanges[0].name;
				} else {
					vm.currentExchange = null;
				}
			})
			.then(function() {
				// grab the wishlist at page load
				Wishlist.all(vm.currentExchange)
					.success(function(data) {
						vm.wishlist = data;
				});
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
		Wishlist.update(item_id, newData)
			.success(function(data) {
				vm.wishlist[index] = data;
			});
	};

	vm.removeItem = function(item_id) {
		Wishlist.remove(item_id)
			.success(function(data) {

				// grab the new wishlist
				Wishlist.all(vm.currentExchange)
					.success(function(data) {
						vm.wishlist = data;
					});
			});
	};

	vm.loadExchange = function(exchange_id, exchange_name) {
		vm.currentExchange = exchange_id;
		vm.currentExchangeName = exchange_name;

		// grab the new wishlist
		Wishlist.all(vm.currentExchange)
			.success(function(data) {
				vm.wishlist = data;
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
