var path = require('path');
var rootPath = path.normalize(__dirname + '/..');

module.exports = {
	'port': process.env.PORT || 8080,
	'db': {
		'name': 'giftswitch',
		'username': 'giftswitch',
		'password': 'giftswitch',
		'host': 'localhost',
		'port': 3306,
		'dialect': 'mariadb'
	},
	'FORCE_DB_SYNC': true,
	'modelsDir': rootPath + '/app/models'
};
