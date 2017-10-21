

**HELLO-BOOKS**

[![Build Status](https://travis-ci.org/omolewaaa/Hello-Books.svg?branch=development)](https://travis-ci.org/omolewaaa/POSTIT)
[![Coverage Status](https://coveralls.io/repos/github/omolewaaa/Hello-Books/badge.svg?branch=development)](https://coveralls.io/github/omolewaaa/Hello-Books?branch=development)

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
 
 
 **END POINT**
 
 *   **Endpoints  to add a book and modify a book**
 
        	POST: /api/v1/books
		
			PUT: /api/v1/books/:bookId
	
 *   **Endpoint to get all books in the application**
 
		    GET: /api/v1/books
   
 *   **Endpoints to borrow and return a book**
 
        	POST: /api/v1/users/:userId/borrow/:bookId
	
        	POST: /api/v1/users/:userId/return/:bookId
   
 *   **Endpoints to accept/reject a request to borrow and return a book**
 
   			PUT: /api/v1/users/:userId/borrow/:bookId
	
   	 		PUT: /api/v1/users/:userId/return/:bookId
   
 *   **Endpoint to review a book**
 
        	POST: /api/v1/users/:userId/review/:bookId
   
 *   **Endpoint to mark a book as favorite**
 
			POST: /api/v1/users/:userId/fav/:bookId
   
 *   **Endpoint to get a user’s favorite books**
 
        	GET: /api/v1/users/:userId/favbooks
	
 *   **Endpoint to get books with the most upvotes**
 
        	GET: /api/v1/books/:sorted



**Status of project:	** Work in progress

   
 **AUTHOR**

   Akinyomi Omolewa
