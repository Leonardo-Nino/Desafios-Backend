import { productModel } from '../models/products.js'

export const getProducts = async (reqQuery) => {
  try {
    const sort = reqQuery.sort === 'desc' ? -1 : (reqQuery.sort = 0)

    const category = reqQuery.category

    const status = reqQuery.status

    const query = {}
    category ? (query.category = category) : ''
    status ? (query.status = status) : ''

    const options = {
      limit: parseInt(reqQuery.limit) || 10,
      page: parseInt(reqQuery.page) || 1,
      sort: { price: sort },
      lean: true,
    }

    const product = await productModel.paginate(query, options)
    return product
  } catch (error) {
    return error
  }
}
export const getProductsById = async (reqParams) => {
  try {
    const productsById = await productModel.findOne(reqParams.id)
    return productsById
  } catch (error) {
    return error
  }
}
