// i wrote the comment for bettar understating 

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan');
const helmet = require('helmet');
const connectDB = require('../roxiler/db/db')

// Import the dotenv package
require('dotenv').config();

// Set the application's listening port to the value of the 'PORT' environment variable,
// or use the default port '3000' if the 'PORT' environment variable is not defined.
const PORT = process.env.PORT || 3000;


const app = express();

// Middleware to parse incoming JSON data
app.use(express.json());

//Enhances your application's security by setting various HTTP headers and implementing security best practices.
app.use(helmet());

//Provides request/response logging for debugging and monitoring purposes.
app.use(morgan('dev')); 

//Necessary when your backend serves data to a frontend from a different domain, allowing cross-origin requests.
app.use(cors());

//Used to parse the request body, enabling you to handle incoming JSON or form data in your routes and controllers.
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use('/' , require('../roxiler/routes/routes'))



connectDB();


app.listen(PORT, ()=> { console.log(`Server is running on http://localhost:${PORT}`)});