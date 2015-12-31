
var	express 		= require('express'),
	app 			= express(),
	mongoose		= require('mongoose'),
	morgan			= require('morgan'),
	bodyParser		= require('body-parser'),
	session			= require('express-session'),
	config  		= require('./config/config'),
	passport 		= require('passport');

// APP CONFIGURATION--------------------------------
mongoose.connect(config.database);

require('./config/passport')(passport); // pass passport for configuration

// set up express
app.use(express.static(__dirname + '/public')); // configure public assets folder
app.use(morgan('dev')); // log all requests to the console
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// configure app to handle CORS requests
app.use(function(req, res, next) {
	res.setHeader('Access-Control-Allow-Origin', '*');
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST');
	res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type,Authorization');
	next();
});

// set up passport
app.use(session({
	secret: 'superSecretChangeMe',
	name: 'session_id',
	resave: true,
	saveUninitialized: true,
	ephemeral: true
}));
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions

// ROUTES--------------------------------------------
require('./app/routes/routes')(app, passport, express); // load our routes and pass in app and configured passport
//---------------------------------------------------

// start the server
app.listen(config.port);
console.log('Magic happens on http://localhost:' + config.port);
