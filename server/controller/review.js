
import models from '../models';
// import default from './favorites';

const {
  Book, Review
} = models;

/**
 *
 *
 * @class ReviewController
 */
class ReviewController {
/**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @memberof ReviewController
 * @returns {any} book object
 */
  static create(req, res) {
    const userId = req.decoded.foundUser.id;

    Book.findOne({
      where: {
        id: req.params.bookId,
      },
    })
      .then((book) => {
        if (!book) {
          res.status(400).send({ status: false, message: 'book not found' });
        } else {
          if (!req.body.review) {
            res.status(400).send('Kindly fill the review space to post a review');
          }

          Review.create({
            user_id: userId,
            book_id: req.params.bookId,
            review: req.body.review,
          })
            .then((review) => {
              res.status(200).send({ status: true, message: 'Your review has been posted successfully', review });
            })
            .catch(error => res.status(400).send(error));
        }
      });
  }
}
export default ReviewController;
