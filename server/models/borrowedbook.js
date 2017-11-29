

module.exports = (sequelize, DataTypes) => {
  const borrowedBook = sequelize.define('borrowedBook', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  borrowedBook.associate = (models) => {
    borrowedBook.belongsTo(models.book, {
      foreignKey: 'book_id',
      onDelete: 'CASCADE',
      as: 'book'
    });
    borrowedBook.belongsTo(models.user, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'users'
    });
  };

  return borrowedBook;
};
