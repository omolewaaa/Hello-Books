const usersController = require('../controller/user');
const bookController = require('../controller/book');
let verifyToken = require('../middleware/middleware');
let verify = require('../middleware/admin');
const borrowController = require('../controller/borrow');
const reviewController = require('../controller/review');
const favoritesController = require('../controller/favorites');




module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome to postit application.',
  }));

  app.post('/api/users/signup', usersController.create);
  app.post('/api/users/signin', usersController.login);
  app.post('/api/users/signout', verifyToken, usersController.logout);
  app.post('/api/book/admin', verify, bookController.create);
  app.put('/api/book/admin/:bookId', verifyToken, bookController.modify);
  app.put('/api/book/:userId/borrow/:bookId', verifyToken, bookController.approveBorrowBook);
  app.get('/api/books', bookController.getAllBooks);
  app.post('/api/users/borrow/:bookId', verifyToken, borrowController.create);
  app.post('/api/users/return/:bookId', verifyToken, borrowController.returnbook);
  app.post('/api/users/review/:bookId', verifyToken, reviewController.create);
  app.post('/api/users/:bookId/favbook', verifyToken, favoritesController.create);
  app.get('/api/users/favorites', verifyToken, favoritesController.getFavorites);
}