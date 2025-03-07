const express = require("express");

const app = express();

app.use("/test", (req, res) => {
  res.send("hello got you on the test");
});

app.use((req, res) => {
  res.send("hello bro");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
