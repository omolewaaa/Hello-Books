

import models from '../models';
// import default from 'validator/lib/isPostalCode';

const
  {
    Book, BorrowedBook, ReturnBook,
  } = models;


/**
 *
 *
 * @class BorrowController
 */
class BorrowController {
/**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @memberof BorrowController
 * @returns {any} borrow object
 */
  static create(req, res) {
    const userId = req.decoded.foundUser.id;
    const
      {
        username
      } = req.decoded.foundUser.username;


    // To check the existence of a book
    Book.findOne({
      where: {
        id: req.params.bookId,
      },
    })
      .then((book) => {
        if (!book) {
          res.status(400).send({ status: false, message: 'book not found' });
        } else {
        // To check if a user who borrowed a particular book has returned to borrow again
          BorrowedBook.findOne({
            where: {
              user_id: userId,
              book_id: req.params.bookId,
              borrowStatus: 'pending',
            },
          })
            .then((borrowedBook) => {
            //  if (borrowbook){
              ReturnBook.findOne({
                where: {
                  user_id: userId,
                  book_id: req.params.bookId,

                },
              })
                .then((returnedBook) => {
                // if((bookReturn)){
                  if ((borrowedBook && borrowedBook.borrowStatus === 'pending')) {
                    res.status(400).send({ status: false, message: 'You must return this book before you can borrow it again' });
                  } else if ((borrowedBook && borrowedBook.borrowStatus === 'accepted') && (returnedBook && returnedBook.returnStatus !== 'accepted')) {
                    res.status(400).send({ status: false, message: 'This book must be approved by the admin that is returned before you can borrow it again' });
                  } else if (book.quantity !== 0) {
                    BorrowedBook.create({
                      book_id: req.params.bookId,
                      user_id: userId,
                    })
                      .then((borrowBook) => {
                        if (borrowBook) {
                          book.decrement('quantity');
                          res.status(200).json({
                            message: 'Request made successfully, please wait while admin approve your request',
                            borrowBook,
                            bookName: Book.bookName,
                            borrower: username
                          });
                        }
                      })
                      .catch(error => res.status(400).send(error));
                  } else {
                    res.status(400).json({ message: 'This book is currently unavailable' });
                  }
                });

            // }
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
   * @memberof BorrowController
   * @returns {any} borrow object
   */
  static returnbook(req, res) {
    const userId = req.decoded.foundUser.id;
    const
      {
        username
      } = req.decoded.foundUser.username;
    Book.findOne({
      where: {
        id: req.params.bookId,
      },
    })
      .then((book) => {
        if (!book) {
          res.status(400).send({ status: false, message: 'book not found' });
        } else {
        // To check if a user have actually borrowed the book to be returned
          BorrowedBook.findOne({
            where: {
              user_id: userId,
              book_id: req.params.bookId,

            },
          })
            .then((borrowedBook) => {
              if (!borrowedBook) {
                res.status(400).send({ status: false, message: 'You have not borrowed this book' });
              } else {
                ReturnBook.findOne({
                  where: {
                    user_id: userId,
                    book_id: req.params.bookId,

                  },
                })
                  .then((bookreturn) => {
                    if (bookreturn && bookreturn.returnStatus === 'pending') {
                      res.status(400).send({ status: false, message: 'You have earlier made this request and request waiting for admin approval' });
                    } else {
                      ReturnBook.create({
                        user_id: userId,
                        book_id: req.params.bookId
                      })
                        .then((returnedBook) => {
                          if (returnedBook) {
                            book.increment('quantity');
                            res.status(200).json({
                              returnedBook,
                              message: 'Thanks for the return',
                              bookName: book.bookName,
                              borrower: username
                            });
                          }
                        })
                        .catch(error => res.status(400).send(error));
                    }
                  });
              }
            });
        }
      });
  }
}
export default BorrowController;
