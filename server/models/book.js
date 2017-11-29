
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Author: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    bookStatus: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    Details: {
      type: DataTypes.TEXT,
      allowNull: false,
    },

    upvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
    downvotes: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  });
  Book.associate = (models) => {
    Book.hasMany(models.BorrowedBook, {
      foreignKey: 'book_id',
    });
    Book.hasMany(models.ReturnBook, {
      foreignKey: 'book_id',
    });
    Book.hasMany(models.Review, {
      foreignKey: 'book_id',
      as: 'review'
    });
    Book.hasMany(models.Vote, {
      foreignKey: 'book_id',
    });
  };

  return Book;
};

