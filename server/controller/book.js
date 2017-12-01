import validator from 'validator';

import models from '../models';


const {
  User, Book, BorrowedBook, ReturnBook
} = models;

/**
 *
 *
 * @class BookController
 */
class BookController {
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof BookController
   *@returns {any} book object
   */
  static create(req, res) {
    const userId = req.decoded.foundUser.id;

    Book.findOne({
      where: {
        bookName: req.body.bookName,
      },
    })
      .then((book) => {
        if (book) {
          res.status(400).send({ status: false, message: 'This book has been added' });
        } else if (!req.body.bookName) {
          res.status(400).send('Please enter the name of the book');
        } else if (!req.body.author) {
          res.status(400).send("Please enter the author's name");
        } else if (!req.body.quantity) {
          res.status(400).send('Please enter the quantity of the book');
        } else if (!req.body.details) {
          res.status(400).send('Kindly give little details about the book');
        } else

        if (!validator.isAlpha(req.body.bookName)) {
          res.status(400).send('Name of book should be letters');
        } else if (!validator.isNumeric(req.body.quantity)) {
          res.status(400).send('quantity of book should be number');
        } else {
          Book.create({
            bookName: req.body.bookName,
            author: req.body.author,
            quantity: req.body.quantity,
            details: req.body.details,
            // user_id: req.decoded.foundUser
          })
            .then((book) => {
              res.status(201).send({
                status: true,
                message: 'Book registered Successfully',
                bookId: book.id,
                bookName: book.bookName,
                author: book.author,
                quantity: book.quantity,
                details: book.details,
              });
              // }
            })
            .catch(error => res.status(400).send(error));
        }
      });
  }


  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof BookController
   * @returns {any} book object
   */
  static modify(req, res) {
  // const userId = req.decoded.user.id;

  // To check if the book is existing
    Book.findOne({
      where: {
        id: req.params.bookId,
      },
    })
      .then((book) => {
        if (!book) {
          res.status(400).send({ status: false, message: 'book not found' });
        } else {
          book.update(
            {
              bookName: req.body.bookName,
              author: req.body.author,
              quantity: req.body.quantity,
              details: req.body.details
            },
            {
              where: {
                id: req.params.bookId
              }
            }
          );

          if (validator.isNumeric(req.body.quantity)) {
            res.status(201).json({ message: 'book modified successfully', data: book });
          } else {
            return res.status(400).json({ status: false, message: 'kindly check the input for quantity, it must be a number' });
          }
        }
      });
  }

  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof BookController
   * @returns {any} book object
   */
  static getAllBooks(req, res) {
    Book.findAll({
      order: [['upvotes', 'DESC']],
    })
      .then(books => res.json(books));
  }


  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof BookController
   * @returns {any} borrow object
   */
  static approveBorrowBook(req, res) {
  // const userId = req.decoded.user.id;


  // To check if the user is existing
    User.findOne({
      where: {
        id: req.params.userId,
      },
    })
      .then((user) => {
        if (!user) {
          res.status(400).send({ status: false, message: 'user not found' });
        } else {
        // To check if the book is existing
          Book.findOne({
            where: {
              id: req.params.bookId,
            },
          })
            .then((book) => {
              if (!book) {
                res.status(400).send({ status: false, message: 'book not found' });
              } else {
              // To check if a user has made any request to borrow book
                BorrowedBook.findOne({
                  where: {
                    user_id: req.params.userId,
                  },
                })
                  .then((foundborrow) => {
                    if (!foundborrow) {
                      res.status(400).send({ message: 'This user has no request to borrow book' });
                    } else {
                    // To check if any request has been made on a book
                      BorrowedBook.findOne({
                        where: {
                          book_id: req.params.bookId,
                        },
                      })
                        .then((foundBook) => {
                          if (!foundBook) {
                            res.status(400).send({ message: 'No request on this book' });
                          } else {
                          // To check if a user has requested for the specific book
                            BorrowedBook.findOne({
                              where: {
                                book_id: req.params.bookId,
                                user_id: req.params.userId,
                              },
                            })
                              .then((founduserborrow) => {
                                if (!founduserborrow) {
                                  res.status(400).send({ status: false, message: 'This user has not requested for this particular book' });
                                } else
                                // To check if the status of a book whether its available or not
                                if (founduserborrow.borrowStatus === 'pending') {
                                  founduserborrow.update({
                                    borrowStatus: 'accepted',
                                  });
                                  // }
                                  res.status(200).json({ message: 'Approved to borrow', bookName: Book.bookName, bookId: Book.id });
                                } else {
                                  res.status(400).json({ message: 'Book currently unavailable' });
                                }
                              //  }
                              });
                          }
                        });
                    }
                  });
              }
            });
        }
      });
  }

  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @memberof BookController
 * @returns {any} borrow object
 */
  static acceptReturnedBook(req, res) {
    User.findOne({
      where: {
        id: req.params.userId,
      },
    })
      .then((founduser) => {
        if (!founduser) {
          res.status(400).send({ status: false, message: 'user not found' });
        } else {
        // To check if the book is existing
          Book.findOne({
            where: {
              id: req.params.bookId,
            },
          })
            .then((foundbook) => {
              if (!foundbook) {
                res.status(400).send({ status: false, message: 'book not found' });
              } else {
                ReturnBook.findOne({
                  where: {
                    user_id: req.params.userId,
                    book_id: req.params.bookId
                  }
                })
                  .then((Returned) => {
                    if (Returned.returnStatus === 'pending') {
                      Returned.update({
                        returnStatus: 'accepted',
                      });
                      res.status(200).send({ message: 'Returned book accepted' });
                    } else {
                      res.status(400).send({ message: 'This book has not been returned' });
                    }
                  });
              }
            });
        }
      });
  }
}
export default BookController;
