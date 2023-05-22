import { Router } from 'express'
import { productModel } from '../models/products.js'
const productsRouters = Router()

productsRouters.get('/', async (req, res) => {
  try {
    let { limit } = req.query

    const productLimit = (await productModel.find()).slice(0, limit)

    const product = await productModel.find()

    limit
      ? res.send({ products: productLimit }) // res.render('home', { products: productLimit })
      : res.send({ products: product }) //  res.render('home', { products: product })
  } catch (error) {
    console.log(error)
  }
})

productsRouters.get('/:id', async (req, res) => {
  try {
    const product = await productModel.findOne({ _id: req.params.id })

    res.send({ products: product })
    // res.render('products', {
    //   title: product.title,
    //   price: product.price,
    //   stock: product.stock,
    // })
  } catch (error) {
    console.log(error)
  }
})

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
    npm,
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
    const deleteProduct = await productModel.deleteOne({ _id: id })

    res.send('Product deleted successfully')
  } catch (err) {
    console.log(err)
  }
})

export default productsRouters
