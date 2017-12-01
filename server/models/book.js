
module.exports = (sequelize, DataTypes) => {
  const Book = sequelize.define('Book', {
    bookName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    author: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    status: {
      type: DataTypes.ENUM,
      values: ['available', 'unavailable'],
      defaultValue: 'available'
      // allowNull: false,
    },

    quantity: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },

    details: {
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

