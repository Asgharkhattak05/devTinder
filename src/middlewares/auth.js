const { User } = require("../models/user.model");
const jwt = require("jsonwebtoken");
const userAuth = async (req, res, next) => {
  // console.log(req.cookies);
  const { token } = req.cookies;
  try {
    if (!token) {
      throw new Error("Unauthorized: No token provided ");
    }
    const decodedData = jwt.verify(token, "DEVTinder@789");
    if (!decodedData || !decodedData._id) {
      throw new Error("Unauthorized: Invalid token");
    }
    const { _id } = decodedData;
    const user = await User.findById(_id);
    if (!user) {
      throw new Error("Unauthorized: User not found ");
    }
    console.log(user);
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("ERROR : " + error.message);
  }
};

module.exports = { userAuth };
