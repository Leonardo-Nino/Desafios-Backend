import { Router } from 'express'

import { cartModel } from '../models/carts.js'

const cartsRouters = Router()

cartsRouters.post('/', async (req, res) => {
  const cart = await cartModel.create({})

  res.send(cart)
})

cartsRouters.get('/:cid', async (req, res) => {
  const cart = await cartModel.findOne({ _id: req.params.cid })

  res.send(cart)
})
cartsRouters.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const { quantity } = req.body

    const cart = await cartModel.findById({ _id: cid })
    const addProductTocart = {
      id_product: pid,
      quantity: quantity,
    }
    cart.products.push(addProductTocart)
    cart.save()
  } catch (err) {
    console.log(err)
  }
  res.send('Product added to cart')
})

export default cartsRouters
