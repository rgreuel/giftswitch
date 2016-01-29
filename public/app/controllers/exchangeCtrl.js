angular.module('exchangeCtrl', ['exchangeService', 'moment-picker'])

.controller('exchangeController', function($scope, Exchange, Wishlist) {
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
});
