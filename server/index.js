// const http = require('http');
// const express = require('express');
// const socketio = require('socket.io');
// const cors = require('cors');
// const { Server } = require("socket.io");

// app.use(cors({ origin: "http://localhost:3000" }));//added by gemini 


// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// const router = require('./router');

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server, {
   
//   cors:{
//     origin:"http://localhost:3000",
//     methods:["GET","POST"]
//   }
// });
// const PORT = process.env.PORT || 5000;//added by gemini
// server.listen(PORT, () => console.log(`Server has started on port ${PORT}`));//added by gemini


// io.on('connect', (socket) => {
//   socket.on('join', ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });

//     if(error) return callback(error);

//     socket.join(user.room);

//     socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
//     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

//     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//     callback();
//   });

//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);

//     io.to(user.room).emit('message', { user: user.name, text: message });

//     callback();
//   });

//   socket.on('disconnect', () => {
//     const user = removeUser(socket.id);

//     if(user) {
//       io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
//     }
//   })
// });

// server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));

// const http = require('http');
// const express = require('express');
// const socketio = require('socket.io');
// const cors = require('cors');

// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');
// const router = require('./router');

// // --- Initialization Order Fixed ---
// const app = express();
// const server = http.createServer(app);
// const io = socketio(server, {
//   cors: {
//     origin: "http://localhost:3000",
//     methods: ["GET", "POST"]
//   }
// });

// // --- Middleware Setup ---
// // Apply middleware AFTER the app has been created
// app.use(cors()); // Handles HTTP CORS requests
// app.use(router); // Use the router for HTTP routes like the root '/'

// const PORT = process.env.PORT || 5000;

// // --- Socket.io Connection Logic ---
// io.on('connect', (socket) => {
//   console.log('A new user has connected.');

//   socket.on('join', ({ name, room }, callback) => {
//     const { error, user } = addUser({ id: socket.id, name, room });

//     if(error) return callback(error);

//     socket.join(user.room);

//     socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`});
//     socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

//     io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//     callback();
//   });

//   socket.on('sendMessage', (message, callback) => {
//     const user = getUser(socket.id);

//     // Make sure user exists before proceeding
//     if (user) {
//       io.to(user.room).emit('message', { user: user.name, text: message });
//     }

//     callback();
//   });

//   socket.on('disconnect', () => {
//     const user = removeUser(socket.id);

//     if(user) {
//       io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//       io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room)});
//       console.log('A user has disconnected.');
//     }
//   });
// });

// // --- Start the Server (Only Once) ---
// server.listen(PORT, () => console.log(`Server is running on port ${PORT}`));

const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const cors = require("cors");

const { addUser, removeUser, getUser, getUsersInRoom } = require("./users");
const router = require("./router");

const app = express();
const server = http.createServer(app);

const io = socketio(server, {
  cors: {
    origin: [
      "http://localhost:3000",
      "https://your-frontend-app.com"  // ✅ Change this to your deployed frontend URL
    ],
    methods: ["GET", "POST"]
  }
});

app.use(cors());
app.use(router);

const PORT = process.env.PORT || 5000;

io.on("connect", (socket) => {
  console.log("✅ A new user has connected.");

  socket.on("join", ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room });

    if (error) return callback(error);

    socket.join(user.room);

    socket.emit("message", {
      user: "admin",
      text: `${user.name}, welcome to room ${user.room}.`
    });

    socket.broadcast.to(user.room).emit("message", {
      user: "admin",
      text: `${user.name} has joined!`
    });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room)
    });

    callback();
  });

  socket.on("sendMessage", (message, callback) => {
    const user = getUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", { user: user.name, text: message });
    }

    callback();
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`
      });

      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room)
      });

      console.log("❌ A user has disconnected.");
    }
  });
});

server.listen(PORT, () =>
  console.log(`🚀 Server is running on port ${PORT}`)
);
