

import models from '../models';

const
  {
    Book, BorrowedBook, ReturnBook,
  } = models;


// Endpoint to borrow a book
exports.create = (req, res) => {
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
            // returnedStatus : false,
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
                if (borrowedBook && (!returnedBook)) {
                  res.status(400).send({ status: false, message: 'You must return this book before you can borrow it again' });
                } else if (book.bookStatus !== 'unavailable') {
                  BorrowedBook.create({
                    book_id: req.params.bookId,
                    user_id: userId,
                  })
                    .then((borrowedBook) => {
                      res.status(200).json({
                        message: 'Enjoy the book', borrowedBook, bookName: Book.bookName, borrower: username
                      });
                    })
                    .catch(error => res.status(400).send(error));
                } else {
                  res.status(400).json({ message: 'This book is currently unavailable' });
                }
                // }
              });

            // }
          });
      }
    });
};


// Endpoint for user to return book
exports.returnbook = (req, res) => {
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
              ReturnBook.create({
                user_id: userId,
                book_id: req.params.bookId
              })
                .then((returnedBook) => {
                  res.status(200).json({ message: 'Thanks for the return', bookName: book.bookName, borrower: username });
                })
                .catch(error => res.status(400).send(error));
            }
          });
      }
    });
};
