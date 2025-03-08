const express = require("express");

const app = express();
app.get("/user", (req, res) => {
  throw new Error();
});

app.use("/", (err, req, res, next) => {
  if (err) {
    res.status(500).send("something went wrong");
  }
});
// app.get("/user", (req, res) => {
//   throw new Error();
// });

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
