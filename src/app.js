const express = require("express");

const app = express();

app.get("/user", (req, res) => {
  res.send("user get successfully");
});
app.post("/user", (req, res) => {
  res.send("user data post successfully");
});

app.use("/test", (req, res) => {
  res.send("hello got you on the test");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
