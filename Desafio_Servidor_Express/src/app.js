import express from 'express'
import { ProductManager } from './ProductManager.js'

const app = express()
const port = 4000

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

const myProductManager = new ProductManager('./products.txt')

app.get('/products', async (req, res) => {
  let { limit } = req.query

  const productLimit = (await myProductManager.getProducts()).slice(0, limit)

  const product = await myProductManager.getProducts()

  limit ? res.send(productLimit) : res.send(product)
})

app.get('/products/:id', async (req, res) => {
  const product = await myProductManager.getProductById(req.params.id)
  res.send(product)
})
