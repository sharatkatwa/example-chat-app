const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const TestMsg = require('./models/chatModel')
const app = express()
const http = require('http')
const server = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
  cors: {
    origin: '*',
  },
})

const connectDB = async () => {
  await mongoose.set('strictQuery', false).connect(process.env.MONGO_URI)
  console.log('DB connected successfully')
}
app.get('/', (req, res) => {
  res.sendFile(`${__dirname}/index.html`)
  // res.send('server is running')
})

io.on('connection', async (socket) => {
  const msgsFromDB = await TestMsg.find()
  // console.log(msgsFromDB.message)
  io.emit('storedChat', msgsFromDB)

  socket.on('chat', async (msgData) => {
    const msg = await TestMsg.create({ message: msgData })
    io.emit('chat', msgData)
  })
})

connectDB().then(() => {
  server.listen(5000, () => {
    console.log(`server is listning on port 5000`)
  })
})
