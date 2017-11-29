

module.exports = (sequelize, DataTypes) => {
  const Vote = sequelize.define('Vote', {
    user_id: DataTypes.INTEGER,
    book_id: DataTypes.INTEGER,
    voteType: DataTypes.STRING
  // },
  });
  Vote.associate = (models) => {
    Vote.belongsTo(models.User, {
      foreignKey: 'user_id',
      onDelete: 'CASCADE',
      as: 'user'
    });
    Vote.belongsTo(models.Book, {
      foreignKey: 'book_id',
      onDelete: 'CASCADE',
      as: 'book'
    });
  };
  return Vote;
};

