const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const jwt    = require('jsonwebtoken');
const books = require('../info');
const user = require('../user');


app.use(bodyParser.json());

module.exports = (app) => {
  app.get('/api', (req, res) => 
  	res.json(Books));

  app.post('/api/books', (req, res)=> {
  	const item = req.body;
    item.bookId = books.length + 1;
   // if (!item.id) {
    //    return res.sendStatus(500);
    //}
     if (!item.bookName) {
        return res.status(500).json({ status: false, message: "please enter the name of the book"});
    }
    else if (!item.Author) {
        return res.status(500).json({ status: false, message: "please enter the name of the Author"});
    }

  	books.push(item);
            res.status(200).json({message:'book added successfully', "data": item});
        });
  

  //app.put('/api/books/bookId', (req, res)=>
  	
  	//res.json(req.body));
app.put('/api/books/:bookId', (req, res) => {

	const bookId = parseInt(req.params.bookId, 10);
  const exist = books.filter(r => r.bookId === bookId)[0];
 
    if(!exist){

    res.status(404).json("book does not exist")
    }
		else 
      
       exist.bookName = req.body.bookName;
       exist.Author = req.body.Author;
       exist.bookStatus = req.body.bookStatus;
      
      res.status(201).json({message:'book modified successfully', "data": exist});
   

  
  });



app.get('/api/books', (req, res)=> {
	res.json(books);
});


app.post('/api/users/:userId/borrow/:bookId', (req, res)=> {
  //console.log(req.params)
  //const userId = req.decoded.data.id;
  const userId = parseInt(req.params.userId, 10);
  const userExist = user.filter(r => r.userId === userId)[0];
 
  const bookId = parseInt(req.params.bookId, 10);
   //var id = req.params.id;
  const bookExist = books.filter(r => r.bookId === bookId)[0];
  //var bookStatus = books.filter(r => r.bookStatus === bookStatus)[0];
  
 
if (!bookExist) {
  res.status(404).json("This book does not exist")
}
else if (!userExist) {
  res.status(404).json("user not found")
}

if (bookExist && bookExist.bookStatus === "unavailable") {
  res.status(404).json({message: "This book is currently unavailable", "user": userExist, "book": bookExist})
}
else {
  res.json({ status: true, message:'enjoy the book', "book": bookExist, "user": userExist} )
}

  });
 
//API to return borrowed book
app.post('/api/users/:userId/return/:bookId', (req, res)=> {
  const userId = parseInt(req.params.userId, 10);
  const userExist = user.filter(users => users.userId === userId)[0];
 
  const bookId = parseInt(req.params.bookId, 10);
  const bookExist = books.filter(r => r.bookId === bookId)[0];
  
  res.json({ status: true, message:'Thanks for the return, we are sure you enjoy the book', 
    "book": bookExist, "user": userExist} )


  });


app.put('/api/users/:userId/borrow/:bookId', (req, res) => {

  const userId = parseInt(req.params.userId, 10);
  const userExist = user.filter(r => r.userId === userId)[0];
  const bookId = parseInt(req.params.bookId, 10)
  const exist = books.filter(r => r.bookId === bookId)[0];


 
    if(exist.bookStatus !== "unavailable"){

      res.status(200).json({message:'Approved to borrow', "data": exist});
    }
    else 
      {
      res.status(404).json({message:"book currently unavailable to borrow", "book": exist})
      
    }
  

  
  });

app.put('/api/users/:userId/return/:bookId', (req, res) => {

  const userId = parseInt(req.params.userId, 10);
 // var userExist = user.filter(r => r.userId === userId)[0];
  const bookId = parseInt(req.params.bookId, 10)
  const exist = books.filter(r => r.bookId === bookId)[0];


      res.status(200).json({message:"This book is successfully returned", "book": exist})
      
  });

app.post('/api/users/:userId/review/:bookId', (req, res)=> {
  const userId = parseInt(req.params.userId, 10);
  const userExist = user.filter(r => r.userId === userId)[0];
  const bookId = parseInt(req.params.bookId, 10)
  const bookExist = books.filter(r => r.bookId === bookId)[0];

  const item = req.body;
       if (!userExist) {
        res.status(404).json("user not found")
      }

      else if (!bookExist) {
        res.status(404).json("This book does not exist")
        }
 
     else if(!item.review) {
        return res.status(404).json({ status: false, message: "kindly tell us your experience about this book"});
    }
    
    bookExist.review = item
    //books.push(item)
            res.status(200).json({message:'Thanks for you review', "review": bookExist});
        });




};





