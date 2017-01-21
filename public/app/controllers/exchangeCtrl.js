angular.module('exchangeCtrl', ['exchangeService', 'wishlistService', 'angularModalService'])

.controller('exchangeController', function($scope, $location, Exchange, Wishlist, ModalService) {
	var vm = this;

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

	vm.showModal = function() {

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
});
