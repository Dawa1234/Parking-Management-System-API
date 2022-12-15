const express = require("express");
const app = express();
const mongoose = require("mongoose");

app.use(login);

mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/PR")
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch((err) => console.log(err));

function login(req, res, next) {
  res.send("Server is working");
}

app.listen(3000);
