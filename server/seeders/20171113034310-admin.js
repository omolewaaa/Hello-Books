const bcrypt = require('bcryptjs');

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.bulkInsert('Users', [{
    username: 'John',
    email: 'johnDoe@gmail.com',
    role: 'admin',
    password: bcrypt.hashSync(('johnDoe'), salt),
    createdAt: new Date(),
    updatedAt: new Date(),

  }], {}),

  down: (queryInterface, Sequelize) =>
    /*
      Add reverting commands here.
      Return a promise to correctly handle asynchronicity.

      Example:
      return queryInterface.bulkDelete('Person', null, {});
    */
    queryInterface.bulkDelete('users', null, {})

};
