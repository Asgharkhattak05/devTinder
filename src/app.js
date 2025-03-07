const express = require("express");

const app = express();

// app.get("/ab?c", (req, res) => {
//   res.send("user get successfully");
// });
// app.get("/ab+c", (req, res) => {
//   res.send("user get successfully");
// });
// app.get("/a*c", (req, res) => {
//   res.send("user get successfully");
// });
// app.get("/a(bc)+d", (req, res) => {
//   res.send("user get successfully");
// });
// app.get("/a/", (req, res) => {
//   res.send("user get successfully");
// });

// app.get("/user/:id", (req, res) => {
//   console.log(req.params);
//   res.send("user get successfully");
// });

// params is optional here

// app.get("/user/:id?", (req, res) => {
//   console.log(req.params);
//   res.send("user get successfully");
// });

// for query parameters

app.get("/user", (req, res) => {
  console.log(req.query);
  res.send("user get successfully");
});

app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
