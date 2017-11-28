const Book = require('../models/book');

const chai = require('chai');
const chaiHttp = require('chai-http');
const app = require('../app');

// const should = chai.should();

chai.use(chaiHttp);


describe('Books', () => {
  describe('/POST/api/v1/books', () => {
    it('it should post a book when all input supplied', (done) => {
      const item = {
        bookName: 'The Lord of the Rings',
        Author: 'J.R.R. Tolkien',
        bookStatus: 'available'
      };
      chai.request(app)
        .post('/api/v1/books')
        .send(item)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });

    it('it should not post if status is neither unavailable or available', (done) => {
      const item = {
        bookName: 'The Lord of the Rings',
        Author: 'J.R.R. Tolkien',
        bookStatus: 'avai'
      };
      chai.request(app)
        .post('/api/v1/books')
        .send(item)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });

    it('it should not post book name is a number', (done) => {
      const item = {
        bookName: 1,
        Author: 'J.R.R. Tolkien',
        bookStatus: 'available'
      };
      chai.request(app)
        .post('/api/v1/books')
        .send(item)
        .end((err, res) => {
          res.should.have.status(500);
          done();
        });
    });


    it('it should put a book when all input supplied correctly', (done) => {
      const item = {
        bookName: 'The Lord of the Rings',
        Author: 'J.R.R. Tolkien',
        bookStatus: 'available'
      };

      chai.request(app)
        .put('/api/v1/books/:bookId')
        .send({ item })
        .end((err, res) => {
          res.should.have.status(201);
          // res.should.be.json;
          // res.body.should.be.a('object');
          // res.body.should.have.property('UPDATED');
          // res.body.UPDATED.should.be.a('object');
          // res.body.UPDATED.should.have.property('bookName, Author, bookStatus');
          // res.body.UPDATED.should.have.property('_bookId');
          // res.body.UPDATED.name.should.equal('item')
          done();
        });
    });

    it('it should GET all the books', (done) => {
      chai.request(app)
        .get('/api/v1/books')
        .end((err, res) => {
          res.should.have.status(200);
          // res.body.should.be.a('array');
          // res.body.length.should.be.eql(0);
          done();
        });
    });

    it('it should post book currently unavailable to borrow', (done) => {
      const item = {
        bookName: 'The Lord of the Rings',
        Author: 'J.R.R. Tolkien',
        bookStatus: 'unavailable'
      };
      chai.request(app)
        .post('/api/v1/:userId/borrow/:bookId')
        .send(item)
        .end((err, res) => {
          res.should.have.status(404);
          done();
        });
    });

    it('it should post approve to borrow if book available', (done) => {
      const item = {
        bookName: 'Heather',
        Author: 'Irwin Cantu',
        bookStatus: 'available'
      };
      chai.request(app)
        .post('/api/v1/:userId/borrow/:bookId')
        .send(item)
        .end((err, res) => {
          res.should.have.status(200);
          done();
        });
    });
  });

  after(() => {
    process.exit(0);
  });
});
