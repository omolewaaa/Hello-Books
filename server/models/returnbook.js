

module.exports = (sequelize, DataTypes) => {
  const ReturnBook = sequelize.define('ReturnBook', {
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    book_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  });
  ReturnBook.associate = (models) => {
    ReturnBook.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'user'
    });
    ReturnBook.belongsTo(models.Book, {
      foreignKey: 'book_id',
      onDelete: 'CASCADE',
      as: 'book'
    });
  };
  return ReturnBook;
};

