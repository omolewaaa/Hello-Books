const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');
const swaggerJSDoc = require('swagger-jsdoc');
// Set up the express app
const app = express();

const swaggerDefinition = {
  info: {
    
    description: 'Welcome to Hello-Books',
  },
  //host: 'localhost:8000',
  //basePath: '/',
};

// options for the swagger docs
const options = {
  // import swaggerDefinitions
  swaggerDefinition: swaggerDefinition,
  // path to the API docs
  apis: ['./app/server/route/index.js'],
};

// initialize swagger-jsdoc
const swaggerSpec = swaggerJSDoc(options);

// Log requests to the console.
app.use(logger('dev'));

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get('*', function(req, res) {
  res.setHeader('Content-Type', 'application/json');
  res.send(swaggerSpec);
});

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('../server/route')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Hello-Books.'}));

module.exports = app;
