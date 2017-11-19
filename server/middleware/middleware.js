const user = require('../models').user;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 const token = (req.body['x-access-token'] ) || (req.headers['x-access-token'] ) || (req.query['x-access-token'] )
  
    if (token) {
      jwt.verify(token, 'omolewa', (err, decoded)=> {
        if (err) {
          return res.send(err);
        } 
        //else if (decoded.exp - parseInt(new Date().getTime() / 1000)) {}
        //  .then(expiration => redis.set(req.body.token, true, 'EX', expiration)))
        //}
        else {
          req.decoded = decoded;
          next();
      
          }
      
        });
      }
    else {
      return res.status(403).send({ 
       success: false, 
       message: 'No token provided.' 
      });
    }
  }