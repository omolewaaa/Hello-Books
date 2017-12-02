

module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('BorrowedBooks', {
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
    borrowStatus: {
      type: Sequelize.ENUM,
      values: ['pending', 'accepted'],
      defaultValue: 'pending'
    /* returned: {
        type: Sequelize.FALSE
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('BorrowedBooks')
};
