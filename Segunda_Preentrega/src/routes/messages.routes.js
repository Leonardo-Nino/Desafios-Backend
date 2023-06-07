import { Router } from 'express'
import { messagesModel } from '../models/messages.js'

const messagesRouters = Router()

io.on('connection', async (socket) => {
  console.log('client connected')
})

socket.on('message', async (data) => {
  await messagesModel.create(data)
  req.io.emit('messages', await messagesModel.find())
})

messagesRouters.get('/', async (req, res) => {
  try {
    const messages = await messagesModel.find()

    res.render('messages', { messages })
  } catch {
    ;(err) => console.log(err)
  }
})

export default messagesRouters
