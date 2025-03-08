const express = require("express");

const app = express();

app.use("/admin", (req, res, next) => {
  const token = "1234t";
  const isauthorized = token === "1234";
  if (isauthorized) {
    next();
  } else {
    res.send("user is not authorized");
  }
});

app.get("/admin/getAllUser", (req, res, next) => {
  res.send("got all user data");
});

app.get("/admin/deleteSingleUser", (req, res, next) => {
  res.send("user deleted successfully");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
