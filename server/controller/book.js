import validator from 'validator';

import models from '../models';

const {
  user, book, borrow, returnedBook
} = models;

// Endpoint to add book
exports.create = (req, res) => {
  const userId = req.decoded.user.id;
  const name = req.decoded.user.role;

  // To restrict users to access the endpoint except the admin
  if (name !== 'admin') {
    return res.status(400).send({ status: false, message: 'Unauthorised' });
  }

  book.findOne({
    where: {
      bookName: req.body.bookName,
    },
  })
    .then(() => {
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
          book.create({
            bookName: req.body.bookName,
            Author: req.body.Author,
            bookStatus: req.body.bookStatus,
            Details: req.body.Details,
            user_id: userId
          })
            .then(() => {
              res.status(200).send({
                status: true,
                message: 'You are registered Successfully',
                bookId: book.id,
                bookName: book.bookName,
                Author: book.Author,
                bookStatus: book.bookStatus,
                Details: book.Details,
                name
              });
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
  const name = req.decoded.user.role;

  // To restrict users to access the endpoint except the admin
  if (name !== 'admin') {
    res.status(400).send({ status: false, message: 'Unauthorised' });
  }
  // To check if the book is existing
  book.findOne({
    where: {
      id: req.params.bookId,
    },
  })
    .then(() => {
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
  book.findAll({
    order: [['upvotes', 'DESC']],
    include: [{ all: true }]
  })
    .then(books => res.json(books));
};


// Endpoint for admin to approve/reject request to borrow book
exports.approveBorrowBook = (req, res) => {
  // const userId = req.decoded.user.id;
  const name = req.decoded.user.role;

  // To restrict users to access the endpoint except the admin
  if (name !== 'admin') {
    res.status(400).send({ status: false, message: 'Unauthorised' });
  }

  // To check if the user is existing
  user.findOne({
    where: {
      id: req.params.userId,
    },
  })
    .then(() => {
      if (!user) {
        res.status(400).send({ status: false, message: 'user not found' });
      } else {
        // To check if the book is existing
        book.findOne({
          where: {
            id: req.params.bookId,
          },
        })
          .then(() => {
            if (!book) {
              res.status(400).send({ status: false, message: 'book not found' });
            } else {
              // To check if a user has made any request to borrow book
              borrow.findOne({
                where: {
                  user_id: req.params.userId,
                },
              })
                .then(() => {
                  if (!borrow) {
                    res.status(400).send({ message: 'This user has no request to borrow book' });
                  } else {
                    // To check if any request has been made on a book
                    borrow.findOne({
                      where: {
                        book_id: req.params.bookId,
                      },
                    })
                      .then(() => {
                        if (!borrow) {
                          res.status(400).send({ message: 'No request on this book' });
                        } else {
                          // To check if a user has requested for the specific book
                          borrow.findOne({
                            where: {
                              book_id: req.params.bookId,
                              user_id: req.params.userId,
                            },
                          })
                            .then(() => {
                              if (!borrow) {
                                res.status(400).send({ status: false, message: 'This user has not requested for this particular book' });
                              } else {
                                // To check if the status of a book whether its available or not
                                if (book.bookStatus !== 'unavailable') {
                                  return res.status(200).json({ message: 'Approved to borrow', bookName: book.bookName, bookId: book.id });
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
  // const userId = req.decoded.user.id;
  const name = req.decoded.user.role;

  // To restrict users to access the endpoint except the admin
  if (name !== 'admin') {
    res.status(400).send({ status: false, message: 'Unauthorised' });
  }

  // To check if the user is existing
  user.findOne({
    where: {
      id: req.params.userId,
    },
  })
    .then(() => {
      if (!user) {
        res.status(400).send({ status: false, message: 'user not found' });
      } else {
        // To check if the book is existing
        book.findOne({
          where: {
            id: req.params.bookId,
          },
        })
          .then(() => {
            if (!book) {
              res.status(400).send({ status: false, message: 'book not found' });
            } else {
              returnedBook.findOne({
                where: {
                  user_id: req.params.userId,
                  book_id: req.params.bookId
                }
              })
                .then(() => {
                  if (returnedBook) {
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
