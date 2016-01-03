module.exports = function(sequelize, DataTypes) {

	var Wishlist = sequelize.define('Wishlist', {

		},
		{
			associate: function(models) {
				Wishlist.belongsTo(models.User, {
					foreignKey: { allowNull: false },
					onDelete: 'CASCADE' });
				Wishlist.belongsTo(models.Exchange);
				Wishlist.hasMany(models.Wish);
			}
		}
	);

	return Wishlist;
};
