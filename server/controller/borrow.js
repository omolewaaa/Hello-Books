const express = require('express');
const user = require('../models').user;
const book = require('../models').book;
const books = require('../models').book;
const borrow = require('../models').borrowedBook;
const borrowbook = require('../models').borrowedBook;






exports.create = (req, res) => {
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
      borrowbook.findOne({
    where: {
      user_id: userId,
      book_id: req.params.bookId,
      
    },
  })
  .then((borrowbook) => {
    if(borrowbook){
      res.status(400).send({ status: false, message:'You have earlier made this request'});
    }
    else{
      if (book.bookStatus !== "unavailable"){

     borrow.create ({
      book_id: req.params.bookId,
      user_id: userId,
     })
     .then((borrowBook) => {
       res.status(200).json({message: "Enjoy the book", "bookName": book.bookName, "borrower": username })
     })
     .catch(error => res.status(400).send(error));
    }
  
  else{
    res.status(400).json({message: "This book is currently unavailable"})
  }
}
});
}
});
}