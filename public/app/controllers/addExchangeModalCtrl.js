angular.module('addExchangeModalCtrl', ['exchangeService', 'moment-picker'])
.controller('addExchangeModalController', function($scope, $element, Exchange, close) {

	$scope.cancel = function() {
		$element.modal('hide');
	 	close(null, 500);
	 };

	$scope.addExchange = function() {
			Exchange.add($scope.userData)
				.success(function(data) {

					// grab the new list of exchanges
					Exchange.all()
						.success(function(data) {
							close({
								exchanges: data
							}, 500); // close, give 500ms for bootstrap to animate
						});
				});
		};
});
