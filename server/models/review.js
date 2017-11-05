'use strict';
module.exports = (sequelize, DataTypes) => {
  var review = sequelize.define('review', {
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    review: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return review;
};