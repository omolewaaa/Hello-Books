import express from 'express';
import book from '../models/book';
import review from '../models/review';

//Endpoint for authenticated users to ggive reviews
exports.create = (req, res) => {
	const userId = req.decoded.user.id;

	book.findOne({
    where: {
      id: req.params.bookId,
    },
  })
  .then((book) => {
    if(!book){
      res.status(400).send({ status: false, message:'book not found'});
    }
    else {
    	if (!req.body.review){
          res.status(400).send("Kindly fill the review space to post a review");
        }
       
    	review.create({
    		user_id: userId,
    		book_id: req.params.bookId,
    		review: req.body.review,
    	})
    	.then((review) => {
    		res.status(200).send({ status: true, message: 'Your review has been posted successfully'})
    	})
    	.catch(error => res.status(400).send(error));
    }
   })
  }