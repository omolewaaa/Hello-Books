/* import chai from 'chai';
import jwt from 'jsonwebtoken';
// import models from '../models'


const user = require('../models/user');
const book = require('../models/book');

const chaiHttp = require('chai-http');
const app = require('../app');

// const should = chai.should();

chai.use(chaiHttp);


describe('Book', () => {
  it('it should post a book', (done) => {
    const userData = {
      username: 'gift',
      password: 'chick',
      email: 'chick@gmail.com',
      role: 'admin'
    };

    const bookData = {
      user_id: 1,
      bookName: 'fish',
      Author: 'james',
      bookStatus: 'available',
      Details: 'fanstastic book'
    };
    user.create(userData).then(() => {
      const token = jwt.sign(
        { user },
        'omolewa', {
          expiresIn: '60 minutes'
        }
      );
      chai.request(app)
        .post('/api/v1/book/admin')
        .send(bookData)
        .set('Headers', token)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });


  // it('it should login a user when inputs are right', (done) => {
  const item = {
    username: 'John',
    email: 'johnDoe@gmail.com',
    password: 'johnDoe'

  };
  chai.request(app)
    .post('/api/v1/users/signin')
    .send(item);
  const token = jwt.sign(
    { user },
    'omolewa', {
      expiresIn: '60 minutes'
    }
  );
  // .end((err, res) => {
  // res.should.have.status(201);
  // done();
  // });
  // });

  it('it should post if bookName empty', (done) => {
    const bookData = {
      // user_id: 1,
      // bookName: 'fish',
      Author: 'james',
      bookStatus: 'available',
      Details: 'fanstastic book'
    };
    chai.request(app)
      .post('/api/v1/book/admin')
      .send(bookData)
      .set('Accept', 'application/json')
      .set('Authorization', token)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
    // });
  });
it('it should not register a user when username field empty', (done) => {
        let item = {
            //username: "ire",
            email: "oooooooooo@gmail.com",
            password: "omo"


        };
        chai.request(app)
            .post('/api/v1/users/signup')
            .send(item)
            .end((err, res) => {
                res.should.have.status(400);
              done();

      });
     });


it('it should not register a user when email field empty', (done) => {
        let item = {
            username: "ire",
            //email: "oooooooooo@gmail.com",
            password: "omo"


        };
        chai.request(app)
            .post('/api/v1/users/signup')
            .send(item)
            .end((err, res) => {
                res.should.have.status(400);
              done();

      });
     });

it('it should not register a user when password not provided', (done) => {
        let item = {
            username: "ire",
            email: "oooooooooo@gmail.com",
            password: "omo"


        };
        chai.request(app)
            .post('/api/v1/users/signup')
            .send(item)
            .end((err, res) => {
                res.should.have.status(400);
              done();

      });
     });

it('it should not register a user when username already exist', (done) => {
        let item = {
            username: "ire",
            email: "oooooooooo@gmail.com",
            password: "omo"


        };
        chai.request(app)
            .post('/api/v1/users/signup')
            .send(item)
            .end((err, res) => {
                res.should.have.status(400);
              done();

      });
     });


it('it should not register a user when email already exist', (done) => {
        let item = {
            username: "wummy",
            email: "ewa@gmail.com",
            password: "omo"
            //role:  "user"

        };
        chai.request(app)
            .post('/api/v1/users/signup')
            .send(item)
            .end((err, res) => {
                res.should.have.status(400);
              done();

      });
     });

it('it should login a user when inputs are right', (done) => {
        let item = {
            username: "John",
            email: "johnDoe@gmail.com",
            password: "johnDoe"

        };
        chai.request(app)
            .post('/api/v1/users/signin')
            .send(item)
            .end((err, res) => {
                res.should.have.status(201);
              done();

      });
     });


it('it should not login when password does not match', (done) => {
        let item = {
            username: "irewumi",
            //email: "ire@gmail.com",
            password: "oooooooooo"

        };
        chai.request(app)
            .post('/api/v1/users/signin')
            .send(item)
            .end((err, res) => {
                res.should.have.status(404);
              done();

      });
     });


it('it should not login when user does not exist', (done) => {
        let item = {
            username: "wumi",
            //email: "ire@gmail.com",
            password: "oooooooooo"

        };
        chai.request(app)
            .post('/api/v1/users/signin')
            .send(item)
            .end((err, res) => {
                res.should.have.status(404);
              done();

      });
     });

  after(() => {
    process.exit(0);
  });
});
 */
