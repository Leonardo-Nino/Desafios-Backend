import { Router } from 'express'
import { CartsManager } from '../cartManager.js'

const cartsRouters = Router()

const myNewCart = new CartsManager('./carts.txt')

cartsRouters.post('/', async (req, res) => {
  const cart = await myNewCart.createCart()

  res.send(cart)
})

cartsRouters.get('/:cid', async (req, res) => {
  const cart = await myNewCart.getCartById(req.params.cid)

  res.send(cart)
})

cartsRouters.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const { quantity } = req.body

    const cart = await myNewCart.addProductToCart(cid, pid, { quantity })
  } catch (err) {
    console.log(err)
  }
  res.send('Product added to cart')
})

export default cartsRouters
