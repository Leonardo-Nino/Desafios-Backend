import { Router } from 'express'

import { cartModel } from '../DAL/mongoDB/models/carts.js'

const cartsRouters = Router()

//create a new cart

cartsRouters.post('/', async (req, res) => {
  const cart = await cartModel.create({})

  res.send(cart)
})

// get all products of a cart

cartsRouters.get('/:cid', async (req, res) => {
  const cid = req.params.cid

  const cart = await cartModel.find({ _id: cid })

  res.send(cart)
})

// delete all products of a cart

cartsRouters.delete('/:cid', async (req, res) => {
  try {
    const cid = req.params.cid

    const cart = await cartModel.findById({ _id: cid })

    cart.products = []

    await cartModel.updateOne({ _id: cid }, cart)

    res.send('All the products were removed successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error removing product')
  }
})

// add Products and quantity to cart

cartsRouters.post('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const { quantity } = req.body

    const cart = await cartModel.findById({ _id: cid })
    const addProductTocart = {
      id_product: pid,
      quantity: quantity,
    }
    cart.products.push(addProductTocart)

    await cartModel.updateOne({ _id: cid }, cart)

    res.send('Product added to cart')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error adding product to cart')
  }
})

//  update the quantity of one product from cart

cartsRouters.put('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid
    const { quantity } = req.body

    const cart = await cartModel.findById({ _id: cid })

    const productOfCart = cart.products // me devuelve array product

    const productIndex = productOfCart.findIndex(
      (prod) => prod.id_product == pid
    )

    productOfCart[productIndex].quantity = quantity

    await cartModel.updateOne({ _id: cid }, { products: productOfCart })

    res.send('Updated product quantities successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error updating product quantities')
  }
})

//delete one product of cart

cartsRouters.delete('/:cid/product/:pid', async (req, res) => {
  try {
    const cid = req.params.cid
    const pid = req.params.pid

    const cart = await cartModel.findById({ _id: cid })

    const productOfCart = cart.products // me devuelve array product

    const productIndex = productOfCart.findIndex(
      (prod) => prod.id_product == pid //devuelve el index del producto segun parametro
    )

    productOfCart.splice(productIndex, 1)

    await cartModel.updateOne({ _id: cid }, { products: productOfCart })

    res.send('Product removed successfully')
  } catch (err) {
    console.log(err)
    res.status(500).send('Error removing product')
  }
})

export default cartsRouters
