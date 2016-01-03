module.exports = function(sequelize, DataTypes) {

	var Wish = sequelize.define('Wish', {
			description	: { type: DataTypes.STRING, allowNull: false },
			url			: DataTypes.STRING
		},
		{
			associate: function(models) {
				Wish.belongsTo(models.Wishlist, {
					foreignKey: { allowNull: false },
					onDelete: 'CASCADE' });
			}
		}
	);

	return Wish;
};
