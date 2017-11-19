const user = require('../models').user;
const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
 const token = (req.body['x-access-token'] ) || (req.headers['x-access-token'] ) || (req.query['x-access-token'] )
  
    if (token) {
      jwt.verify(token, 'omolewa', (err, decoded)=> {
        if (err) {
          return res.send(err);
        } 
        else {
          req.decoded = decoded;
          const userId = decoded.id;
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






