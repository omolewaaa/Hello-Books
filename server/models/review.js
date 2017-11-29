

module.exports = (sequelize, DataTypes) => {
  const Review = sequelize.define('Review', {
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    review: DataTypes.TEXT
  });

  Review.associate = (models) => {
    Review.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'user'
    });
    Review.belongsTo(models.Book, {
      foreignKey: 'book_id',
      onDelete: 'CASCADE',
      as: 'book'
    });
  };

  return Review;
};
