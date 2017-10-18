const express = require('express');
const bodyParser = require('body-parser');
const app = express();
//const jwt    = require('jsonwebtoken');
const books = require('../book');
const user = require('../user');


app.use(bodyParser.json());

module.exports = (app) => {
  app.get('/api', (req, res) => 
  	res.json(Books));

//API Endpoint to add a book
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
  

  // API Endpoint to modify a book
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


// API Endpoint to get all the books in the catalog
app.get('/api/books', (req, res)=> {
	res.json(books);
});


//API Endpoint to borrow a book
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


//API Endpoint to accept/reject reqquest to borrow a book
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

//API Endpoint to accept returned book

app.put('/api/users/:userId/return/:bookId', (req, res) => {

  const userId = parseInt(req.params.userId, 10);
 // var userExist = user.filter(r => r.userId === userId)[0];
  const bookId = parseInt(req.params.bookId, 10)
  const exist = books.filter(r => r.bookId === bookId)[0];


      res.status(200).json({message:"This book is successfully returned", "book": exist})
      
  });

//API Endpoint to review a book
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
            res.status(200).json({message:'Thanks for you review', "book": bookExist});
        });

//API Endpoint to mark a book as favorite
app.post('/api/users/:userId/fav/:bookId', (req, res)=> {
  const userId = parseInt(req.params.userId, 10);
  const userExist = user.filter(r => r.userId === userId)[0];
  const bookId = parseInt(req.params.bookId, 10)
  const bookExist = books.filter(r => r.bookId === bookId)[0];
});


//API Endpoint to get user's favorite books
app.get('/api/users/:userId/favbooks', (req, res)=>{
  const userId = parseInt(req.params.userId, 10);
  const userExist = user.filter(r => r.userId === userId)[0];
    if (!userExist) {
        res.status(404).json("user not found")
      }
    else {
      let fav = [];
      fav = userExist.favorites
      //const favoritebooks = userExist.favorites;
       res.json(fav)
    }
});


//API Endpoint to get book with highest number of upvotes in descending order
 app.get('/api/books/:sorted', (req, res)=> {
  
  const sorted = [];
  sorted = books.sort((a,b) => b.upvotes - a.upvotes);
  res.json({"books": sorted})
 });


};





