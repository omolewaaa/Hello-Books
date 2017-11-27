const validator = require('validator');
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    username:{ 
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
                   isAlpha: true
                }
            
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
               isEmail: true
           }
  },
    password: {
      type: DataTypes.STRING,
      allowNull: false,  
   },
  

   role: {
      //allowNull: false,  
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
      defaultValue: "user"

    },
    });
      user.associate = (models) => {
        user.hasMany(models.borrowedBook, {
          foreignKey: 'user_id',
        });
        user.hasMany(models.returnBook, {
          foreignKey: 'user_id',
        });
        user.hasMany(models.favorites, {
          foreignKey: 'user_id',
        });
        user.hasMany(models.review, {
          foreignKey: 'user_id',
          as: 'review'
        });
        user.hasMany(models.vote, {
          foreignKey: 'user_id',
        });
  
     }
  return user;
};


