import { Router } from 'express'
import { login, logout } from '../controllers/session.controller.js'

const sessionRouter = Router()

// ruta para  login

sessionRouter.get('/login', async (req, res) => {
  res.render('login')
})

sessionRouter.post('/login', login)

// ruta logout

sessionRouter.get('/logout', logout)

export default sessionRouter
