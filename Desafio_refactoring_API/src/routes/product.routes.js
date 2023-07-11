import { Router } from 'express'

import {
  getAllProducts,
  getProductById,
  postNewProduct,
  putProduct,
  deleteProduct,
} from '../controllers/product.controller.js'

const productsRouters = Router()

productsRouters.get('/', getAllProducts)

productsRouters.get('/:id', getProductById)

productsRouters.post('/', postNewProduct)

productsRouters.put('/:id', putProduct)

productsRouters.delete('/:id', deleteProduct)

export default productsRouters
