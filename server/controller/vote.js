import express from 'express';
import user from '../models/user';
import book from '../models/book';
import books from '../models/book';
import vote from '../models/vote';
import votes from '../models/vote';




exports.create = (req, res) => {
  const userId = req.decoded.user.id;
  const username = req.decoded.user.username;

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
   			if (req.body.voteType === "upVotes" || req.body.voteType === "downVotes") {
   			if (vote.voteType === req.body.voteType){
   				res.status(400).send({message: `You have already  ${req.body.voteType} this book` })
   			}
   			else{

   				vote.update({ voteType: req.body.voteType })
   				.then((vote) => {

  				if (req.body.voteType === "upVotes"){
  					
  					book.increment('upvotes')
  					book.decrement('downvotes')

  					res.status(200).send({message: "You have upvoted successfuly"})
  				}
  				else if (req.body.voteType === "downVotes"){
  					book.increment('downvotes')
            book.decrement('upvotes')
  					res.status(200).send({message: "You have downvoted this book successfuly"})
  				}
  			
  			
  			})
   			}
   			}
   			else{
   			return res.status(400).send({message: "You can either upvote or downvote"})
   			}
   		}
   		else{
   			if (req.body.voteType === "upVotes" || req.body.voteType === "downVotes"){
   			votes.create({
   			book_id: req.params.bookId,
    		user_id: userId,
    		voteType: req.body.voteType
   			})
   			.then((votes) => {
   			
   				if (req.body.voteType === "upVotes"){
  					book.increment('upvotes')
  					res.status(200).send({message: "You have upvoted successfuly", data: votes})
  					
  				}

  				else if (req.body.voteType === "downVotes"){
  					book.increment('downvotes')
  					res.status(200).send({message: "You have downvoted this book successfuly", data: votes})
  				}
  			
   			})
   			.catch(error => res.status(400).send(error));
   		}
   		else{
   			return res.status(400).send({message: "You can either upvote or downvote"})
   		}
   		}

   	})
	
}

})
}