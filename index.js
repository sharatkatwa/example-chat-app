const express = require('express')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

app.get('/', (req, res) => {
  // res.sendFile(`${__dirname}/index.html`)
  res.send('server is running')
})

io.on('connection', (socket) => {
  socket.on('chat', (msgData) => {
    io.emit('chat', msgData)
  })
})

server.listen(5000, () => {
  console.log(`server is listning on port 5000`)
})
