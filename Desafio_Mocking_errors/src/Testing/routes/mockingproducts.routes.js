import { Router } from 'express'

import { generateProduct } from '../utils/faker,js'

const mockingProductsRouter = Router()

mockingProductsRouter.get('/', async (req, res) => {})

export default mockingProductsRouter
