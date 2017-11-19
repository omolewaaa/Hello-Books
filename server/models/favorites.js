'use strict';
module.exports = (sequelize, DataTypes) => {
  var favorites = sequelize.define('favorites', {
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return favorites;
};