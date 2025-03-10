const express = require("express");
const connectDB = require("./config/database.js");
const { User } = require("./models/user.model.js");
const { validateSignupData } = require("./utils/validations.js");
const bcrypt = require("bcrypt");
const validator = require("validator");
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");
const { userAuth } = require("./middlewares/auth.js");

const app = express();
const PORT = process.env.PORT || 3000;
app.use(express.json());
app.use(cookieParser());

app.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  try {
    validateSignupData(req);
    const user = new User({
      firstName,
      lastName,
      email,
      password,
    });
    await user.save();
    res.status(201).send("User Created Successfully");
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.post("/signin", async (req, res) => {
  const { email, password } = req.body;
  try {
    if (!email) {
      throw new Error("email address is required");
    }
    if (!password) {
      throw new Error("password  is required");
    }

    if (!validator.isEmail(email)) {
      throw new Error("invalid email address");
    }
    const user = await User.findOne({ email });

    if (!user) {
      throw new Error("email not found");
    }

    const isPasswordValid = await user.validatePassword(password);
    if (isPasswordValid) {
      const token = await user.getJWT();
      res.cookie("token", token);
      res.send("login successfully");
    } else {
      throw new Error("invalid password");
    }
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
});

app.post("/sendConnectionRequest", userAuth, async (req, res) => {
  const user = req.user;
  res.send(user.firstName + " sent connection request ");
});

app.get("/profile", userAuth, (req, res) => {
  const user = req.user;
  try {
    res.send(user);
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
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
