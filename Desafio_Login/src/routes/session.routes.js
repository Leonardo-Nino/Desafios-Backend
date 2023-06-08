import { Router } from 'express'
import { userModel } from '../models/user.js'

const sessionRouter = Router()

// ruta para registrar users

sessionRouter.get('/register', async (req, res) => {
  res.render('session/register')
})

sessionRouter.post('/register', async (req, res) => {
  try {
    const newUser = req.body

    const user = new userModel(newUser)

    await user.save()

    res.redirect('api/session/login')
  } catch {
    ;(err) => {
      console.log(err)
      res.status(500).send('Error in session registering')
    }
  }
})

// ruta para  login

sessionRouter.get('login', async (req, res) => {
  res.render('api/session/login')
})

sessionRouter.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await userModel.findOne({ email, password }).lean()

    if (!user) {
      res.send('Mail or password error')
    }
    req.session.user = user
    res.redirect('api/products')
  } catch {
    ;(error) => {
      console.error(error)
      res.status(500).send('Error attempting login')
    }
  }
})

// ruta logout

sessionRouter.post('/logout', async (req, res) => {
  try {
    req.session.destroy()
    res.redirect('api/session/login')
  } catch {
    ;(error) => console.error(error)
    res.status(500).send('Error attempting logout')
  }
})

export default sessionRouter
