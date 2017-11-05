'use strict';
module.exports = (sequelize, DataTypes) => {
  var borrowedBook = sequelize.define('borrowedBook', {
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return borrowedBook;
};