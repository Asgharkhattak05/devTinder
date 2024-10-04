const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.model.js");
require("./config/database.js");

const app = express();
connectDB()
  .then(() => {
    console.log("MongoDB connected successfully...");
    app.listen(3000, () => {
      console.log("Server is running on port 3000"); // Server is running on port 3000
    });
  })
  .catch((err) => {
    console.error(err, "Error connecting to MongoDB");
  });

app.post("/signup", async (req, res) => {
  const user = {
    firstName: "John",
    lastName: "Doe",
    email: "johndo@example.com",
    password: "password123",
    age: 26,
    gender: "Male",
  };

  // create instance of User model to save to database
  const newUser = new User(user);

  try {
    await newUser.save();
    res
      .status(200)
      .send({ message: "User saved successfully!", user: newUser });
  } catch (error) {
    console.error(error);
    res.status(400).send("Unable to save the user to the database");
  }
});

app.use("/", (req, res) => {
  res.send("Welcome to the DevTinder API!");
});
