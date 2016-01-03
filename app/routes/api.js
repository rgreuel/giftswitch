module.exports = function(app, express, db) {

	var apiRouter = express.Router();

	// test route to make sure everything is working
	// access at GET http://localhost:8080/api
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

	// routes that end in /wishlist (unassigned wishlist)
	apiRouter.route('/wishlist')

		// add an item to the logged in user's wishlist
		// access at POST http://localhost:8080/api/wishlist
		.post(function(req, res) {
			db.Wishlist.findOne({ where: { id : req.user.id, ExchangeId : null } })
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

		// get all the itmes in the user's unassigned wishlist
		// access at GET http://localhost:8080/api/wishlist
		.get(function(req, res) {
			db.Wishlist.findOrCreate({ where: { UserId : req.user.id, ExchangeId : null } })
			.spread(function(wishlist, created) {
				db.Wish.findAll({
					attributes: ['description', 'url'],
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

		// // routes that end in /wishlist/:item_id
		// apiRouter.route('/wishlist/:item_id')

		// 	// update the item with this id in the wishlist
		// 	// accessed at PUT http://localhost:8080/api/wishlist/:item_id
		// 	.put(function(req, res) {
		// 		db.User.findById(req.user, function(err, user) {
		// 			if (err) {
		// 				res.send(err);
		// 			}

		// 			user.wishlist.id(req.params.item_id).description = req.body.description;
		// 			user.wishlist.id(req.params.item_id).url = req.body.url;

		// 			// save the wishlist and check for errors
		// 			user.save(function(err) {
		// 				if (err) {
		// 					res.send(err);
		// 				}
		// 				// only send back the changed item
		// 				res.json(user.wishlist.id(req.params.item_id));
		// 			});
		// 		});
		// 	})

		// 	// delete the item with this id in the wishlist
		// 	// accessed at DELETE http://localhost:8080/api/wishlist/:item_id
		// 	.delete(function(req, res) {
		// 		db.User.findById(req.user, function(err, user) {
		// 			if (err) {
		// 				res.send(err);
		// 			}

		// 			user.wishlist.id(req.params.item_id).remove();

		// 			var newWishlist = user.wishlist;

		// 			// save the wishlist and check for errors
		// 			user.save(function(err) {
		// 				if (err) {
		// 					res.send(err);
		// 				}
		// 				res.json(newWishlist);
		// 			});
		// 		});
		// 	});

	return apiRouter;
};
