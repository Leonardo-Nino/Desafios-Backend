import { Schema, model } from 'mongoose'
import { cartModel } from '../models/cart.js'

userSchema = new Schema({
  first_name: String,
  last_name: String,
  email: String,
  age: Number,
  role: {
    type: String,
    default: 'user',
  },
  password: String,

  cart: {
    type: Schema.Types.ObjectId,
    ref: 'cart',
  },
})

//hook before user is created new cart is created

userSchema.pre('save', async function (next) {
  if (!this.isNew) return next()
  try {
    const newCart = new cartModel()

    await newCart.save()

    this.cart = newCart

    return next()
  } catch (error) {
    return next(error)
  }
})

export const userModel = model('user', userSchema)
