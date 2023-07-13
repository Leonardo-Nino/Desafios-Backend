import {
  getProducts,
  getProductsById,
  createProduct,
  updateProduct,
  productDelete,
} from '../DAL/DAOs/mongoDAO/productMongo.js'

export const getAllProducts = async (req, res) => {
  try {
    const product = await getProducts(req.query)
    res.render('home', {
      products: product.docs,
      user: req.session.user,
    }) //{ docs: products } solo los productos sin meta data
  } catch (error) {
    res.status(500).send('Error getting products')
  }
}

export const getProductById = async (req, res) => {
  const { id } = req.params

  try {
    const product = await getProductsById(id)

    res.render('products', {
      title: product.title,
      price: product.price,
      stock: product.stock,
      thumbnail: product.thumbnail,
    })
  } catch (error) {
    return res.status(500).send('Error getting product')
  }
}

export const postNewProduct = async (req, res) => {
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

  try {
    await createProduct(req.body)

    res.status(200).send('Product added successfully')
  } catch (error) {
    return res.status(500).send('Error creating  product')
  }
}

export const putProduct = async (req, res) => {
  const { id } = req.params

  const { title, description, price, thumbnail, status, category, stock } =
    req.body

  const obj = {
    title,
    description,
    price,
    status,
    stock,
    category,
    thumbnail,
  }

  try {
    const productUpdate = await updateProduct(id, obj)
    res.status(200).send(productUpdate)
  } catch (error) {
    res.status(500).send('Error updating product')
  }
}

export const deleteProduct = async (req, res) => {
  const { id } = req.params
  try {
    await productDelete(id)

    res.status(200).send('Product deleted successfully')
  } catch (error) {
    res.status(500).send('Error deleting product')
  }
}
