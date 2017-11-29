
module.exports = (sequelize, DataTypes) => {
  const book = sequelize.define('book', {
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
  book.associate = (models) => {
    book.hasMany(models.borrowedBook, {
      foreignKey: 'book_id',
    });
    book.hasMany(models.returnBook, {
      foreignKey: 'book_id',
    });
    book.hasMany(models.review, {
      foreignKey: 'book_id',
      as: 'review'
    });
    book.hasMany(models.vote, {
      foreignKey: 'book_id',
    });
  };

  return book;
};

