

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
    /* returnedStatus: {
        type: Sequelize.BOOLEAN
      },
      */
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
