const express = require('express'); 
const bodyParser = require('body-parser');
const app = express();
const jwt    = require('jsonwebtoken');
const user = require('../models/user');
const reviews = require('../models/review');
const favo = require ('../favorites');
const borrowed = require ('../borrow');
const booksController = require('../controllers/book');
const userController = require('../controllers/user');



app.use(bodyParser.json());

module.exports = (app) => {
  app.get('/api', (req, res) => 
    res.json('Welcome to Hello-Books.'));

/**
 * @swagger
 * definition:
 *   books:
 *     properties:
 *      bookId:
 *         type: integer
 *      bookName:
 *         type: string
 *      Author:
 *         type: string
 *      bookStatus:
 *         type: string
 */

 /**
 * @swagger
 * /api/v1/books:
 *   post:
 *     tags:
 *       - books
 *     description: Add a new book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: book
 *         description: book object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/book'
 *     responses:
 *       200:
 *         description: Book added successfully
 */
  app.post('/api/v1/books', booksController.create);
  /**
 * @swagger
 * /api/books/v1/bookId:
 *   put:
 *     tags: books
 *     description: Updates a single book
 *     produces: application/json
 *     parameters:
 *       name: book
 *       in: body
 *       description: Fields for the book resource
 *       schema:
 *         type: array
 *         $ref: '#/definitions/book'
 *     responses:
 *       200:
 *         description: Successfully modified
 */
  app.put('/api/v1/books/:bookId', booksController.modify);

  /**
 * @swagger
 * /api/v1/books:
 *   get:
 *     tags:
 *       - books
 *     description: Get all books in the catalog
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of books
 *         schema:
 *           $ref: '#/definitions/book'
 */
  app.get('/api/v1/books', booksController.getAllBooks);
  /**
 * @swagger
 * /api/v1/users/:userId/borrow/:bookId:
 *   post:
 *     tags:
 *       - books
 *         users
 *     description: A user to borrow book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: userId and bookId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Enjoy the book
 */
  app.post('/api/v1/users/:userId/borrow/:bookId', userController.borrow);
  /**
 * @swagger
 * /api/v1/users/:userId/return/:bookId:
 *   post:
 *     tags:
 *       - books
 *         users
 *     description: A user to return a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: userId and bookId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Book successfully returned
 */
  app.post('/api/v1/users/:userId/return/:bookId', userController.returnBook);
  /**
 * @swagger
 * /api/v1/users/:userId/borrow/:bookId:
 *   put:
 *     tags:
 *       - books
 *         users
 *     description: Admin to approve request to borrow book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: userId and bookId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Book Approved
 */
  app.put('/api/v1/users/:userId/borrow/:bookId', booksController.acceptBorrowedBook);
  /**
 * @swagger
 * /api/v1/users/:userId/return/:bookId:
 *   put:
 *     tags:
 *       - books
 *         users
 *     description: Admin to accept returned book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: userId and bookId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: This book is successfully returned
 */
  app.put('/api/v1/users/:userId/return/:bookId', booksController.acceptReturnedBook);
  /**
 * @swagger
 * /api/v1/users/:userId/review/:bookId:
 *   post:
 *     tags:
 *       - books
 *         users
 *     description: A user to review a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name:  review
 *         description: userId and bookId
 *         in: body
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Thanks for your review
 */
  app.post('/api/v1/users/:userId/review/:bookId', userController.reviewBook);
  /**
 * @swagger
 * /api/v1/users/:userId/fav/:bookId:
 *   post:
 *     tags:
 *       - books
 *         users
 *     description: A user to mark a book as favorite
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: userId and bookId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Marked as favorite
 */
  app.post('/api/v1/users/:userId/fav/:bookId', userController.favorites);
  /**
 * @swagger
 * /api/v1/users/:userId/favbooks:
 *   get:
 *     tags:
 *       - favorite book
 *     description: To get a user favorite books
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: User's id
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: see below your favorites book
 *         schema:
 *           $ref: '#/definitions/user'
 */
  app.get('/api/v1/users/:userId/favbooks', userController.getFavorites);
  app.get('/api/v1/books/sorted', booksController.sorted);
  


  

  };
