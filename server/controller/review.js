const express = require('express');
const book = require('../models').book;
const review = require('../models').review;

//Endpoint for authenticated users to give reviews
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
    		res.status(200).send({ status: false, message: 'Your review has been posted successfully'})
    	})
    	.catch(error => res.status(400).send(error));
    }
   })
  }