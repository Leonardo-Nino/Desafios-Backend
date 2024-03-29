import { userModel } from '../DAL/mongoDB/models/user.js'
import { changeRole } from '../DAL/DAOs/mongoDAO/userMongo.js'

export const changeUserRole = async (req, res) => {
  const { uid } = req.params
  try {
    const user = await userModel.findById(uid)

    user.role = user.role === 'user' ? 'premium' : 'user'

    await user.save()

    res.status(200).send(user)
  } catch (error) {
    console.log(error)
  }
}
