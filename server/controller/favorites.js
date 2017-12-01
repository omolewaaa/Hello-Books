

import models from '../models';
// import default from './book';

const {
  Book, Favorites,
} = models;


/**
 *
 *
 * @class FavoritesController
 */
class FavoritesController {
/**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @memberof FavoritesController
 * @returns {any} favorites object
 */
  static create(req, res) {
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
    // To confirm the existence of a book inside the database
      .then((book) => {
        if (!book) {
          res.status(400).send({ status: false, message: 'book not found' });
        } else {
        // Code section to allow a user mark a book as favorite once
          Favorites.findOne({
            where: {
              user_id: userId,
              book_id: req.params.bookId,
            },
          })
            .then((favorites) => {
              if (favorites) {
                res.status(400).send({ status: false, message: 'You have earlier added this book to your favorites books' });
              } else {
                Favorites.create({
                  book_id: req.params.bookId,
                  user_id: userId,
                })
                  .then((favorite) => {
                    res.status(200).json({
                      message: 'Book added as favorite',
                      favorite,
                      bookName: Book.bookName,
                      user: username
                    });
                  })
                  .catch(error => res.status(400).send(error));
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
 * @memberof FavoritesController
 * @returns {any} book object
 */
  static getFavorites(req, res) {
    const userId = req.decoded.foundUser.id;
    Favorites.findAll({
      where: {
        user_id: userId,

      },
    })
      .then((favorites) => {
        if (favorites) {
          res.status(200).send({ message: 'favorite books', favorite: favorites });
        }
      })
      .catch(error => res.status(400).send(error));
  }
}
export default FavoritesController;
