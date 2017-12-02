

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ReturnBooks', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    book_id: {
      type: Sequelize.INTEGER
    },
    returnStatus: {
      type: Sequelize.ENUM,
      values: ['pending', 'accepted'],
      defaultValue: 'pending'
    /* returnedStatus: {
        type: Sequelize.BOOLEAN
      },
      */
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE
    }
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ReturnBooks')
};
