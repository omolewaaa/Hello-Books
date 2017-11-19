const express = require('express');

const bcrypt = require('bcryptjs');
const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);
const validator = require('validator');
const jwt    = require('jsonwebtoken');
const users = require('../models').user;
const email = require('../models').user;
const user = require('../models').user;
const book = require('../models').book;
const borrowBook = require('../models').borrowedbook;


//Endpoint for users to register

// To get uniqueness of username
exports.create = (req, res) => {
	users.findOne({
    where: {
      username: req.body.username,
    },
  })
  .then((users) => {
    if(users){
      res.status(400).send({ status: false, message:'Username already exist'});
    }
    else{
      // To get uniqueness of email
      email.findOne({
      where: {
      email: req.body.email,
      },
    })
      .then((email) => {
        if(email){
          res.status(400).send({ status: false, message:'email already exist'});
        }
        
       else
        if (!req.body.username){
          res.status(400).send("kindly enter your desired username");
        }
        else if (!req.body.email){
          res.status(400).send("Please enter your email");
        }
        else if(!req.body.password){
          res.status(400).send("Please enter your password");
        }
        
        else
        
        
          if (!validator.isAlpha(req.body.username)){
               res.status(400).send("Only letters are allowed as username")
          }
          
          if (!validator.isEmail(req.body.email)) {
                res.status(400).send('Invalid email');
               }
          if (!validator.isAlphanumeric(req.body.password)){
             res.send("password must contain number and alphabet")
          }
          
           
        user.create ({
        username: req.body.username,
        email: req.body.email,
        password : bcrypt.hashSync((req.body.password), salt)
        })
          .then((user) => {
            res.status(200).send({ status: true, message:'You are registered Successfully', "userId": user.id, "username": user.username, "email": user.email,  "role": user.role});
        })
          .catch(error => res.status(400).send(error));
        
       
      });
  
    }


   });


};

//code for users to login

exports.login = (req, res) => {
  const username = req.body.username;
  const password = req.body.password;


  if (!req.body.username){
    res.send("Enter your username");
  }
        
  if(!req.body.password){
    res.send("Please enter your password");
  }
  else {
  user.findOne({
    where: {
      username: req.body.username,
    },
  })
//To check if user already signup
  .then((user) => {
    if(!user){
      res.status(404).send({message:'User not found'});
      }
    
    if (user) {
      
      if (bcrypt.compareSync(password, user.password)) {

      const token = jwt.sign({user
    },
      "omolewa", {
          expiresIn: '60 minutes'
        });

        res.status(201).send({message:'logged in successfully', token:token});
      }
    
  
      else {
        res.status(404).send({message: "confirm username or password"})
           }
      }
    });
  }
};





exports.logout = (req, res) => {
  const userId = req.decoded.user.id;
    user.findById(userId)
      .then((user) => {
        user.update({ active: false })
          .then(() =>
            res.status(200)
              .send({
                message: 'You have successfully logged out'
              }));
      });
  }