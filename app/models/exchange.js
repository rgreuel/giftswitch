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
		timeStarts	: DataTypes.DATE
		},
		{
			associate: function(models) {
				Exchange.belongsToMany(models.User, {through: 'UserExchange'});
				Exchange.hasMany(models.Wishlist);
				Exchange.hasMany(models.ExchangePair, {
					foreignKey: { allowNull: false },
					onDelete: 'CASCADE'
				});
			}
		}
	);

	return Exchange;
};
