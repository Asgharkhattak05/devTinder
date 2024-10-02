const express = require("express");

const app = express();

app.use("/admin", (req, res , next) => {
  const token = "abc";
  const isAuthenticated = token === "abc";
  if (!isAuthenticated) {
    res.status(401).send("Unauthorized");
    return;
  }
  next();
});

app.get("/admin/getAllData", (req, res) => {
  res.status(200).send("got all data");
});

app.delete("/admin/deleteAllData", (req, res) => {
  res.status(200).send("deleted all data");
});

app.listen(3000);
