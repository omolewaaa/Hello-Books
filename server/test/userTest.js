
// let Book = require('../models/book');

import chai from 'chai';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

const chaiHttp = require('chai-http');
const app = require('../app');
const user = require('../models/user')


// const should = chai.should();

chai.use(chaiHttp);

describe('users', () => {
  it('it should not register a user when username field empty', (done) => {
    const item = {
      // username: "ire",
      email: 'ire@gmail.com',
      password: 'omo',


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
    const item = {
      username: 'irew',
      // email: "oooooooooo@gmail.com",
      password: 'omo',


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
    const item = {

      username: 'iree',
      email: 'oolo@gmail.com',
      // password: "omo"



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
    const item = {
      username: 'ire',
      email: 'oooooooooo@gmail.com',

      password: 'omo',

      


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
    const item = {
      username: 'wummy',
      email: 'ewa@gmail.com',

      password: 'omo',
      // role:  "user"

    };
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should not register email is not valid', (done) => {
    const item = {
      username: 'wumm',
      email: 'ewagmail.com',
      password: 'omo',
      // role:  "user"

    };
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should not register username is not alphabet', (done) => {
    const item = {
      username: '1',
      email: 'ew@gmail.com',
      password: 'omo',
      // role:  "user"

    };
    chai.request(app)
      .post('/api/v1/users/signup')
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should register when inputs are right', (done) => {
    const item = {
      username: 'omowumi',
      email: 'omowumi@gmail.com',
      password: 'omo',

      // role:  "user"

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
    const item = {
      username: 'John',

      // email: "johnDoe@gmail.com",
      password: 'johnDoe',


    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(item)
      .end((err, res) => {
        res.should.have.status(201);

        // token = jwt.sign({user}, omolewa, { expiresIn: '60 minutes' });
        // expect(res.body.token).to.be.a('string');
        // res.should.have.send(token);

        done();
      });
  });


  it('it should not login when password does not match', (done) => {
    const item = {
      username: 'irewumi',
      // email: "iret
      password: 'oooooooooo',

      

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
    const item = {
      username: 'wumi',
      // email: "ire@gmail.com",

      password: 'oooooooooo',

    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(item)
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });


  it('it should not login when username not provided', (done) => {
    const item = {
      // username: "wumi",
      // email: "ire@gmail.com",
      password: 'oooooooooo',

    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should not login when password not provided', (done) => {
    const item = {
      username: 'omowumi',
      // email: "ire@gmail.com",
      // password: "oooooooooo"

    };
    chai.request(app)
      .post('/api/v1/users/signin')
      .send(item)
      .end((err, res) => {
        res.should.have.status(400);
        done();
      });
  });

  it('it should not post a book when not an admin', (done) => {
    const item = {
      bookName: 'The Lord of the Rings',
      Author: 'J.R.R. Tolkien',
      bookStatus: 'available',
      Details: 'A great book to read',
      upvotes: 0,
      downvotes: 0,

    };
    chai.request(app)
      .post('/api/v1/book/admin')
      .send(item)
      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
  });

  it('it should not put a book when book not found ', (done) => {
    const item = {
      bookName: 'The Lord of the Rings',
      Author: 'J.R.R. Tolkien',
      bookStatus: 'available',
      Details: 'A great book to read',
    };

    chai.request(app)
      .put('/api/v1/book/:bookId')
      .send({ item })
      .end((err, res) => {
        res.should.have.status(404);
        done();
      });
  });


  it('it should post borrow if token not provided', (done) => {
    chai.request(app)
      .post('/api/v1/users/borrow/:bookId')
      .send()

      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    // });
  });

  it('it should post borrow if token not provided', (done) => {
    chai.request(app)
      .post('/api/v1/users/return/:bookId')
      .send()

      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    // });
  });

  it('it should put if token not provided', (done) => {
    chai.request(app)
      .put('/api/v1/book/:userId/return/:bookId')
      .send()

      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    // });
  });

  it('it should post borrow if token not provided', (done) => {
    chai.request(app)
      .put('/api/v1/book/:userId/borrow/:bookId')
      .send()

      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    // });
  });

  it('it should post review if token not provided', (done) => {
    const review = {
      review: 'a good read',
    };
    chai.request(app)
      .post('/api/v1/users/review/:bookId')
      .send(review)

      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    // });
  });

  it('it should post upvote if token not provided', (done) => {
    const vote = {
      review: 'upVotes',
    };
    chai.request(app)
      .post('/api/v1/vote/:bookId')
      .send(vote)

      .end((err, res) => {
        res.should.have.status(403);
        done();
      });
    // });
  });

  it('it should mark favorites if token not provided', (done) => {
    chai.request(app)
      .post('/api/v1/users/:bookId/favbook')
      .send()

      .end((err, res) => {
        res.should.have.status(403);

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

  after(() => {
    process.exit(0);
  });
});
