import bcrypt from 'bcryptjs';
import validator from 'validator';
import jwt from 'jsonwebtoken';
import models from '../models';
// import default from './book';

const {
  User
} = models;

const saltRounds = 10;
const salt = bcrypt.genSaltSync(saltRounds);

/**
 *
 *
 * @class UserController
 */
class UserController {
// Endpoint for users to register

/**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @memberof UserController
 * @returns {any} user object
 */
  static create(req, res) {

    if (!req.body.username) {
      res.status(400).send('kindly enter your desired username');
    } else if (!req.body.email) {
      res.status(400).send('Please enter your email');
    } else if (!req.body.password) {
      res.status(400).send('Please enter your password');
    } else if (!validator.isAlpha(req.body.username)) {
      res.status(400).send('Only letters are allowed as username');
    }

    else if (!validator.isEmail(req.body.email)) {
      res.status(400).send('Invalid email');
    }
    else if (!validator.isAlphanumeric(req.body.password)) {
      res.send('password must contain number and alphabet');
    }

    User.findOne({
      where: {
        username: req.body.username,
      },
    })
      .then((existingusername) => {
        if (existingusername) {
          res.status(400).send({ status: false, message: 'Username already exist' });
        } else {
          // To get uniqueness of email
          User.findOne({
            where: {
              email: req.body.email,
            },
          })
            .then((existingemail) => {
              if (existingemail) {
                res.status(400).send({ status: false, message: 'email already exist' });
              } else {
                User.create({
                  username: req.body.username,
                  email: req.body.email,
                  password: bcrypt.hashSync((req.body.password), salt)
                })
                  .then((foundUser) => {
                    const token = jwt.sign(
                      { foundUser },
                      'omolewa', {
                        expiresIn: '60 minutes'
                      }
                    );
                    res.status(200).send({
                      status: true,
                      message: 'You are registered Successfully',
                      userId: foundUser.id,
                      username: foundUser.username,
                      email: foundUser.email,
                      role: foundUser.role,
                      token
                    });
                  })
                  .catch(error => res.status(400).send(error));
              }
            });

        }
      });
  }

  // code for users to login
  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @memberof UserController
 * @returns {any} book object
 */
  static login(req, res) {
    const {
      password
    } = req.body;
    if (!req.body.username) {
      res.send('Enter your username');
    }

    if (!req.body.password) {
      res.send('Please enter your password');
    } else {
      User.findOne({
        where: {
          username: req.body.username,
        },
      })
      // To check if user already signup
        .then((foundUser) => {
          if (!foundUser) {
            res.status(404).send({ message: 'User not found' });
          }

          if (foundUser) {
            if (bcrypt.compareSync(password, foundUser.password)) {
              const token = jwt.sign(
                { foundUser },
                'omolewa', {
                  expiresIn: '60 minutes'
                }
              );

              res.status(201).send({ message: 'logged in successfully', token });
            } else {
              res.status(404).send({ message: 'confirm username or password' });
            }
          }
        });
    }
  }

  /**
 *
 *
 * @static
 * @param {any} req
 * @param {any} res
 * @memberof UserController
 * @returns {any} user object
 */
  static logout(req, res) {
    const userId = req.decoded.foundUser.id;
    const {
      username
    } = req.decoded.User.username;

    return res.status(200).send({ message: 'You have successfully logged out', user_id: userId, username });
  }
}
export default UserController;
