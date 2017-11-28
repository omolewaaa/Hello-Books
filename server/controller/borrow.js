
import express from 'express';
import user from '../models/user';
import book from '../models/book';
import books from '../models/book';
import borrow from '../models/borrowedbook';
import borrowbook from '../models/borrowedbook';
import Returned from '../models/returnbook';
import bookReturn from '../models/returnbook';

import models from '../models';

const
  {
    book, borrowedBook, returnBook,
  } = models;


// Endpoint to borrow a book
exports.create = (req, res) => {
  const userId = req.decoded.user.id;
  const
    {
      username
    } = req.decoded.user.username;


  // To check the existence of a book
  book.findOne({
    where: {
      id: req.params.bookId,
    },
  })
    .then(() => {
      if (!book) {
        res.status(400).send({ status: false, message: 'book not found' });
      } else {
        // To check if a user who borrowed a particular book has returned to borrow again
        borrowedBook.findOne({
          where: {
            user_id: userId,
            book_id: req.params.bookId,
            // returnedStatus : false,
          },
        })
          .then(() => {
            //  if (borrowbook){
            returnBook.findOne({
              where: {
                user_id: userId,
                book_id: req.params.bookId,
              },
            })
              .then(() => {
                // if((bookReturn)){
                if (borrowedBook && (!returnBook)) {
                  res.status(400).send({ status: false, message: 'You must return this book before you can borrow it again' });
                } else if (book.bookStatus !== 'unavailable') {
                  borrowedBook.create({
                    book_id: req.params.bookId,
                    user_id: userId,
                  })
                    .then(() => {
                      res.status(200).json({ message: 'Enjoy the book', bookName: book.bookName, borrower: username });
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
  const userId = req.decoded.user.id;
  const
    {
      username
    } = req.decoded.user.username;
  book.findOne({
    where: {
      id: req.params.bookId,
    },
  })
    .then(() => {
      if (!book) {
        res.status(400).send({ status: false, message: 'book not found' });
      } else {
        // To check if a user have actually borrowed the book to be returned
        borrowedBook.findOne({
          where: {
            user_id: userId,
            book_id: req.params.bookId,

          },
        })
          .then(() => {
            if (!borrowedBook) {
              res.status(400).send({ status: false, message: 'You have not borrowed this book' });
            } else {
              returnBook.create({
                user_id: userId,
                book_id: req.params.bookId
              })
                .then(() => {
                  res.status(200).json({ message: 'Thanks for the return', bookName: book.bookName, borrower: username });
                })
                .catch(error => res.status(400).send(error));
            }
          });
      }
    });
};
