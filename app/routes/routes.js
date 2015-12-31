module.exports = function(app, passport, express) {

	var path 		= require('path'),
		apiRoutes	= require('./api')(app, express);

	// API ROUTES =========================================
	// ====================================================
	app.use('/api', apiRoutes);

	// LOGIN/LOGOUT ROUTES ================================
	// ====================================================
	app.get('/login', function(req, res) {
		res.sendFile(path.join(__dirname, '../..', 'public/app/views/index.html'));
	});

	app.get('/logout', function(req, res) {
		req.logout();
		res.redirect('/login');
	});

	// GOOGLE ROUTES ======================================
	// ====================================================
	app.get('/auth/google', passport.authenticate('google', { scope : ['profile', 'email'] }));

	// the callback after google has authenticated the user
	app.get('/auth/google/callback',
			passport.authenticate('google', {
				successRedirect : '/',
				failureRedirect : '/login'
			}));

	// MAIN CATCHALL ROUTE ================================
	// ====================================================
	app.get('*', ensureAuthenticated, function(req, res) {
		res.sendFile(path.join(__dirname, '../..', 'public/app/views/index.html'));
	});

	// route middleware to make sure a user is logged in
	function ensureAuthenticated(req, res, next) {

		// if user is authenticated in the session, proceed
		if (req.isAuthenticated()) {
			return next();
		}
		// if not, redirect to login
		res.redirect('/login');
	}
};
