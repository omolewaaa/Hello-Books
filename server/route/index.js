const usersController = require('../controller/user');
//let verifyToken = require('../middlewares/middlewares');
//const loginController = require('../controller').login;


module.exports = (app) => {
  app.get('/api', (req, res) => res.status(200).send({
    message: 'welcome to postit application.',
  }));

  app.post('/api/users/signup', usersController.create);
  app.post('/api/users/signin', usersController.login);
}