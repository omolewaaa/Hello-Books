

import models from '../models';

const {
  book, vote
} = models;


exports.create = (req, res) => {
  const userId = req.decoded.user.id;


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
        vote.findOne({
          where: {
            user_id: userId,
            book_id: req.params.bookId,
          }
        })
          .then(() => {
            if (vote) {
              if (req.body.voteType === 'upVotes' || req.body.voteType === 'downVotes') {
                if (vote.voteType === req.body.voteType) {
                  res.status(400).send({ message: `You have already  ${req.body.voteType} this book` });
                } else {
                  vote.update({ voteType: req.body.voteType })
                    .then(() => {
                      if (req.body.voteType === 'upVotes') {
                        book.increment('upvotes');
                        book.decrement('downvotes');

                        res.status(200).send({ message: 'You have upvoted successfuly' });
                      } else if (req.body.voteType === 'downVotes') {
                        book.increment('downvotes');
                        book.decrement('upvotes');
                        res.status(200).send({ message: 'You have downvoted this book successfuly' });
                      }
                    });
                }
              } else {
                return res.status(400).send({ message: 'You can either upvote or downvote' });
              }
            } else if (req.body.voteType === 'upVotes' || req.body.voteType === 'downVotes') {
              vote.create({
                book_id: req.params.bookId,
                user_id: userId,
                voteType: req.body.voteType
              })
                .then(() => {
                  if (req.body.voteType === 'upVotes') {
                    book.increment('upvotes');
                    res.status(200).send({ message: 'You have upvoted successfuly', data: vote });
                  } else if (req.body.voteType === 'downVotes') {
                    book.increment('downvotes');
                    res.status(200).send({ message: 'You have downvoted this book successfuly', data: vote });
                  }
                })
                .catch(error => res.status(400).send(error));
            } else {
              return res.status(400).send({ message: 'You can either upvote or downvote' });
            }
          });
      }
    });
};

