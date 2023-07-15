import { newCart, getCart, updateCart } from '../DAL/DAOs/mongoDAO/cartMongo.js'
import { getUsersByCustomFilter } from '../DAL/DAOs/mongoDAO/userMongo.js'
import { userModel } from '../DAL/mongoDB/models/user.js'
//create a new cart

export const createCart = async (res, req) => {
  try {
    const cart = await newCart()
    res.status(200).send(cart)
  } catch (error) {
    res.status(500).send('Errorcreating cart')
  }
}

// get all products of a cart

export const getProducFromCart = async (req, res) => {
  const cid = req.params.cid

  try {
    const products = await getCart({ _id: cid })
    res.status(200).send(products)
  } catch (error) {
    res.status(500).send('Error getting products from cart')
  }
}
// delete all products of a cart

export const deleteAllProducsFromCart = async (req, res) => {
  const cid = req.params.cid
  const cart = await getCart({ _id: cid })

  try {
    cart.products = []

    await updateCart({ _id: cid }, cart)

    res.status(200).send(cart)
  } catch (error) {
    res.status(500).send('Error deleteting products from cart')
  }
}
// add Products and quantity to cart (quantity is required)

export const addProductToCart = async (req, res) => {
  const cid = req.params.cid
  const pid = req.params.pid
  const { quantity } = req.body
  const cart = await getCart({ _id: cid })

  try {
    const Addproducts = {
      id_product: pid,
      quantity: quantity,
    }

    cart.products.push(Addproducts)

    await updateCart({ _id: cid }, cart)

    res.status(200).send('Product added to cart')
  } catch (error) {
    res.status(500).send('Error adding product to cart' + error)
  }
}
//  update the quantity of one product from cart

export const updateQuantity = async (req, res) => {
  const cid = req.params.cid
  const pid = req.params.pid
  const { quantity } = req.body
  const cart = await getCart({ _id: cid })

  try {
    const updateProduct = cart.products
    const productIndex = updateProduct.findIndex(
      (prod) => prod.id_product == pid
    )

    updateProduct[productIndex].quantity = quantity

    await updateCart({ _id: cid }, { products: updateProduct })

    res.status(200).send('Updated product quantities successfully')
  } catch (error) {
    res.status(500).send('Error updating product quantities' + error)
  }
}
//delete one product of cart

export const deleteProductFromCart = async (req, res) => {
  const cid = req.params.cid
  const pid = req.params.pid
  const cart = await getCart({ _id: cid })

  try {
    const productUpdate = cart.products

    // return the index of the product in  the cart with the pid

    const productIndex = productUpdate.findIndex(
      (prod) => prod.id_product == pid
    )

    // from index remove de first element

    productUpdate.splice(productIndex, 1)

    await updateCart({ _id: cid }, { products: productUpdate })

    res.status(200).send('Product removed successfully')
  } catch (error) {
    res.status(500).send('Error removing product' + error)
  }
}

export const generatePucharse = async (req, res) => {
  const cid = req.params.cid
  const cart = await getCart({ _id: cid })
  const user = await getUsersByCustomFilter({ cart: cid })

  try {
    if (user) {
      console.log(user.first_name)
    } else {
      console.log('No se encontró ningún usuario')
    }

    res.send('todo bien')
  } catch (err) {
    console.log(err)
  }
}
