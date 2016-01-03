module.exports = function(sequelize, DataTypes) {

	// schema for the user model
	var Exchange = sequelize.define('Exchange', {

		name		: { type: DataTypes.STRING, allowNull: false },
		owner		: { type: DataTypes.INTEGER,
						references: {
							model: sequelize.import('./user'),
							key: 'id'
						},
						allowNull: false
		},
		timeCreated : { type: DataTypes.DATE, defaultValue: DataTypes.NOW},
		timeStarted : DataTypes.DATE
		},
		{
			associate: function(models) {
				Exchange.belongsToMany(models.User, {through: 'UserExchange'});
			}
		}
	);

	return Exchange;
};
