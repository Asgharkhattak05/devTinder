const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.model.js");
const { signupValidation } = require("./utils/validations.js");
require("./config/database.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const JWT = require("jsonwebtoken");
const userAuth = require("./middlewares/auth.js");

const app = express();
app.use(express.json());
app.use(cookieParser());

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

app.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!validator.isEmail(email)) {
      throw new Error("Invalid email address");
    }
    const user = await User.findOne({ email: email });
    if (!user) return res.status(404).send({ message: "Invalid Credentials" });

    const isPasswordValid = await user.comparePassword(password);
    if (isPasswordValid) {
      const token = await user.getJwt();
      res.cookie("token", token);
      res.send("Login Successfully");
    } else {
      throw new Error("Invalid Credentials");
    }
  } catch (error) {
    console.error(error);
    res.status(400).send("ERROR : " + error.message);
  }
});

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  try {
    // validation of upcoming data  from req.pody
    signupValidation(req);

    // password encryption
    // const hashPassword = await bcrypt.hash(password, 10);

    const user = new User({
      firstName,
      lastName,
      email,
      password
    });
    await user.save();
    res.status(200).send({ message: "User saved successfully!", user });
  } catch (error) {
    console.error(error);
    res.status(400).send("ERROR : " + error.message);
  }
});

app.get("/profile", userAuth, async (req, res) => {
  try {
    const user = req.user; // Already set by userAuth middleware
    res.status(200).json({ message: "User fetched successfully", user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({
      message: "An error occurred while fetching the user profile.",
      error: error.message,
    });
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " " + " Sent the connection request");
});

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ message: "Feed fetched successfully", users });
  } catch (error) {
    res.status(500).send("Error fetching the feed");
  }
});

app.get("/user", async (req, res) => {
  const userEmail = req.body?.email;

  try {
    const user = await User.findOne({ email: userEmail });
    if (!user) return res.status(404).send({ message: "User not found" });
    else res.status(200).send({ message: "User get successfully", user });
  } catch (error) {
    res.status(404).send({ message: "error while fetching user", error });
  }
});

app.delete("/user", async (req, res) => {
  const userId = req.body.userId;
  try {
    // await User.findByIdAndDelete(userId);
    await User.findByIdAndDelete({ _id: userId });
    res.status(200).send({ message: "User deleted successfully" });
  } catch (error) {
    res.status(404).send({ message: "error while deleteing user", error });
  }
});

app.patch("/user/:userId", async (req, res) => {
  const userId = req.params?.userId;
  const updatedFields = req.body;

  const ALLOWD_UPDATE = ["firstName", "lastName", "age", "skills", "password "];
  try {
    const isUpdateAllowd = Object.keys(updatedFields).every((key) => {
      return ALLOWD_UPDATE.includes(key);
    });
    if (!isUpdateAllowd) {
      throw new Error();
    }
    const updatedUser = await User.findByIdAndUpdate(userId, updatedFields, {
      new: true,
      runValidators: true,
    });

    if (!updatedUser) {
      return res.status(404).send({ message: "User not found" });
    }

    res.status(200).send({ message: "User updated successfully", updatedUser });
  } catch (error) {
    res
      .status(400)
      .send({ message: "Error while updating user" + error.message });
  }
});

app.use("/", (req, res) => {
  res.send("Welcome to the DevTinder API!");
});
