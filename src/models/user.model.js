const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  firstName: {
    type: String,
  },
  lastName: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
  age: {
    type: Number,
  },
  gender: {
    type: String,
  },
});

const User = mongoose.model("User", userSchema);
// This creates a Mongoose model for the "users" collection.
// To create a new user document in the database, we must first create an instance of this model and then save it.

module.exports = { User };
