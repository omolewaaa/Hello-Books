'use strict';
module.exports = (sequelize, DataTypes) => {
  var vote = sequelize.define('vote', {
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    voteType: DataTypes.STRING
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return vote;
};