import { Router } from 'express'
import { userModel } from '../models/user.js'
import { hashPassword } from '../utils/bcrypt.js'
import passport from 'passport'

const registerRouter = Router()

// ruta para registrar users

registerRouter.get('/', async (req, res) => {
  res.render('register')
})

registerRouter.post('/', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await userModel.findOne({ email })
    if (user) {
      return res.send('User already registered')
    }
    const hashPass = await hashPassword(password)

    const newUser = { ...req.body, password: hashPass }

    await userModel.create(newUser)

    res.redirect('session/login')
  } catch {
    ;(err) => {
      console.log(err)
      res.status(500).send('Error in session registering')
    }
  }
})

export default registerRouter
