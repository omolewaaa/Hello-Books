

module.exports = (sequelize, DataTypes) => {
  const BorrowedBook = sequelize.define('BorrowedBook', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  BorrowedBook.associate = (models) => {
    BorrowedBook.belongsTo(models.Book, {
      foreignKey: 'book_id',
      onDelete: 'CASCADE',
      as: 'book'
    });
    BorrowedBook.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'users'
    });
  };

  return BorrowedBook;
};
