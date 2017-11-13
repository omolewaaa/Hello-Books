'use strict';
module.exports = (sequelize, DataTypes) => {
  var book = sequelize.define('book', {
    user_id: DataTypes.INTEGER,
    bookName: DataTypes.STRING,
    Author: DataTypes.STRING,
    bookStatus: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return book;
};