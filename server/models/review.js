'use strict';
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define('review', {
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    review: DataTypes.TEXT
 });
  
      review.associate = (models) => {
        review.belongsTo(models.user, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
          as: 'user'
        });
        review.belongsTo(models.book, {
          foreignKey: 'book_id',
          onDelete: 'CASCADE',
          as: 'book'
      });
      }
  
  return review;
};
