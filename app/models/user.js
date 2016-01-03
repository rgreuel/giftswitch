module.exports = function(sequelize, DataTypes) {

	var User = sequelize.define('User', {

		googleID	: DataTypes.STRING,
		googleToken	: DataTypes.STRING,
		googleEmail	: DataTypes.STRING,
		googleName	: DataTypes.STRING
		},
		{
			associate: function(models) {
				User.hasMany(models.Wishlist, {
					foreignKey: { allowNull: false },
					onDelete: 'CASCADE'
				});
				User.belongsToMany(models.Exchange, {through: 'UserExchange'});
			}
		}
	);

	return User;
};
