const express = require('express');
//const bcrypt = require('bcryptjs');
//const saltRounds = 10;
//const salt = bcrypt.genSaltSync(saltRounds);
const validator = require('validator');
//const jwt    = require('jsonwebtoken');
const users = require('../models').user;
const email = require('../models').user;
const user = require('../models').user;



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
          res.send("kindly enter your desired username");
        }
        else if (!req.body.email){
          res.send("Please enter your email");
        }
        else if(!req.body.password){
          res.send("Please enter your password");
        }
        else{
           len =5;
        
          if (!validator.isAlpha(req.body.username)){
                res.send("Only letters are allowed as username")
          }
          
          if (!validator.isEmail(req.body.email)) {
                res.send('Invalid email');
               }
          if (!validator.isAlphanumeric(req.body.password)){
             res.send("password must contain number and alphabet")
          }
          if ((req.body.password) < len){
                res.send("Password must be at least six character long")
          }

        user.create ({
        username: req.body.username,
        email: req.body.email,
        password : req.body.password
        })
          .then((user) => {
            res.status(200).send({ status: true, message:'You are registered Successfully', "username": user.username, "email": user.email});
        })
          .catch(error => res.status(400).send(error));
        } 
    
      });
  
    }

   });


};

//code for users to login

/*exports.login = (req, res) => {
  users.findOne({
    where: {
      username: req.body.username,
    },
  })

  .then((users) => {
    if(!users){
      res.status(404).send({message:'User not found'});
      }
      
   // else {
     // if (users.username !== users.password){
      //  res.status(404).send({message: "confirm username or password"})
     // }
    else {
      const token = jwt.sign({users
    },
      "omolewa", {
          expiresIn: '3 days'
        });

        res.status(201).send({message:'logged in successfully', token:token});
      }
    });
};


*/