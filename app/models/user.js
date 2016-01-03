module.exports = function(sequelize, DataTypes) {

	// schema for the user model
	var User = sequelize.define('user', {

		googleId	: DataTypes.STRING,
		googleToken	: DataTypes.STRING,
		googleEmail	: DataTypes.STRING,
		googleName	: DataTypes.STRING
		},
		{
			associate: function(models) {
				//User.hasMany(models.Wishlist);
				User.belongsToMany(models.exchange, {through: 'UserExchange'});
			}
		}
	);

	return User;
};
