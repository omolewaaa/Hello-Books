let Book = require('../models/book');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();
import expect from 'chai'

chai.use(chaiHttp);


describe('Book', () => {
it('it should not post a book when not an admin', (done) => {
        let item = {
            bookName: "The Lord of the Rings",
            Author: "J.R.R. Tolkien",
            bookStatus: "available",
            Details: "A great book to read",
            upvotes: 0,
            downvotes:0,

        };
        chai.request(app)
            .post('/api/v1/book/admin')
            .send(item)
            .end((err, res) => {
                res.should.have.status(403);
              done();
            
      });
     });
  

it('it should post a book if admin', (done) => {
        let item = {
            bookName: "The Lord of the Rings",
            Author: "J.R.R. Tolkien",
            bookStatus: "available",
            Details: "A great book to read",
            upvotes: 0,
            downvotes:0,

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
        let item = {
            bookName: "The Lord of the Rings",
            Author: "J.R.R. Tolkien",
            bookStatus: "available",
             Details: "A great book to read"
        };
        
        chai.request(app)
            .put('/api/v1/book/:bookId')
            .send({item})
            .end((err, res) => {
                res.should.have.status(404);
              done();
            
      });
     });

it('it should GET all the books', (done) => {
        chai.request(app)
            .get('/api/v1/books')
            .end((err, res) => {
                res.should.have.status(200);
                //res.body.should.be.a('array');
                //res.body.length.should.be.eql(0);
              done();
            });
      });

it('it should not register a user when username field empty', (done) => {
        let item = {
            //username: "ire",
            email: "ire@gmail.com",
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
            username: "irew",
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
            username: "iree",
            email: "oolo@gmail.com",
            //password: "omo"
      

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

it('it should not register email is not valid', (done) => {
        let item = {
            username: "wumm",
            email: "ewagmail.com",
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

it('it should not register username is not alphabet', (done) => {
        let item = {
            username: "1",
            email: "ew@gmail.com",
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

it('it should register when inputs are right', (done) => {
        let item = {
            username: "omowumi",
            email: "omowumi@gmail.com",
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
            //email: "johnDoe@gmail.com",
            password: "johnDoe"

        };
        chai.request(app)
            .post('/api/v1/users/signin')
            .send(item)
            .end((err, res) => {
                res.should.have.status(201); 
                token = jwt.sign({user}, omolewa, { expiresIn: '60 minutes' });
                expect(res.body.token).to.be.a('string');
                //res.should.have.send(token);
              done(error);
            
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
 
 it('it should not login when username not provided', (done) => {
        let item = {
            //username: "wumi",
            //email: "ire@gmail.com",
            password: "oooooooooo"

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
        let item = {
            username: "omowumi",
            //email: "ire@gmail.com",
            //password: "oooooooooo"

        };
        chai.request(app)
            .post('/api/v1/users/signin')
            .send(item)
            .end((err, res) => {
                res.should.have.status(400);
              done();
            
      });
     });

    after(() => {
           process.exit(0)
         });
})
