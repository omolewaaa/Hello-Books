import validator from 'validator';

import models from '../models';

const {
  User, Book, BorrowedBook, ReturnBook
} = models;

// Endpoint to add book
exports.create = (req, res) => {
  const userId = req.decoded.foundUser.id;

  Book.findOne({
    where: {
      bookName: req.body.bookName,
    },
  })
    .then((book) => {
      if (book) {
        res.status(400).send({ status: false, message: 'This book has been added' });
      } else {
        if (!req.body.bookName) {
          res.status(400).send('Please enter the name of the book');
        } else if (!req.body.Author) {
          res.status(400).send("Please enter the Author's name");
        } else if (!req.body.bookStatus) {
          res.status(400).send('Please the status of the book');
        } else if (!req.body.Details) {
          res.status(400).send('Kindly give little details about the book');
        } else

        if (!validator.isAlpha(req.body.bookName)) {
          res.status(400).send('Name of book should be letters');
        }


        if (req.body.bookStatus === 'available' || req.body.bookStatus === 'unavailable') {
          Book.create({
            bookName: req.body.bookName,
            Author: req.body.Author,
            bookStatus: req.body.bookStatus,
            Details: req.body.Details,
            user_id: userId
          })
            .then((createbook) => {
              res.status(200).send({
                status: true,
                message: 'You are registered Successfully',
                bookId: book.id,
                bookName: book.bookName,
                Author: book.Author,
                bookStatus: book.bookStatus,
                Details: book.Details,
              });
              // }
            })
            .catch(error => res.status(400).send(error));
        } else {
          return res.status(500).json({ status: false, message: 'books can either be available or unavailable' });
        }
      }
    });
};


// Enpoint to update book
exports.modify = (req, res) => {
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
            Author: req.body.Author,
            bookStatus: req.body.bookStatus,
            Details: req.body.Details
          },
          {
            where: {
              id: req.params.bookId
            }
          }
        );

        if (req.body.bookStatus === 'available' || req.body.bookStatus === 'unavailable') {
          res.status(201).json({ message: 'book modified successfully', data: req.body });
        } else {
          return res.status(500).json({ status: false, message: 'books can either be available or unavailable' });
        }
      }
    });
};

// Endpoint to get all the books in the database
exports.getAllBooks = (req, res) => {
  Book.findAll({
    order: [['upvotes', 'DESC']],
    include: [{ all: true }]
  })
    .then(Book => res.json(Book));
};


// Endpoint for admin to approve/reject request to borrow book
exports.approveBorrowBook = (req, res) => {
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
                              } else {
                                // To check if the status of a book whether its available or not
                                if (Book.bookStatus !== 'unavailable') {
                                  return res.status(200).json({ message: 'Approved to borrow', bookName: Book.bookName, bookId: Book.id });
                                }
                                return res.status(400).json({ message: 'Book currently unavailable' });
                              }
                            });
                        }
                      });
                  }
                });
            }
          });
      }
    });
};


exports.acceptReturnedBook = (req, res) => {
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
                  if (Returned) {
                    res.status(200).send({ message: 'Returned book accepted' });
                  } else {
                    res.status(400).send({ message: 'This book has not been returned' });
                  }
                });
            }
          });
      }
    });
};
