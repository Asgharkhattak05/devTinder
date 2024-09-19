const express = require("express");

const app = express();



// app.use("/", (req, res) => {
//   res.send("server is listning successfully");
// });
// app.use("/post", (req, res)=>{
//   res.send("got the post data from db")
// })
// app.use("/post", (req, res)=>{
//   console.log(req.body)
//   res.send("data post successfully to db")
// })

// app.get("/post", (req, res)=>{
//     res.send("got the post data from db")
//   })


  // app.get("/ab?c", (req, res)=>{
  //   res.send("got the  data from db")
  // })
  // app.get("/ab*cd", (req, res)=>{
  //   res.send("got the  data from db")
  // })
  // app.get("/ab+c", (req, res)=>{
  //   res.send("got the  data from db")
  // })


  // app.get("/a/", (req, res)=>{
  //   res.send("got the  data from db")
  // })


  app.get("/*a$/", (req, res)=>{
    res.send("got the  data from db")
  })

  // app.post("/post", (req, res)=>{
  //   console.log(req.params)
  //   res.send("data post successfully to db")
  // })
app.listen(3000);
