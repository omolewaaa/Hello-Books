

module.exports = (sequelize, DataTypes) => {
  const Favorites = sequelize.define('Favorites', {
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  });

  Favorites.associate = (models) => {
    Favorites.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'user'
    });
    Favorites.belongsTo(models.Book, {
      foreignKey: 'book_id',
      onDelete: 'CASCADE',
      as: 'book'
    });
  };
  return Favorites;
};
