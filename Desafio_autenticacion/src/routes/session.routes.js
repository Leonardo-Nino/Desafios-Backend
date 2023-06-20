import { Router } from 'express'
import { userModel } from '../models/user.js'
import { validatePassword } from '../utils/bcrypt.js'

const sessionRouter = Router()

// ruta para  login

sessionRouter.get('/login', async (req, res) => {
  res.render('login')
})

sessionRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email })

    if (!user) {
      res.send('Mail error')
    }
    const isValidPassword = await validatePassword(password, user.password)

    if (!isValidPassword) {
      res.send('Password error')
    }
    req.session.user = user

    res.redirect('/api/products')
  } catch {
    ;(error) => {
      console.error(error)
      res.status(401).send('Error attempting login')
    }
  }
})

// ruta logout

sessionRouter.get('/logout', async (req, res) => {
  try {
    req.session.destroy()
    res.redirect('login')
  } catch {
    ;(error) => console.error(error)
    res.status(500).send('Error attempting logout')
  }
})

export default sessionRouter
