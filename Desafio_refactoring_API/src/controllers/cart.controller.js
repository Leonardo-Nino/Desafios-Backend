import {
  newCart,
  getProducCart,
  deleteProducsCart,
} from '../DAL/DAOs/mongoDAO/cartMongo.js'

import { cartModel } from '../DAL/mongoDB/models/carts.js'

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
    const products = await getProducCart({ _id: cid })
    res.status(200).send(products)
  } catch (error) {
    res.status(500).send('Error getting products from cart')
  }
}
// delete all products of a cart

export const deleteAllProducsFromCart = async (req, res) => {
  const cid = req.params.cid

  try {
    const cart = await cartModel.findById({ _id: cid })

    cart.products = []

    const producsCart = await deleteProducsCart({ _id: cid }, cart)

    res.status(200).send(cart)
  } catch (error) {
    res.status(500).send('Error deleteting products from cart')
  }
}
