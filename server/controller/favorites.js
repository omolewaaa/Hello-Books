const express = require('express');
const user = require('../models').user;
const book = require('../models').book;
const favorites = require('../models').favorites;
const favorite = require('../models').favorites;


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
      favorite.findOne({
    where: {
      user_id: userId,
      book_id: req.params.bookId,
    
    },
  })
  .then((favorite) => {
    if (favorite){
      res.status(400).send({ status: false, message:'You have earlier added this book to your favorites books'});
    }
    else{
      favorites.create ({
      book_id: req.params.bookId,
      user_id: userId,
     })
     .then((favorites) => {
       res.status(200).json({message: "Book added as favorite", "bookName": book.bookName, "user": username })
     })
     .catch(error => res.status(400).send(error));
    }
  })
}
})
  }



  exports.getFavorites = (req, res) => {
  const userId = req.decoded.user.id;
  const username = req.decoded.user.username;
  favorites.findAll({
    where: {
      user_id: userId,
      //book_id: req.params.bookId,
    },
  })
  .then((favorites) => {
    if(favorites){
      res.status(200).send({ message:'favorite books', data: favorites});
    }
  })
  .catch(error => res.status(400).send(error));
}