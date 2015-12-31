var User = require('../models/user');

module.exports = function(app, express) {

	var apiRouter = express.Router();

	// test route to make sure everything is working
	// access at GET http://localhost:8080/api
	apiRouter.get('/', function(req, res) {
		res.json({ message: 'welcome to the giftswitch api!' });
	});

	apiRouter.get('/me', function(req, res) {
		User.findById(req.user, function(err, user) {
			if (err) {
				res.send(err);
			}

			res.json(user.google.name);
		});
	});

	// routes that end in /wishlist
	apiRouter.route('/wishlist')

		// add an item to the logged in user's wishlist
		// access at POST http://localhost:8080/api/wishlist
		.post(function(req, res) {
			User.findById(req.user, function(err, user) {
				if (err) {
					res.send(err);
				}

				user.wishlist.push({
					description	: req.body.description,
					url			: req.body.url
				});

				var newWishlist = user.wishlist;

				// save the item and check for errors
				user.save(function(err) {
					if (err) {
						res.send(err);
					}
					res.json(newWishlist);
				});
			});
		})

		// get all the itmes in the user's wishlist
		// access at GET http://localhost:8080/api/wishlist
		.get(function(req, res) {
			User.findById(req.user, function(err, user) {
				if (err) {
					res.send(err);
				}

				res.json(user.wishlist);
			});
		});

		// routes that end in /wishlist/:item_id
		apiRouter.route('/wishlist/:item_id')

			// delete the item with this id from the wishlist
			// accessed at DELETE http://localhost:8080/api/wishlist/:item_id
			.delete(function(req, res) {
				User.findById(req.user, function(err, user) {
					if (err) {
						res.send(err);
					}

					user.wishlist.id(req.params.item_id).remove();

					var newWishlist = user.wishlist;

					// save the wishlist and check for errors
					user.save(function(err) {
						if (err) {
							res.send(err);
						}
						res.json(newWishlist);
					});
				});
			});

	return apiRouter;
};
