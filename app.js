const express = require("express");
const cors = require("cors");
const bodyparser = require('body-parser');
const mongoose = require("mongoose");
var multipart = require('connect-multiparty');
const userRoutes = require("./routes/userRoute");
//const messageRoutes = require("./routes/messages");
const app = express();
const socket = require("socket.io");
//dotenv config
require("dotenv").config();
//bodyparser config
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({ extended: true }))
//cors 
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

//multiparty config 
app.use(multipart());
//BD Connection 
mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB Connetion Successfull");
  })
  .catch((err) => {
    console.log(err.message);
  });

  //Use routes
app.use("/user", userRoutes);
//app.use("/api/messages", messageRoutes);

const server = app.listen(process.env.PORT, () =>
  console.log(`Server started on ${process.env.PORT}`)
);
const io = socket(server, {
  cors: {
    origin: "http://localhost:3000",
    credentials: true,
  },
});

/*global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });

  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recieve", data.msg);
    }
  });
});*/