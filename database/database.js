require("dotenv").config();
const mongoose = require("mongoose");
const url = process.env.MongoURI;

function initializeDatabase() {
  // Connect to the database
  mongoose.connect(url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  // Return the mongoose object so it can be used in other files
  return mongoose;
}

module.exports = initializeDatabase;
