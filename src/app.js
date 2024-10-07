const express = require("express");
const { connectDB } = require("./config/database.js");
const User = require("./models/user.model.js");
require("./config/database.js");

const app = express();

app.use(express.json());

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

app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).send({ message: "Feed fetched successfully", users });
  } catch (error) {
    res.status(500).send("Error fetching the feed");
  }
});

app.post("/signup", async (req, res) => {
  // create instance of User model to save to database
  const user = new User(req.body);

  try {
    await user.save();
    res.status(200).send({ message: "User saved successfully!", user });
  } catch (error) {
    console.error(error);
    res
      .status(400)
      .send("Unable to save the user to the database" + error.message);
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

  const ALLOWD_UPDATE = ["firstName", "lastName", "age", "skills", "password ", ];
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
    res.status(400).send({ message: "Error while updating user"+ error.message });
  }
});

app.use("/", (req, res) => {
  res.send("Welcome to the DevTinder API!");
});
