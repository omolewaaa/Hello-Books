
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
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return book;
};