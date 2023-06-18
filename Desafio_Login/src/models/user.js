import { Schema, model } from 'mongoose'

const userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  role: {
    type: String,
    default: 'user',
  },
  password: String,
})

export const userModel = model('user', userSchema)
