var GoogleStrategy	= require('passport-google-oauth2').Strategy,
	User			= require('../app/models/user');

var configAuth = require('./auth');

module.exports = function(passport) {
	// passport session set up

	// used to serialize the user for the session
	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	// used to deserialize the user
	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
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
				User.findOne({ 'google.id' : profile.id }, function(err, user) {
					if (err) {
						return done(err);
					}

					if (user) {
						// user is found, log them in
						return done(null, user);
					} else {
						// user isn't in database, create user
						var newUser = new User();

						newUser.google.id = profile.id;
						newUser.google.token = accessToken;
						newUser.google.name = profile.displayName;
						newUser.google.email = profile.emails[0].value;

						// save the user
						newUser.save(function(err) {
							if (err) {
								throw err;
							}
							return done(null, newUser);
						});
					}
				});
			});
		}
	));
};
