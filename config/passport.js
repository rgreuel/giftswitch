var GoogleStrategy	= require('passport-google-oauth2').Strategy,
	configAuth		= require('./auth');

module.exports = function(passport, db) {
	// passport session set up

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		db.User.findOne({ where: { id : id } }).then(function(user) {
			if (!user) {
				return done(null, false);
			}
			done(null, user);
		}).catch(function(err) {
			done(err, null);
		});
	});

	passport.use(new GoogleStrategy({
		clientID:		configAuth.googleAuth.clientID,
		clientSecret: 	configAuth.googleAuth.clientSecret,
		callbackURL:	configAuth.googleAuth.callbackURL,
		passReqToCallback: true
		},
		function(request, accessToken, refreshToken, profile, done) {
			process.nextTick(function() {

				// try to find the user based on their google id
				db.User.findOne({ where: { googleID : profile.id } })
					.then(function(user) {

					if (user) {
						// user is found, log them in
						return done(null, user);
					} else {
						// user isn't in database, create user
						db.User.create().then(function(newUser) {

							newUser.googleID = profile.id;
							newUser.googleToken = accessToken;
							newUser.googleName = profile.displayName;
							newUser.googleEmail = profile.emails[0].value;

							// save the user
							newUser.save()
								.then(function(newUser) {
									return done(null, newUser);
								})
								.error(function(err) {
									throw err;
							});
						});
					}
				})
					.error(function(err) {
						return done(err);
				});
			});
		}
	));
};
