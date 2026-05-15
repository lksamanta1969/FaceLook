
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB connect
mongoose.connect("mongodb://127.0.0.1:27017/facelook")
.then(()=>console.log("MongoDB Connected"))
.catch(err=>console.log(err));

// Schema
const UserSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String
});

const User = mongoose.model("User", UserSchema);

// Signup API
app.post("/signup", async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.send("User created");
});

// Login API
app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email, password });

  if (user) {
    res.send({ status: "ok", user });
  } else {
    res.send({ status: "error" });
  }
});

// Server run
app.listen(5000, () => {
  console.log("Server running on port 5000");
});