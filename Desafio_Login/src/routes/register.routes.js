import { Router } from 'express'
import { userModel } from '../models/user.js'

const registerRouter = Router()

// ruta para registrar users

registerRouter.get('/', async (req, res) => {
  res.render('register')
})

registerRouter.post('/', async (req, res) => {
  try {
    const newUser = req.body

    const user = new userModel(newUser)

    await user.save()

    res.redirect('session/login')
  } catch {
    ;(err) => {
      console.log(err)
      res.status(500).send('Error in session registering')
    }
  }
})

export default registerRouter
