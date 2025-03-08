const express = require("express");

const app = express();

app.use(
  "/user",
  (req, res, next) => {
    console.log("handling the user route");
    // res.send("response!!");
    next();
  },
  (req, res, next) => {
    console.log("handling the user route 2");
    // res.send("2nd response!!");
    next();
  },
  (req, res, next) => {
    console.log("handling the user route 3");
    // res.send("3nd response!!");
    next();
  },
  (req, res, next) => {
    console.log("handling the user route 4");
    next();
  }
);

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
