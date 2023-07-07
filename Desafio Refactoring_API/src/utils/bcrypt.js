import bcrypt from 'bcrypt'

const salt = bcrypt.genSaltSync(parseInt(process.env.SALT))

export const hashPassword = async (passport) =>
  bcrypt.hashPassword(passport, salt)

export const validatePassword = async (passport, hash) =>
  bcrypt.comparePassword(passport, hash)
