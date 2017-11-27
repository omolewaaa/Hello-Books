'use strict';
module.exports = (sequelize, DataTypes) => {
  var vote = sequelize.define('vote', {
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    voteType: DataTypes.STRING
  //}, 
  });
      vote.associate = (models) => {
        vote.belongsTo(models.user, {
          foreignKey: 'user_id',
          onDelete: 'CASCADE',
          as: 'user'
        });
        vote.belongsTo(models.book, {
          foreignKey: 'book_id',
          onDelete: 'CASCADE',
          as: 'book'
        });  
      }
  return vote;
};



