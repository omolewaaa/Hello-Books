module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    username: {
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
      // allowNull: false,
      type: DataTypes.ENUM,
      values: ['user', 'admin'],
      defaultValue: 'user'

    },
  });
  User.associate = (models) => {
    User.hasMany(models.BorrowedBook, {
      foreignKey: 'user_id',
    });
    User.hasMany(models.ReturnBook, {
      foreignKey: 'user_id',
    });
    User.hasMany(models.Favorites, {
      foreignKey: 'user_id',
    });
    User.hasMany(models.Review, {
      foreignKey: 'user_id',
      as: 'review'
    });
    User.hasMany(models.Vote, {
      foreignKey: 'user_id',
    });
  };
  return User;
};

