const http = require("http");
const { Server } = require("socket.io");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"]
  }
});
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

io.on("connection", (socket) => {

  console.log("User Connected:", socket.id);

  socket.on("call-user", (data) => {
    console.log("CALL RECEIVED:", data);
    socket.broadcast.emit("incoming-call", data);
  });

  socket.on("answer-call", (data) => {
    
    socket.broadcast.emit("call-answered", data);
  });
  
socket.on("offer", (offer) => {
  socket.broadcast.emit("offer", offer);
});

socket.on("answer", (answer) => {
  socket.broadcast.emit("answer", answer);
});
  socket.on("disconnect", () => {

    console.log("User Disconnected:", socket.id);
  });

});

server.listen(5000, () => {
  console.log("Server running on port 5000");
});