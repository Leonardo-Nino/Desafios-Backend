import { Router } from 'express'
import {
  generatelink,
  newPass,
  //checkToken,
} from '../controllers/resetPass.controller.js'

const resetPasswordsRouter = Router()

resetPasswordsRouter.get('/sendLink', generatelink)

//resetPasswordsRouter.get('/resetPassword',checkToken)

resetPasswordsRouter.get('/newPassword/:token', newPass)

export default resetPasswordsRouter
