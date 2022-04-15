import express from "express";
import idRouter from "./router/idRouter.js";
import helmet from "helmet";
// import morgan from "morgan";
import http from "http";
import cors from "cors";
import * as io from "socket.io";
import { ExpressPeerServer } from "peer";
import connectDb from "./db/config.js";
import { nanoid } from "nanoid";

const app = express();

const customGenerationFunction = () => (Math.random().toString(36) + '0000000000000000000').substr(2, 16);

const server = http.createServer(app);
var options = {
  debug: true,
  generateClientId: () => nanoid(),
};

var peerServer = ExpressPeerServer(server, options);

app.use('/peerjs/id', peerServer);

const io_server = new io.Server(server, {
  cors: {
    origin: "*",
  },
});

const PORT = process.env.PORT || 5000;

// app.use(morgan("tiny"));
app.use(
  cors({
    credentials: false,
  })
);
app.use(helmet());
app.use(express.json());

// Connect to the Database
try {
  connectDb();
} catch (error) {
  throw new Error(error.message);
}

app.use("/id", idRouter);
app.get("/:roomId", (req, res) => {
  res.redirect(`/${req.query.roomId}`);
});

io_server.on("connection", (socket) => {
  if (!socket) throw new Error("Socket connection failed");
  socket.on("join-room", (roomId, userId) => {
    socket.join(roomId);
    // socket.to(roomId).broadcast.emit("user-connected", userId);
    socket.broadcast.to(roomId).emit("user-connected", userId);

    socket.on("video-off", (uId) => {
      socket.broadcast.to(roomId).emit("video-off", uId);
    });

    socket.on("video-on", (uId) => {
      socket.broadcast.to(roomId).emit("video-on", uId);
    });

    socket.on("audio-off", (uId) => {
      socket.broadcast.to(roomId).emit("audio-off", uId);
    });

    socket.on("audio-on", (uId) => {
      socket.broadcast.to(roomId).emit("audio-on", uId);
    });

    socket.on("disconnect", () => {
      socket.broadcast.to(roomId).emit("user-disconnected", userId);
    });
  });
});

server.listen(PORT, () => {
  console.log(`Server running on PORT ${PORT} 🚀 `);
});
