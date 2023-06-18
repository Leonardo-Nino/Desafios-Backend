import bcrypt from 'bcrypt'

const salt = bcrypt.genSaltSync(parseInt(process.env.SALT))

export const hashPassword = (password) => bcrypt.hashSync(password, salt)

export const validatePassword = (password, hash) =>
  bcrypt.compareSync(password, hash)
