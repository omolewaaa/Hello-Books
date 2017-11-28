const user = require('../models/user');
const books = require('../models/book');
const reviews = require('../models/review');
const favo = require('../favorites');
const borrowed = require('../borrow');


// API Endpoint to borrow a book
exports.borrow = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const userExist = user.filter(r => r.userId === userId)[0];

  const bookId = parseInt(req.params.bookId, 10);
  const bookExist = books.filter(r => r.bookId === bookId)[0];


  if (!bookExist) {
    res.status(404).json('This book does not exist');
  } else if (!userExist) {
    res.status(404).json('user not found');
  }

  if (bookExist && bookExist.bookStatus === 'unavailable') {
    res.status(404).json({
      message: 'This book is currently unavailable',
      bookName: bookExist.bookName,
      bookId,
      status: bookExist.bookStatus,
      username: userExist.username,
      userId
    });
  } else {
    borrowed.push(userId, bookId);
    res.json({
      status: true,
      message: 'enjoy the book',
      bookName: bookExist.bookName,
      bookId,
      username: userExist.username,
      userId
    });
  }
};


// API to return borrowed book
exports.returnBook = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const userExist = user.filter(users => users.userId === userId)[0];

  const bookId = parseInt(req.params.bookId, 10);
  const bookExist = books.filter(r => r.bookId === bookId)[0];

  res.json({
    status: true,
    message: 'Thanks for the return, we are sure you enjoy the book',
    bookName: bookExist.bookName,
    bookId,
    username: userExist.username,
    userId
  });
};


// API Endpoint to review a book
exports.reviewBook = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const userExist = user.filter(r => r.userId === userId)[0];
  const bookId = parseInt(req.params.bookId, 10);
  const bookExist = books.filter(r => r.bookId === bookId)[0];


  const item = req.body;
  item.reviewId = reviews.length + 1;
  if (!userExist) {
    res.status(404).json('user not found');
  } else if (!bookExist) {
    res.status(404).json('This book does not exist');
  } else if (!item.review) {
    return res.status(404).json({ status: false, message: 'kindly tell us your experience about this book' });
  }

  bookExist.review = item;
  reviews.push({ userId, bookId, item });
  res.status(200).json({
    message: 'Thanks for you review', review: item, userId, bookId
  });
};


// API Endpoint to mark a book as favorite
exports.favorites = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const userExist = user.filter(r => r.userId === userId)[0];
  const bookId = parseInt(req.params.bookId, 10);
  const bookExist = books.filter(r => r.bookId === bookId)[0];


  if (!bookExist) {
    res.status(404).json('This book does not exist');
  } else if (!userExist) {
    res.status(404).json('user not found');
  } else {
    favo.push({ userId, bookId });
    res.json({
      status: true,
      message: 'Marked as favorite',
      bookName: bookExist.bookName,
      bookId,
      username: userExist.username,
      userId
    });
  }
};


// API Endpoint to get user's favorite books
exports.getFavorites = (req, res) => {
  const userId = parseInt(req.params.userId, 10);
  const userExist = favo.filter(r => r.userId === userId)[0];
  if (!userExist) {
    res.status(404).json('you have no favorite book');
  } else {
    // const fav = [];
    // fav = userExist.favorites;
    const favbooks = userExist.bookId;
    const usersname = userExist.userId;
    // const favoritebooks = userExist.favorites;
    // res.json({"username": userExist.username, "favorites": fav});
    res.json({ message: 'see below your favorites book', favbook: favbooks, user: usersname });
  }
};
