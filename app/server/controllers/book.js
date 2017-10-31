const books = require('../models/book');

//API Endpoint to add a book

exports.create = (req, res) => {
	const item = req.body;
    item.bookId = books.length + 1;
   
     if (!item.bookName) {

        return res.status(500).json({ status: false, message: "please enter the name of the book"});
    }
    else if (!item.Author) {
        return res.status(500).json({ status: false, message: "please enter the name of the Author"});
    }
    else if (!item.Author) {
        return res.status(500).json({ status: false, message: "please enter the name of the Author"});
    }
    else if (!item.bookStatus) {
        return res.status(500).json({ status: false, message: "please enter the status of the book"});
    }
    
    else if(!isNaN(item.bookName)){
        return res.status(500).json({ status: false, message: "Name of book cannot be a number"});
    }
    else if (!isNaN(item.Author)){
        return res.status(500).json({ status: false, message: "Name of Author cannot be a number"});
    }
    else if (!isNaN(item.bookStatus)){
        return res.status(500).json({ status: false, message: "status of book cannot be a number"});
    }
    else if (item.bookStatus === "available" || item.bookStatus === "unavailable") {
  	books.push(item)
            res.status(200).json({message:'book added successfully', "data": item});
        //console.log(typeof(item.bookName))
          }
          else{
          return res.status(500).json({ status: false, message: "books can either be available or unavailable"});
        }
       
}

//API Endpoint to modify a book

exports.modify = (req, res) => {
	const item = req.body;
	const bookId = parseInt(req.params.bookId, 10);
  const exist = books.filter(r => r.bookId === bookId)[0];
 
    if(!exist){

    res.status(404).json("book does not exist")
    }
		else 
      
       /*exist.bookName = req.body.bookName;
       exist.Author = req.body.Author;
       exist.bookStatus = req.body.bookStatus;
       */
	
	
       if(!isNaN(item.bookName)){
        return res.status(500).json({ status: false, message: "Name of book cannot be a number"});
    }
    else if (!isNaN(item.Author)){
        return res.status(500).json({ status: false, message: "Name of Author cannot be a number"});
    }
    else if (item.bookStatus === "available" || exist.bookStatus === "unavailable") {
      
      res.status(201).json({message:'book modified successfully', "data": exist});
    }
    else {
      return res.status(500).json({ status: false, message: "books can either be available or unavailable"});
    }
      
      return res.status(201).json({message:'book modified successfully', "data": item});
    
}


// API Endpoint to get all the books in the catalog
exports.getAllBooks = (req, res) => {

	res.json(books);
}

//API Endpoint to accept/reject reqquest to borrow a book
exports.acceptBorrowedBook = (req, res) => {
	const userId = parseInt(req.params.userId, 10);
  const userExist = user.filter(r => r.userId === userId)[0];
  const bookId = parseInt(req.params.bookId, 10)
  const exist = books.filter(r => r.bookId === bookId)[0];


 
    if(exist.bookStatus !== "unavailable"){

      res.status(200).json({message:'Approved to borrow', "bookName": exist.bookName, "bookId": bookId, 
    "Admin": userExist.username});
    }
    else 
      {
      res.status(404).json({message:"book currently unavailable to borrow","bookName": bookExist.bookName, 
    "bookId": bookId, "status": bookExist.bookStatus, "Admin": userExist.username});
      
    }
}
  

//API Endpoint to accept returned book
exports.acceptReturnedBook = (req, res) => {

  const userId = parseInt(req.params.userId, 10);
  const userExist = user.filter(r => r.userId === userId)[0];
  const bookId = parseInt(req.params.bookId, 10)
  const exist = books.filter(r => r.bookId === bookId)[0];


      res.status(200).json({message:"This book is successfully returned", "bookName": exist.bookName, "bookId": bookId, 
    "Admin": userExist.username})
      
  
	}


//API Endpoint to get book with highest number of upvotes in descending order
exports.sorted = (req, res) => {
	const sorted = [];
   var sortee
  
  sortee = books.sort((a,b) => b.upvotes - a.upvotes);
  sorted.push(sortee);
  res.json({"books": sorted})
 }
