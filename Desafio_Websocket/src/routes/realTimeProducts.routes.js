import { Router } from 'express'
import { ProductManager } from '../productManager.js'

const realTimeRouters = Router()

const myProductManager = new ProductManager('./products.txt')

realTimeRouters.get('/', async (req, res) => {
  req.io.on('connection', (socket) => {
    console.log('client connected')

    //req.io.emit('products', products) //renderizo los product primera vez

    socket.on('newProduc', async (product) => {
      const products = await myProductManager.getProducts()

      //req.io.emit('products', products) //renderizo de vuelta

      myProductManager.addProduct(product)

      products

      req.io.emit('products', products) //renderizo de vuelta
    })
    //socket.on('eliminarProd', codigo => {
    // desarrollar la logica para eliminar el prod con el code que me pasan del producto
  })

  res.render('realTimeProducts')
})

export default realTimeRouters
