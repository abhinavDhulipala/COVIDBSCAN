// first, require all of the things we will need
const express = require('express');
const cors = require('cors');

// connect to MongoDB Atlas DB
const mongoose = require('mongoose');

// so we can have our environment variables in the .env file
require('dotenv').config();

// create Express server, choosing 5000 as server port
const app = express();
const port = process.env.PORT || 5000;

// establish middleware and allow parsable json
app.use(cors());
app.use(express.json());

// include database URI (copied into mongocluster.txt), then make .env and set ATLAS_URI variable
const uri = process.env.ATLAS_URI;

// pass URI into mongoose.connect to start connection
mongoose.connect(uri, { useNewURLParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
    console.log("*** MongoDB database connection established successfully ***");
})

// tell server to use router files
//for user information
//const quizRouter = require('./routes/quiz');
//app.use('/quiz', quizRouter);

// start the server and start listening to the port
// start server by running 'nodemon server' in the terminal
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});