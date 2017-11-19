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
   
    },
   {
    classMethods: {
      associate: (models) => {
  
     },
    }, 
  });
  return user;
};
