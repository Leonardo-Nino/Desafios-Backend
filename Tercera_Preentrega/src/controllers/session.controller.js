import { validatePassword } from '../utils/bcrypt.js'

import { getUsers, getUsersByEmail } from '../DAL/DAOs/mongoDAO/userMongo.js'

//login  controller

export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body
    const user = await getUsersByEmail({ email })

    if (!user) {
      res.send('Mail or password error')
    }
    const isValidPassword = await validatePassword(password, user.password)

    if (!isValidPassword) {
      res.send('Mail or password error')
    }

    req.session.user = user

    res.redirect('/api/products')

    res.status(200).send({ status: 'success' })
  } catch {
    ;(error) => {
      console.error(error)
      res.status(401).send('Error attempting login')
    }
  }
}

// logout controller

export const logout = async (req, res, next) => {
  try {
    req.session.destroy()
    res.redirect('login')
  } catch {
    ;(error) => console.error(error)
    res.status(500).send('Error attempting logout')
  }
}
