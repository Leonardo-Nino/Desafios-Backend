import { Router } from 'express'
import { messagesModel } from '../models/messages.js'

const messagesRouters = Router()

messagesRouters.get('/', async (req, res) => {
  req.io.on('connection', async (socket) => {
    console.log('client connected')
    socket.on('message', async (data) => {
      await messagesModel.create(data)
      req.io.emit('messages', await messagesModel.find())
    })
  })

  res.render('messages')
})

export default messagesRouters
