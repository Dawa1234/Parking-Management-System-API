// Server
const express = require("express");
const app = express();
// Mongodb Connection
const mongoose = require("mongoose");
// Import Route
const routeUser = require("./Routes/user-route");

// Database connection
mongoose.set("strictQuery", true);
mongoose
  .connect("mongodb://127.0.0.1:27017/PR")
  .then(() => {
    console.log("Database Connected successfully");
  })
  .catch((err) => console.log(err));

// Most Important
app.use(express.json());

// User Route
app.use("/user", routeUser);

// Testing function
function login(req, res, next) {
  res.send("Server is working");
}

app.listen(3000);
