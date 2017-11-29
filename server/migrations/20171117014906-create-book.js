
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('books', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
    },
    user_id: {
      type: Sequelize.INTEGER
    },
    bookName: {
      type: Sequelize.STRING
    },
    Author: {
      type: Sequelize.STRING
    },
    bookStatus: {
      type: Sequelize.STRING
    },
    Details: {
      type: Sequelize.TEXT
    },
    upvotes: {
      type: Sequelize.INTEGER
    },
    downvotes: {
      type: Sequelize.INTEGER
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
  down: (queryInterface, Sequelize) => queryInterface.dropTable('books')
};
