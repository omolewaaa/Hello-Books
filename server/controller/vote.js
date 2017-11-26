const express = require('express');
const user = require('../models').user;
const book = require('../models').book;
const books = require('../models').book;
const vote = require('../models').vote;
const votes = require('../models').vote;




exports.create = (req, res) => {
  const userId = req.decoded.user.id;
  const username = req.decoded.user.username;
  //const count = 1

//To check the existence of a book
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

   vote.findOne({
   	where:{
   	  user_id: userId,
      book_id: req.params.bookId,
   	}
   })
   	.then((vote) =>{
   		if(vote){
   			if (vote.voteType === req.body.voteType){
   				res.status(400).send({message: 'You have already voted this book with this voteType' })
   			}
   			else{
   				vote.update({ voteType: req.body.voteType })
   				.then((vote) => {

   					//})
   				let count = 1
   				const up = books.upvotes = ++count;
  				if (req.body.voteType === "upVotes"){
  					//books.update({ upvotes: ++count })

  					books.upvotes =++count 
  					//.then((books) => {
  					res.status(200).send({message: "You have upvoted successfuly"})
  				//})
  				}
  				else{
  					books.downvotes =+ 1,
  					res.status(200).send({message: "You have downvoted this book successfuly"})
  				}
  			})
   			}
   		}
   		else{
   			votes.create({
   			book_id: req.params.bookId,
    		user_id: userId,
    		voteType: req.body.voteType
   			})
   			.then((votes) => {

   				if (req.body.voteType === "upVotes"){
  					//books.upvotes.increment('number')
  					res.status(200).send({message: "You have upvoted successfuly", data: votes})
  					//books.upvotes =++count
  					
  				}

  				else{
  					books.downvotes =+ 1,
  					res.status(200).send({message: "You have downvoted this book successfuly", data: votes})
  				}
   			})
   			.catch(error => res.status(400).send(error));
   		}
   	})
	//}
  // })
}
})
}