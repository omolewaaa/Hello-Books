const express = require('express');
const logger = require('morgan');
const bodyParser = require('body-parser');

// Set up the express app
const app = express();
//const Books = require('./models/book');
const path = require('path');

const db = require('../server/models/index');

//if( 'NODE_ENV' !== 'test') {
// Log requests to the console.
app.use(logger('dev'));
//}

// Parse incoming requests data (https://github.com/expressjs/body-parser)
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Setup a default catch-all route that sends back a welcome message in JSON format.
require('../server/route')(app);
app.get('*', (req, res) => res.status(200).send({
  message: 'Welcome to Hello-Books ooooooooooooooooo.'}));

module.exports = app;


