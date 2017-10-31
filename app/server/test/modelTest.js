
let Book = require('../models/book');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

chai.use(chaiHttp);



describe('Books', () => {
  describe('/POST/api/v1/books', () => {
      it('it should post a book when all input supplied', (done) => {
        let item = {
            bookName: "The Lord of the Rings",
            Author: "J.R.R. Tolkien",
            bookStatus: "available"
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
        let item = {
            bookName: "The Lord of the Rings",
            Author: "J.R.R. Tolkien",
            bookStatus: "avai"
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
        let item = {
            bookName: 1,
            Author: "J.R.R. Tolkien",
            bookStatus: "available"
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
        let item = {
            bookName: "The Lord of the Rings",
            Author: "J.R.R. Tolkien",
            bookStatus: "available"
        };
        
        chai.request(app)
            .put('/api/v1/books/:bookId')
            .send({'bookName': 'Spider'})
            .end((err, res) => {
                res.should.have.status(201);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('UPDATED');
                res.body.UPDATED.should.be.a('object');
                res.body.UPDATED.should.have.property('bookName, Author, bookStatus');
                res.body.UPDATED.should.have.property('_bookId');
                res.body.UPDATED.name.should.equal('item')
              done();
            
      });
     });
    });
  
  after(() => {
           process.exit(0)
         });
})
