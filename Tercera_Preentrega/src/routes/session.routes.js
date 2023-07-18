import { Router } from 'express'
import { login, logout } from '../controllers/session.controller.js'
import passport from 'passport'

const sessionRouter = Router()

// ruta para  login

sessionRouter.get('/login', async (req, res) => {
  res.render('login')
})

sessionRouter.post(
  '/login',
  passport.authenticate('login', {
    passReqToCallback: true,
    failureRedirect: '/api/register',
    failureMessage: 'Something went wrong',
  }),
  login
)

// ruta logout

sessionRouter.get('/logout', logout)

export default sessionRouter
