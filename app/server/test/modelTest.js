
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
  
 
      it('it should post a book when all input supplied correctly', (done) => {
        let item = {
            bookName: "The Lord of the Rings",
            Author: "J.R.R. Tolkien",
            bookStatus: "available"
        };
        
        chai.request(app)
            .put('/api/v1/books/+res.body[0]._bookId')
            .send(item)
            .end((err, res) => {
                res.should.have.status(200);
                res.should.be.json;
                res.body.should.be.a('object');
                res.body.should.have.property('UPDATED');
                res.body.UPDATED.should.be.a('object');
                res.body.UPDATED.should.have.property('name');
                res.body.UPDATED.should.have.property('_id');
                res.body.UPDATED.name.should.equal('Spider')
              done();
            
      });
     });
it('it should not put if status is neither unavailable or available', (done) => {
        /*let item = {
            bookName: "The Lord of the Rings",
            Author: "J.R.R. Tolkien",
            bookStatus: "avai"
        };
        */
        chai.request(app)
            .put('/api/v1/books/:bookId')
            .send({'bookStatus': 'AVA'})
            .end((err, res) => {
                res.should.have.status(500);
              done();
            
      });
     });
  
  after(() => {
           process.exit(0)
         });
})
