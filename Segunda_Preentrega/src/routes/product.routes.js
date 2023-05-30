import { Router } from 'express'
import { productModel } from '../models/products.js'
const productsRouters = Router()

productsRouters.get('/', async (req, res) => {
  try {
    const sort = req.query.sort === 'desc' ? -1 : (req.query.sort = 0)

    const category = req.query.category

    const status = req.query.status

    const query = {}
    category ? (query.category = category) : ''
    status ? (query.status = status) : ''

    const options = {
      limit: parseInt(req.query.limit) || 10,
      page: parseInt(req.query.page) || 1,
      sort: { price: sort },
    }

    const products = await productModel.paginate(query, options)
    products.status = 'success'

    res.send(products) //{ docs: products } solo los productos sin meta data
  } catch (error) {
    console.log(error)

    res.status(500).send('Error getting products')
  }
})

productsRouters.get('/:id', async (req, res) => {
  try {
    const id = req.params.id

    const product = await productModel.findOne({ _id: id })

    res.send({ products: product })
    // res.render('products', {   REDERIZA pero me genera un error en la consola que no entiendo
    //   title: product.title,
    //   price: product.price,
    //   stock: product.stock,
    // })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error getting product')
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
