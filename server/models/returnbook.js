
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

    /*returnedStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: true,
  },
  */

  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return returnBook;
};