
import jwt from 'jsonwebtoken';
// import models from '../models';

/* const {
  user
} = models;
*/
module.exports = (req, res, next) => {
  // const name = req.decoded.user.role;

  // To restrict users to access the endpoint except the admin
  if (req.decoded.foundUser.role !== 'admin') {
    return res.status(403).send({ status: false, message: 'Unauthorised' });
  }
  next();
};

