const mongoose = require('mongoose')

const messageSchema = new mongoose.Schema({
  message: {
    type: String,
    required: [true, 'a message cannot be empty'],
  },
})
module.exports = mongoose.model('TestMsg', messageSchema)
