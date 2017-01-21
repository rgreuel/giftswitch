angular.module('mainCtrl', ['wishlistService', 'exchangeService',
				'angularModalService', 'ng-sortable'])

.controller('mainController', function($window, $location, $scope,
			Wishlist, Exchange, ModalService) {

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

	// grab the exchanges at page load
	// only executed if logged in
	Exchange.all()
		.success(function(data) {
			vm.exchanges = data;
			// default to first exchange in the list
			if (vm.exchanges[0]) {
				$scope.main.currentExchange = vm.exchanges[0].id;
				$scope.main.currentExchangeName = vm.exchanges[0].name;
			} else {
				$scope.main.currentExchange = null;
			}
		})
		.then(function() {
			// grab the wishlist at page load
			Wishlist.all($scope.main.currentExchange)
				.success(function(data) {
					$scope.main.wishlist = data;
				});
		});

	vm.loadExchange = function(exchange_id, exchange_name) {
		$scope.main.currentExchange = exchange_id;
		$scope.main.currentExchangeName = exchange_name;

		// grab the new wishlist
		Wishlist.all($scope.main.currentExchange)
			.success(function(data) {
				$scope.main.wishlist = data;
			});
	};

	vm.showAddExchangeModal = function() {

		ModalService.showModal({
			templateUrl: "app/views/pages/addExchangeModal.html",
			controller: "addExchangeModalController"
		}).then(function(modal) {

			modal.element.modal();
			modal.close.then(function(result) {
				if (result) {
					vm.exchanges = result.exchanges;
				}
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
