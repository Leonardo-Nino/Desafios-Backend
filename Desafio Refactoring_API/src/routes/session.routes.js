import { Router } from 'express'
import { login, logout } from '../controllers/sessionController.js'

const sessionRouter = Router()

//  route login

sessionRouter.get('/login', async (req, res) => {
  res.render('login')
})

sessionRouter.post('/login', login)

//  route logout

sessionRouter.get('/logout', logout)

export default sessionRouter
