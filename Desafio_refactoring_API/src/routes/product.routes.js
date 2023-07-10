import { Router } from 'express'
import { productModel } from '../models/products.js'

import {
  getAllProducts,
  getProductById,
} from '../controllers/product.controller.js'

const productsRouters = Router()
productsRouters.get('/', getAllProducts)

productsRouters.get('/:id', getProductById)

productsRouters.post('/', async (req, res) => {
  const {
    title,
    description,
    price,
    thumbnail,
    status,
    category,
    code,
    stock,
  } = req.body
  await productModel.create({
    title,
    description,
    price,
    thumbnail,
    status,
    category,
    code,
    stock,
  })
  res.send('Product added successfully')
})

productsRouters.put('/:id', async (req, res) => {
  const id = req.params.id

  const {
    title,
    description,
    price,
    thumbnail,
    status,
    category,
    code,
    stock,
  } = req.body

  const message = await productModel.updateOne(
    { _id: id },
    {
      title,
      description,
      price,
      thumbnail,
      status,
      category,
      code,
      stock,
    }
  )

  res.send(message)
})

productsRouters.delete('/:id', async (req, res) => {
  try {
    const id = req.params.id

    await productModel.deleteOne({ _id: id })

    res.send('Product deleted successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error deleting product')
  }
})

export default productsRouters
