
'use strict';
module.exports = (sequelize, DataTypes) => {
  const returnBook = sequelize.define('returnBook', {
    user_id: {
    type: DataTypes.INTEGER,
      allowNull: false,
    },

    book_id: {
     type: DataTypes.INTEGER,
      allowNull: false,
    },
    });
      returnBook.associate = (models) => {
        returnBook.belongsTo(models.user, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
          as: 'user'
        });
        returnBook.belongsTo(models.book, {
          foreignKey: 'book_id',
          onDelete: 'CASCADE',
          as: 'book'
        });
     
    }
  return returnBook;
};


