module.exports = function(app, express, db) {

	var apiRouter = express.Router();

	// test route to make sure everything is working
	// accessed at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'welcome to the giftswitch api!' });
	});

	apiRouter.get('/me', function(req, res) {

		db.User.findOne({ where: { id : req.user.id } })
		.then(function(user) {
			res.json(user.googleName);
		})
		.error(function(err) {
				res.send(err);
			});
	});

	// routes that end in :exchange_id/wishlist (unassigned wishlist)
	apiRouter.route('/:exchange_id/wishlist')

		// add a wish to the logged in user's wishlist
		// accessed at POST http://localhost:8080/api/:exchange_id/wishlist
		.post(function(req, res) {
			var noExchange = req.params.exchange_id === 'null';

			db.Wishlist.findOne({
				where: { UserId : req.user.id, ExchangeId : noExchange ? null : req.params.exchange_id } })
			.then(function(wishlist) {
				db.Wish.create({
					WishlistId	: wishlist.id,
					description	: req.body.description,
					url			: req.body.url
				})
				.then(function(newWish) {
					newWish.save()
					.then(function() {
						res.json({ message: 'Item successfully added to wishlist' });
					});
				});
			})
			.error(function(err) {
				res.send(err);
			});
		})

		// get all the wishes in the user's unassigned wishlist (create one if not found)
		// accessed at GET http://localhost:8080/api/:exchange_id/wishlist
		.get(function(req, res) {
			var noExchange = req.params.exchange_id === 'null';

			db.Wishlist.findOrCreate({
				where: { UserId : req.user.id, ExchangeId : noExchange ? null : req.params.exchange_id } })
			.spread(function(wishlist, created) {
				db.Wish.findAll({
					attributes: ['id', 'description', 'url'],
					where: { WishlistId : wishlist.id }
				 })
				.then(function(wishes) {
					res.json(wishes);
				});
			})
			.error(function(err) {
				res.send(err);
			});
		});


	// routes that end in /wishlist/:item_id
	apiRouter.route('/wishlist/:item_id')

		// update the item with this id in the wishlist
		// accessed at PUT http://localhost:8080/api/wishlist/:item_id
		.put(function(req, res) {

			db.Wishlist.findOne({ where: { UserId : req.user.id, ExchangeId : null } })
			.then(function(wishlist) {
				db.Wish.findOne({ where: { WishlistId : wishlist.id, id : req.params.item_id } })
				.then(function(wish) {
					wish.update({
						description : req.body.description,
						url : req.body.url
					})
					// only send back the changed item
					.then(function() {
						res.json(wish);
					});
				});
			})
			.error(function(err) {
				res.send(err);
			});
		})

		// delete the wish with this id in the unassigned wishlist
		// accessed at DELETE http://localhost:8080/api/wishlist/:item_id
		.delete(function(req, res) {

			db.Wishlist.findOne({ where: { UserId : req.user.id, ExchangeId : null } })
			.then(function(wishlist) {
				db.Wish.findOne({ where : { WishlistId : wishlist.id, id : req.params.item_id } })
				.then(function(wish) {
					wish.destroy({ force: true })
					.then(function() {
						res.json({ message: 'Item successfully deleted from wishlist' });
					});
				});
			})
			.error(function(err) {
				res.send(err);
			});
		});


	// routes that end in /exchange
	apiRouter.route('/exchange')

		// get all of the exchanges that this user is a member of
		// accessed at GET http://localhost:8080/api/exchange
		.get(function(req, res) {

			db.User.findOne({ where: { id : req.user.id } })
			.then(function(user) {
				user.getExchanges()
				.then(function(exchanges) {
					res.json(exchanges);
				});
			})
			.error(function(err) {
				res.send(err);
			});
		})

		// create an exchange
		// accessed at POST http://localhost:8080/api/exchange
		.post(function(req, res) {

			db.User.findOne({ where: { id : req.user.id } })
			.then(function(user) {

				db.Exchange.create({
						name: req.body.name,
						organizer: user.id,
						timeStarts: req.body.timeStarts
				})
				.then(function(exchange) {
					// add the exchange
					user.addExchange(exchange);

					// if user has an unassigned wishlist, assign it to this exchange
					db.Wishlist.findOne({ where: { UserId : user.id, ExchangeId : null } })
					.then(function(wishlist) {
						if (wishlist) {
							wishlist.update({
								ExchangeId: exchange.id
							});
						}
					});
				});
			})
			.then(function() {
				res.json({ message: 'Exchange successfully created' });
			})
			.error(function(err) {
				res.send(err);
			});
		});

	// routes that end in /exchange/:exchange_id
	apiRouter.route('/exchange/:exchange_id')

		// update the exchange with this id
		// accessed at PUT http://localhost:8080/api/exchange/:exchange_id
		.put(function(req, res) {

			// TODO
		})

		// delete the exchange with this id
		// accessed at DELETE http://localhost:8080/api/exchange/:exchange_id
		.delete(function(req, res) {

			// TODO
		});


	return apiRouter;
};
