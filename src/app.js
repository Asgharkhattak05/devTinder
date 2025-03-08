const express = require("express");
const { adminAuth, userAuth } = require("./middlewares/auth");

const app = express();

app.use("/admin", adminAuth);

app.get("/admin/getAllUser", (req, res) => {
  res.send("got all user data");
});
app.get("/admin/deleteSingleUser", (req, res) => {
  res.send("user deleted successfully");
});
app.post("/user/addUser", userAuth, (req, res) => {
  res.send("user added successfully");
});
app.listen(3000, () => {
  console.log("server is listening on port 3000");
});
