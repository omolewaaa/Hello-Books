const express = require('express'); 
const bodyParser = require('body-parser');
const app = express();
//const jwt    = require('jsonwebtoken');
const user = require('../models/user');
const reviews = require('../models/review');
const favo = require ('../favorites');
const borrowed = require ('../borrow');

module.exports = (app) => {
  app.get('/api', (req, res) => 
  	res.json('Welcome to Hello-Books.'))


  app.post('/api/v1/books', booksController.create);
  app.put('/api/v1/books/:bookId', booksController.modify);
  app.get('/api/v1/books', booksController.getAllBooks);
  app.post('/api/v1/users/:userId/borrow/:bookId', userController.borrow);
  app.post('/api/v1/users/:userId/return/:bookId', userController.returnBook);
  app.put('/api/v1/users/:userId/borrow/:bookId', booksController.acceptBorrowedBook);
  app.put('/api/v1/users/:userId/return/:bookId', booksController.acceptReturnedBook);
  app.post('/api/v1/users/:userId/review/:bookId', userController.reviewBook);
  app.post('/api/v1/users/:userId/fav/:bookId', userController.favorites);
  app.get('/api/v1/users/:userId/favbooks', userController.getFavorites);
  app.get('/api/v1/books/sorted', booksController.sorted);
  
  }