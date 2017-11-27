'use strict';
module.exports = (sequelize, DataTypes) => {
  var favorites = sequelize.define('favorites', {
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
 });

      favorites.associate = (models) => {
        favorites.belongsTo(models.user, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
          as: 'user'
        });
        favorites.belongsTo(models.book, {
          foreignKey: 'book_id',
          onDelete: 'CASCADE',
          as: 'book'
        });
      }
  return favorites;
};


