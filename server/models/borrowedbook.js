
'use strict';
module.exports = (sequelize, DataTypes) => {
  const borrowedBook = sequelize.define('borrowedBook', {
    user_id: {
    type: DataTypes.INTEGER,
      allowNull: false,
    },

    book_id: {
     type: DataTypes.INTEGER,
      allowNull: false,
    },

   /* returnedStatus: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
*/
  }, {
    classMethods: {
      associate: function(models) {
        // associations can be defined here
      }
    }
  });
  return borrowedBook;
};