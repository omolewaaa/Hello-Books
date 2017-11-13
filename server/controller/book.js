const express = require('express');
const validator = require('validator');
const jwt    = require('jsonwebtoken');
const user = require('../models').user;
const book = require('../models').book;
const books = require('../models').book;


exports.create = (req, res) => {
	const userId = req.decoded.user.id;
  const name = req.decoded.user.role

    if(name !== "admin"){
      res.status(400).send({ status: false, message:'Unauthorised'});
    }

    books.findOne({
    where: {
      bookName: req.body.bookName,
    },
  })
  .then((books) => {
    if(books){
      res.status(400).send({ status: false, message:'This book has been added'});
    }

	 else{
    if (!req.body.bookName){
          res.status(400).send("Please enter the name of the book");
        }
        else if (!req.body.Author){
          res.status(400).send("Please enter the Author's name");
        }
        else if(!req.body.bookStatus){
          res.status(400).send("Please the status of the book");
        }

        else
        
          if (!validator.isAlpha(req.body.bookName)){
               res.status(400).send("Name of book should be letters")
          }
          
         
        if (req.body.bookStatus === "available" || req.body.bookStatus === "unavailable") { 
          //const name = req.decoded.user.role;
        book.create ({

        bookName: req.body.bookName,
    	  Author : req.body.Author,
    	  bookStatus: req.body.bookStatus,
    	  user_id: userId
        })
        .then((book) => {
            res.status(200).send({ status: true, message:'You are registered Successfully', "bookName": book.bookName, "Author": book.Author, 
             "bookStatus": book.bookStatus, name});
        })
          .catch(error => res.status(400).send(error));
      }
        else{
          return res.status(500).json({ status: false, message: "books can either be available or unavailable"});
       }
     }  
       
	//}
  
});
}

exports.modify = (req, res) => {
  const userId = req.decoded.user.id;
  const name = req.decoded.user.role;
  books.findOne({
    where: {
      id: req.params.bookId,
    },
  })
  .then((book) => {
    if(!book){
      res.status(400).send({ status: false, message:'book not found'});
    }

else{
if(name !== "admin"){
      res.status(400).send({ status: false, message:'Unauthorised'});
    }

  else {
    bookName = req.body.bookName;
       Author = req.body.Author;
       bookStatus = req.body.bookStatus;
       user_id: userId  

    //if (!validator.isAlpha(req.body.bookName)){
      //  res.status(400).send("Name of book should be letters")
       //   }
       if (req.body.bookStatus === "available" || req.body.bookStatus === "unavailable") {
      res.status(201).json({message:'book modified successfully', "data": req.body});
    }
    else {
      return res.status(500).json({ status: false, message: "books can either be available or unavailable"});
    }
      
     // return res.status(201).json({item});
  }
}
});
}

exports.getAllBooks = (req, res) => {

  res.json(books);
}