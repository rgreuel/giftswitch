module.exports = function(sequelize, DataTypes) {

	var ExchangePair = sequelize.define('ExchangePair', {

		},
		{
			associate: function(models) {
				ExchangePair.belongsTo(models.Exchange, {
					foreignKey: { allowNull: false },
					onDelete: 'CASCADE' });

				ExchangePair.belongsTo(models.User, {
					as: 'UserOne',
					foreignKey: { allowNull: false },
					onDelete: 'CASCADE'
				});

				ExchangePair.belongsTo(models.User, {
					as: 'UserTwo',
					foreignKey: { allowNull: false },
					onDelete: 'CASCADE'
				});
			}
		}
	);

	return ExchangePair;
};
