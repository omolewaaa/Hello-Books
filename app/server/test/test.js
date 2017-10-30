
let Book = require('../Models/book');

let chai = require('chai');
let chaiHttp = require('chai-http');
let app = require('../app');
let should = chai.should();


describe('Books', () => {
  describe('/POST book', () => {
      it('it should not POST a book without pages field', (done) => {
        let book = {
            bookName: "The Lord of the Rings",
            author: "J.R.R. Tolkien",
            bookStaus: "available"
        }
        //chai.request(app)
           // .post('/book')
            .send(book)
            .end((err, res) => {
                res.should.have.status(200);
              done();
            });
      });

  });
})