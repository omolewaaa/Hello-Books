let Book = require('../models/book');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();

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


 

    after(() => {
           process.exit(0)
         });
})
