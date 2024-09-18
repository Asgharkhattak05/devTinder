const express = require("express")

const app = express()



app.use("/post" , (req, res )=>{
  res.send("got all post")
})

app.use("/" , (req, res)=>{
    res.send("server is listning successfully")
})
app.listen(3000)