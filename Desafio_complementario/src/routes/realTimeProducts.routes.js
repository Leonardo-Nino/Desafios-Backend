import { Router } from 'express'
import { ProductManager } from '../productManager.js'

const realTimeRouters = Router()

const myProductManager = new ProductManager('./products.txt')

realTimeRouters.get('/', async (req, res) => {
  //async para poder usar getProduct

  req.io.on('connection', async (socket) => {
    console.log('client connected')

    const products = await myProductManager.getProducts() //llamo a un get products y lo guardo en un variable

    req.io.emit('products', products) //renderizo productos le paso el lista de productos

    socket.on('newProduc', async (product) => {
      //me llega en nuevo producto

      myProductManager.addProduct(product)

      req.io.emit('products', products) //renderizo de vuelta
    })
    //socket.on('eliminarProd', codigo => {
    // desarrollar la logica para eliminar el prod con el code que me pasan del producto
  })

  res.render('realTimeProducts')
})

export default realTimeRouters
