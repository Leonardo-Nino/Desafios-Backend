import { Router } from 'express'
import { userModel } from '../models/user.js'
import { hashPassword } from '../utils/bcrypt.js'

const registerRouter = Router()

// ruta para registrar users

registerRouter.get('/', async (req, res) => {
  res.render('register')
})

registerRouter.post('/', async (req, res) => {
  try {
    const { first_name, last_name, email, age, password } = req.body

    const newUser = new userModel({
      first_name: first_name,
      last_name: last_name,
      email: email,
      age: age,
      password: hashPassword(password),
    })

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
