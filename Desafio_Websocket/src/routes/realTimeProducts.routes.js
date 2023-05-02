import { Router } from 'express'
import { ProductManager } from '../productManager.js'

const realTimeRouters = Router()

const myProductManager = new ProductManager('./products.txt')

realTimeRouters.get('/', async (req, res) => {
  const products = await myProductManager.getProducts()

  req.io.on('connection', (socket) => {
    console.log('client connected')

    req.io.emit('products', products)

    // socket.on('newProduc', (product) => {
    //   console.log(product)
    //   products.push(product)
    //   req.io.emit('products', product)
    // })
    //socket.on('eliminarProd', codigo => {
    // desarrollar la logica para eliminar el prod con el code que me pasan del producto

    // Con este le mandas el listado actualizado y deberia ya escucharlo el cliente y mostrarlo
    // req.io.emit("listado", products)
    // })
  })

  req.io.emit('Hola', 'Hola product')
  res.render('realTimeProducts')
})

export default realTimeRouters
