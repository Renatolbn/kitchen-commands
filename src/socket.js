import { Server } from 'socket.io'

let io

const initSocket = (httpServer) => {
  io = new Server(httpServer)

  io.on('connection', (socket) => {
    console.log('Cliente conectado:', socket.id)

    socket.on('disconnect', () => {
      console.log('Cliente desconectado:', socket.id)
    })
  })
}

const getIO = () => {
  if (!io) throw new Error('Socket.io não inicializado')
  return io
}

export { initSocket, getIO }