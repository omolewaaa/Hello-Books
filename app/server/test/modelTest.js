
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
  });
  after(() => {
           process.exit(0)
         });
})
