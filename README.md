

**HELLO-BOOKS**

[![Build Status](https://travis-ci.org/omolewaaa/Hello-Books.svg?branch=development)](https://travis-ci.org/omolewaaa/Hello-Books)
[![Coverage Status](https://coveralls.io/repos/github/omolewaaa/Hello-Books/badge.svg?branch=development)](https://coveralls.io/github/omolewaaa/Hello-Books?branch=development)
[![Code Climate](https://codeclimate.com/github/codeclimate/codeclimate/badges/gpa.svg)](https://codeclimate.com/github/codeclimate/codeclimate)

Hello-Books is a simple application that helps manage a library and its processes,With this application users are able to find and rent books. 
The application also has an admin section where the admin can do things like add books, delete books, increase the quantity of a book.


**Template:** This contains the user interfaces using HTML and CSS

**Server:** This folder house the backend implementation of the project with NodeJS - Express using dummy data



**GETTING STARTED**

Clone this repository using the command git clone https://github.com/omolewaaa/Hello-Books


**PEREQUISITES AND INSTALLATIONS**

 *    Knowledge of HTML, CSS and JavaScript

 *    NodeJS installed on your system, you can check out here to download https://nodejs.org/en/download/

 *    Installation of Postman for testing the API routes
 
 
 **Published Template**

https://omolewaaa.github.io/Hello-Books/

  
 **END POINT**

 *   **Endpoints  for users to register**
 
 			POST: /api/v1/users/signup
			Input : {username,email,password}

 *   **Endpoints  for users to login**
 
 			POST: /api/v1/users/signin
			Input : {username,password}

 *   **Endpoints  for users to signout**
 
 			POST: /api/v1/users/signout
		
 *   **Endpoints  to add a book and modify a book**
 
        	POST: /api/v1/book/admin
			Input : {bookName,Author,bookStatus,Details}
		
			PUT: /api/v1/book/admin/:bookId
			Input : {bookId}
				for example:  /api/v1/books/1			
	
 *   **Endpoint to get all books in the application**
 
		    GET: /api/v1/books
   
 *   **Endpoints to borrow and return a book**
 
        	POST: /api/v1/users/borrow/:bookId
			Input : {bookId}
				for example:  /api/v1/users/borrow/1
	
        	POST: /api/v1/users/return/:bookId
			Input : {bookId}
				for example:  /api/v1/users/return/1
   
 *   **Endpoints to accept/reject a request to borrow and return a book**
 
   			PUT: /api/v1/users/:userId/borrow/:bookId
			
				Input : {bookId}
				for example:  /api/v1/users/1/borrow/1
	
	
   	 		PUT: /api/v1/users/:userId/return/:bookId
				
				Input : {userId,bookId}
				for example: /api/v1/users/1/return/1
	
   
 *   **Endpoint to review a book**
 
        	POST: /api/v1/users/review/:bookId
			Input : {review, bookId}
	
 *   **Endpoint to mark a book as favorite**
 
			POST: /api/v1/users/fav/:bookId
				Input : {bookId}
				for example: /api/v1/users/fav/1
	
   
 *   **Endpoint to get a user’s favorite books**
 
        	GET: /api/v1/users/favbooks
			
	
 *   **Endpoint to get books with the most upvotes**
 
        	GET: /api/v1/books/sorted



**Status of project:	** Work in progress

   
 **AUTHOR**

   Akinyomi Omolewa
