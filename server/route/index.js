const usersController = require('../controller/user');
const bookController = require('../controller/book');
const verifyToken = require('../middleware/middleware');
const verify = require('../middleware/adminMiddleware');
const borrowController = require('../controller/borrow');
const reviewController = require('../controller/review');
const favoritesController = require('../controller/favorites');
const votesController = require('../controller/vote');


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome to postit application.',
  }));


  /**
 * @swagger
 * definition:
 *   users:
 *     properties:
 *      username:
 *         type: string
 *      email:
 *         type: string
 *      Author:
 *         type: string
 *      Password:
 *         type: string
 */

  /**
 * @swagger
 * /api/v1/users/signup:
 *   post:
 *     tags:
 *       - users
 *     description: Register to use application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: You are registered successfully
 */
  app.post('/api/v1/users/signup', usersController.create);

  /**
 * @swagger
 * /api/v1/users/signin:
 *   post:
 *     tags:
 *       - users
 *     description: Registered users to signin application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: Logged in successfully
 */
  app.post('/api/v1/users/signin', usersController.login);

  /**
 * @swagger
 * /api/v1/users/signout:
 *   post:
 *     tags:
 *       - users
 *     description: users to log out of the application
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: user
 *         description: user object
 *         in: body
 *         required: true
 *         schema:
 *           $ref: '#/definitions/user'
 *     responses:
 *       200:
 *         description: You have successfully logged out
 */
  app.post('/api/v1/users/signout', verifyToken, usersController.logout);

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
 *      Details:
 *         type: text
 */

  /**
 * @swagger
 * /api/v1/book/admin:
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
  app.post('/api/v1/book/admin', verifyToken, verify, bookController.create);

  /**
 * @swagger
 * /api/v1/book/admin/:bookId:
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
  app.put('/api/v1/book/admin/:bookId', verifyToken, verify, bookController.modify);

  /**
 * @swagger
 * /api/v1/book/:userId/borrow/:bookId:
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
  app.put('/api/v1/book/:userId/borrow/:bookId', verifyToken, verify, bookController.approveBorrowBook);

  /**
 * @swagger
 * /api/v1/book/:userId/return/:bookId:
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
 *         description: Returned book accepted
 */
  app.put('/api/v1/book/:userId/return/:bookId', verifyToken, verify, bookController.acceptReturnedBook);


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
  app.get('/api/v1/books', bookController.getAllBooks);

  /**
 * @swagger
 * /api/v1/users/borrow/:bookId:
 *   post:
 *     tags:
 *       - books
 *         users
 *     description: A user to borrow book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: bookId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Enjoy the book
 */
  app.post('/api/v1/users/borrow/:bookId', verifyToken, borrowController.create);

  /**
 * @swagger
 * /api/v1/users/return/:bookId:
 *   post:
 *     tags:
 *       - books
 *         users
 *     description: A user to return a book
 *     produces:
 *       - application/json
 *     parameters:
 *       - name: id
 *         description: bookId
 *         in: path
 *         required: true
 *         type: integer
 *     responses:
 *       200:
 *         description: Book successfully returned
 */
  app.post('/api/v1/users/return/:bookId', verifyToken, borrowController.returnbook);

  /**
 * @swagger
 * /api/v1/users/review/:bookId:
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
  app.post('/api/v1/users/review/:bookId', verifyToken, reviewController.create);

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
  app.post('/api/v1/users/:bookId/favbook', verifyToken, favoritesController.create);

  /**
 * @swagger
 * /api/v1/users/favbooks:
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
  app.get('/api/v1/users/favorites', verifyToken, favoritesController.getFavorites);
  app.post('/api/v1/vote/:bookId', verifyToken, votesController.create);
};
