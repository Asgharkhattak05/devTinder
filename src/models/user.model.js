const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      required: true,
      minLength: 3,
      maxLength: 50,
    },
    lastName: {
      type: String,
      minLength: 3,
      maxLength: 50,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 8,
      max: 20,
    },
    age: {
      type: Number,
    },
    gender: {
      type: String,
      validate: (values) => {
        if (!["male", "female", "others"].includes(values)) {
          throw new Error("Gender data is not valid");
        }
      },
    },
    photoUrl: {
      type: String,
      default:
        "https://www.inzone.ae/wp-content/uploads/2025/02/dummy-profile-pic.jpg",
    },
    about: {
      type: String,
      default: "this is default about of the user",
    },
    skills: {
      type: [String],
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
// This creates a Mongoose model for the "users" collection.
// To create a new user document in the database, we must first create an instance of this model and then save it.

module.exports = { User };
