const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');


require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose.connect(uri, { useNewUrlParser: true, useCreateIndex: true });
const connection = mongoose.connection;
connection.once('open', () => {
  console.log("MongoDB database connection established successfully");
})

// import functions in routes folder to redirect HTTP calls
const exercisesRouter = require('./routes/exercises');
const usersRouter = require('./routes/users');

app.use('/exercises', exercisesRouter);
app.use('/users', usersRouter);

// For deploying on Heroku
const path = require("path");

// Import build folder to the server
app.use(express.static(path.resolve(__dirname, "../build")));


// Ensures routes definied with React Router are working
// handles request by redirecting to index.html
app.get("*", function (req, res) {
  res.sendFile(path.resolve(__dirname, "./client/build", "index.html"));
})

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
})