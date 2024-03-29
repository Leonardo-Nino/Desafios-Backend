import { Router } from 'express'
import {
  createCart,
  getProducFromCart,
  deleteAllProducsFromCart,
  addProductToCart,
  updateQuantity,
  deleteProductFromCart,
} from '../controllers/cart.controller.js'

const cartsRouters = Router()

cartsRouters.post('/', createCart)

cartsRouters.get('/:cid', getProducFromCart)

cartsRouters.delete('/:cid', deleteAllProducsFromCart)

cartsRouters.post('/:cid/product/:pid', addProductToCart)

cartsRouters.put('/:cid/product/:pid', updateQuantity)

cartsRouters.delete('/:cid/product/:pid', deleteProductFromCart)

export default cartsRouters
