module.exports = function(sequelize, DataTypes) {

	var Exchange = sequelize.define('Exchange', {

		name		: { type: DataTypes.STRING, allowNull: false },
		organizer	: { type: DataTypes.INTEGER,
						references: {
							model: sequelize.import('./user'),
							key: 'id'
						},
						allowNull: false
		},
		timeStarted : DataTypes.DATE
		},
		{
			associate: function(models) {
				Exchange.belongsToMany(models.User, {through: 'UserExchange'});
				Exchange.hasMany(models.Wishlist);
			}
		}
	);

	return Exchange;
};
