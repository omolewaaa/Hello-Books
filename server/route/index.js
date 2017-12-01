
import UserController from '../controller/user';
import BookController from '../controller/book';
import BorrowController from '../controller/borrow';
import ReviewController from '../controller/review';
import FavoriteController from '../controller/favorites';
import VoteController from '../controller/vote';
import verifyUser from '../middleware/middleware';
import verifyAdmin from '../middleware/adminMiddleware';

module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome to Hello-Book application.',
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
  app.post('/api/v1/users/signup', UserController.create);

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
  app.post('/api/v1/users/signin', UserController.login);

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
  app.post('/api/v1/users/signout', verifyUser, UserController.logout);

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
  app.post('/api/v1/book', verifyUser, verifyAdmin, BookController.create);

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
  app.put('/api/v1/book/:bookId', verifyUser, verifyAdmin, BookController.modify);

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
  app.put('/api/v1/book/:userId/borrow/:bookId', verifyUser, verifyAdmin, BookController.approveBorrowBook);

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
  app.put('/api/v1/book/:userId/return/:bookId', verifyUser, verifyAdmin, BookController.acceptReturnedBook);


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
  app.get('/api/v1/books', BookController.getAllBooks);

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
  app.post('/api/v1/users/borrow/:bookId', verifyUser, BorrowController.create);

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
  app.post('/api/v1/users/return/:bookId', verifyUser, BorrowController.returnbook);

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
  app.post('/api/v1/users/review/:bookId', verifyUser, ReviewController.create);

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
  app.post('/api/v1/users/:bookId/favbook', verifyUser, FavoriteController.create);

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
  app.get('/api/v1/users/favorites', verifyUser, FavoriteController.getFavorites);
  app.post('/api/v1/vote/:bookId', verifyUser, VoteController.create);
};
