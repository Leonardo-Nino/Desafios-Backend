import { Router } from 'express'
import { productModel } from '..//models/products.js'

const productsRouters = Router()

//Get all products

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
      lean: true,
    }

    const product = await productModel.paginate(query, options)
    product.status = 'success'

    res.render('home', {
      products: product.docs,
      user: req.session.user,
    }) //{ docs: products } solo los productos sin meta data
  } catch (error) {
    console.log(error)

    res.status(500).send('Error getting products')
  }
})

// Get product by Id

productsRouters.get('/:id', async (req, res) => {
  try {
    const id = req.params.id

    const product = await productModel.findOne({ _id: id })

    res.render('products', {
      title: product.title,
      price: product.price,
      stock: product.stock,
      thumbnail: product.thumbnail,
    })
  } catch (error) {
    console.log(error)
    res.status(500).send('Error getting product')
  }
})

// Create a new product

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

//Update product

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

//Detect product

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
