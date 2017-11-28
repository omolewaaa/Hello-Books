

import models from '../models';

const {
  book, favorites,
} = models;


// Endpoints to make a book as favorites
exports.create = (req, res) => {
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
  // To confirm the existence of a book inside the database
    .then(() => {
      if (!book) {
        res.status(400).send({ status: false, message: 'book not found' });
      } else {
        // Code section to allow a user mark a book as favorite once
        favorites.findOne({
          where: {
            user_id: userId,
            book_id: req.params.bookId,
          },
        })
          .then(() => {
            if (favorites) {
              res.status(400).send({ status: false, message: 'You have earlier added this book to your favorites books' });
            } else {
              favorites.create({
                book_id: req.params.bookId,
                user_id: userId,
              })
                .then(() => {
                  res.status(200).json({ message: 'Book added as favorite', bookName: book.bookName, user: username });
                })
                .catch(error => res.status(400).send(error));
            }
          });
      }
    });
};


// Endpoint to get user's favorites books
exports.getFavorites = (req, res) => {
  const userId = req.decoded.user.id;
  favorites.findAll({
    where: {
      user_id: userId,

    },
  })
    .then(() => {
      if (favorites) {
        res.status(200).send({ message: 'favorite books', data: favorites });
      }
    })
    .catch(error => res.status(400).send(error));
};
