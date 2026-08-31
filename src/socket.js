import { Server } from "socket.io";

let io;

const initSocket = (httpServer) => {
  io = new Server(httpServer, {
    cors: {
      origin: "http://localhost:5173",
      credentials: true,
    },
  });

  io.on("connection", (socket) => {
    console.log("Cliente conectado:", socket.id);

    socket.on("disconnect", () => {
      console.log("Cliente desconectado:", socket.id);
    });
  });
};

const getIO = () => {
  if (!io) {
    throw new Error("Socket.io não inicializado");
  }
  return io;
};

export { initSocket, getIO };
