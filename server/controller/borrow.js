const express = require('express');
const user = require('../models').user;
const book = require('../models').book;
const books = require('../models').book;
const borrow = require('../models').borrowedBook;
const borrowbook = require('../models').borrowedBook;
const Returned = require('../models').returnBook;
const bookReturn = require('../models').returnBook;

//Endpoint to borrow a book
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

//To check if a user who borrowed a particular book has returned it in order to borrow it again
  borrowbook.findOne({
    where: {
      user_id: userId,
      book_id: req.params.bookId,
      //returnedStatus : false,  
    },
  })
  .then((borrowbook) => {
    if (borrowbook){
    bookReturn.findOne({
    where: {
      user_id: userId,
      book_id: req.params.bookId,
    },
  })
  .then((bookReturn) => {

    if((bookReturn !== borrowbook)){
    //if(borrowbook !== bookReturn){
       res.status(400).send({ status: false, message:'You have earlier made this request'});
     }
       else{
      if (book.bookStatus !== "unavailable"){

  borrow.create ({
    book_id: req.params.bookId,
    user_id: userId,
  })
  .then((borrow) => {
    res.status(200).json({message: "Enjoy the book", "bookName": book.bookName, "borrower": username })
  })
  .catch(error => res.status(400).send(error));
    }
  
    else{
     res.status(400).json({message: "This book is currently unavailable"})
    }
  }

  })

  }

  });

  }

  });

}


//Endpoint for user to return book
exports.returnbook = (req, res) => {
  const userId = req.decoded.user.id;
  const username = req.decoded.user.username;
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

//To check if a user have actually borrowed the book to be returned
  borrowbook.findOne({
    where: {
      user_id: userId,
      book_id: req.params.bookId,
      
    },
  })
  .then((borrowbook) => {

    if(!borrowbook){
      res.status(400).send({ status: false, message:'You have not borrowed this book'});
    }
    else{
  bookReturn.create ({
      user_id: userId,
      book_id: req.params.bookId
     })
     .then((bookReturn) => {
       res.status(200).json({message: "Thanks for the return", "bookName": book.bookName, "borrower": username })

     })
     .catch(error => res.status(400).send(error));
    };
  })
  }
  })
}