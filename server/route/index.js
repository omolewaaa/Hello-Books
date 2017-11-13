const usersController = require('../controller/user');
const bookController = require('../controller/book');
let verifyToken = require('../middleware/middleware');
let verify = require('../middleware/admin');
//const loginController = require('../controller').login;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome to postit application.',
  }));

  app.post('/api/users/signup', usersController.create);
  app.post('/api/users/signin', usersController.login);
  app.post('/api/users/signout', verifyToken, usersController.logout);
  app.post('/api/book/admin', verify, bookController.create);
  app.put('/api/book/admin/:bookId', verifyToken, bookController.modify);
  app.get('/api/books', bookController.getAllBooks);
}