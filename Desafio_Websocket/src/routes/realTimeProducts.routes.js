import { Router } from 'express'
import { ProductManager } from '../productManager.js'

const realTimeRouters = Router()

const myProductManager = new ProductManager('./products.txt')

realTimeRouters.get('/', async (req, res) => {
  const product = await myProductManager.getProducts()
  //req.io.send('hola')
  res.render('realTimeProducts', { products: product })
})

export default realTimeRouters
