import { Schema, model } from 'mongoose'

const messagesSchema = new Schema({
  user: String,
  messages: String,
})

export const messagesModel = model('messages', messagesSchema)
