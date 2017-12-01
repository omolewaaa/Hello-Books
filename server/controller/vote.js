

import models from '../models';
// import default from 'validator/lib/isFullWidth';

const {
  Book, Vote
} = models;

/**
 *
 *
 * @class VoteController
 */
class VoteController {
  /**
   *
   *
   * @static
   * @param {any} req
   * @param {any} res
   * @memberof VoteController
   * @returns {any} book object
   */
  static create(req, res) {
    const userId = req.decoded.foundUser.id;


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
          Vote.findOne({
            where: {
              user_id: userId,
              book_id: req.params.bookId,
            }
          })
            .then((vote) => {
              if (vote) {
                if (req.body.voteType === 'upVotes' || req.body.voteType === 'downVotes') {
                  // if (vote.voteType === req.body.voteType) {
                  if (vote.voteType === 'upVotes') {
                    book.decrement('upvotes');
                    book.increment('downvotes');
                    vote.update({ voteType: 'downVotes' });
                    // .then((votes) => {

                    // });
                    // }
                    res.status(200).send({ message: 'book downvoted successfully' });
                  } else if (vote.voteType === 'downVotes') {
                    book.increment('upvotes');
                    book.decrement('downvotes');
                    vote.update({ voteType: 'upVotes' });
          
                    res.status(200).send({ message: 'book upvoted successfully' });
                  }
                } else {
                  return res.status(400).send({ message: 'You can either upvote or downvote' });
                }
                // }
                // })
                //
              } else {
                Vote.create({
                  book_id: req.params.bookId,
                  user_id: userId,
                  voteType: req.body.voteType
                })
                  .then((votetype) => {
                    if (req.body.voteType === 'upVotes') {
                      book.increment('upvotes');
                      // book.decrement('downvotes');
                      res.status(200).send({
                        message: 'You have upvoted successfuly',
                        data: vote,
                        votetype
                      });
                    } else if (req.body.voteType === 'downVotes') {
                      book.increment('downvotes');
                      // book.decrement('upvotes');
                      res.status(200).send({ message: 'You have downvoted this book successfuly', data: vote });
                    }
                  })
                  .catch(error => res.status(400).send(error));
              // }
              // else {
              //  return res.status(400).send({ message: 'You can either upvote or downvote' });
              // }
              }
            });
        }
      });
  }
}
export default VoteController;
