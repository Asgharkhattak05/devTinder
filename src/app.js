const express = require("express");
const connectDB = require("./config/database.js");
const { User } = require("./models/user.model.js");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());

app.post("/signup", async (req, res) => {
  // console.log(req.body);

  // Creating a new instance of the User model (a new user document)
  const user = new User(req.body);
  try {
    await user.save(); // Saving the user document to the MongoDB database
    res.status(201).send("User Created Successfully");
  } catch (error) {
    res.status(400).send("Error While Creating User: " + error.message);
  }
});

// get user by email
app.get("/user", async (req, res) => {
  const email = req.body.email;
  console.log(email);
  try {
    const users = await User.find({ email: email });
    console.log(users);
    if (users.length === 0) {
      res.status(404).send("user not found");
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(400).send("erroe while getting user by id");
  }
});
//  feed api
app.get("/feed", async (req, res) => {
  try {
    const users = await User.find({});
    if (users.length === 0) {
      res.status(404).send("users not found");
    } else {
      res.status(200).send(users);
    }
  } catch (error) {
    res.status(400).send("erroe while getting all user");
  }
});
//  feed api
app.delete("/user", async (req, res) => {
  try {
    await User.findByIdAndDelete(req.body.userId);
    res.status(200).send("user deleted successfully");
  } catch (error) {
    res.status(400).send("erroe while deleting a user");
  }
});
//  update user api
app.patch("/user/:_id", async (req, res) => {
  const data = req.body;
  const _id = req.params._id;
  try {
    const ALLOWED_UPDATES = [
      "firstName",
      "lastName",
      "age",
      "skills",
      "about",
      "gender",
      "photoUrl",
    ];

    const isUpdateAllowed = Object.keys(data).every((k) =>
      ALLOWED_UPDATES.includes(k)
    );
    if (!isUpdateAllowed) {
      throw new Error("update not allowed");
    }
    if (data?.skills.length > 10) {
      throw new Error("skills can not be more then 10");
    }
    await User.findByIdAndUpdate({ _id }, data, { runValidators: true });
    res.status(200).send("user Updated successfully");
  } catch (error) {
    res.status(400).send("erroe while updating a user :" + error.message);
  }
});

connectDB()
  .then(() => {
    // Starting the server only after a successful database connection
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error(
      "❌ Server failed to start due to DB connection error:",
      error
    );
  });

// Handling graceful shutdown when the server is stopped (Ctrl+C)
process.on("SIGINT", async () => {
  console.log("🛑 Shutting down server...");
  await mongoose.connection.close();
  process.exit(0);
});
