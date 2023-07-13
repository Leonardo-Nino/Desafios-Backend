import { createUser } from '../DAL/DAOs/mongoDAO/registerMongo.js'
import { userModel } from '../DAL/mongoDB/models/user.js'

export const newUser = async (req, res) => {
  const { email } = req.body
  const user = await userModel.findOne({ email })
  if (user) {
    res.send('User already exists')
  }

  try {
    const user = await createUser(req.body)

    res.status(200).redirect('session/login')
  } catch (error) {
    res.status(500).send('Error in session registering')
  }
}
