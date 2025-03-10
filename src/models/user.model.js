const mongoose = require("mongoose");
const validator = require("validator");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
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
      validate: (values) => {
        if (!validator.isEmail(values)) {
          throw new Error("invalid emial address " + values);
        }
      },
    },
    password: {
      type: String,
      required: true,
      trim: true,
      min: 8,
      max: 20,
      validate: (values) => {
        if (!validator.isStrongPassword(values)) {
          throw new Error("enter a strong password " + values);
        }
      },
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
      validate: (values) => {
        if (!validator.isURL(values)) {
          throw new Error("invalid photo URL" + values);
        }
      },
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

// Hash password before saving
userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

userSchema.methods.getJWT = function () {
  return jwt.sign({ _id: this._id }, "DEVTinder@789", {
    expiresIn: "7d",
  });
};

// Validate Password
userSchema.methods.validatePassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model("User", userSchema);
// This creates a Mongoose model for the "users" collection.
// To create a new user document in the database, we must first create an instance of this model and then save it.

module.exports = { User };
