import 'dotenv/config'

import passport from 'passport'

import { Strategy as GitHubStrategy } from 'passport-github2'

import { Strategy as LocalStrategy } from 'passport-local'

import { userModel } from '../DAL/mongoDB/models/user.js'

//local strategy

//github

passport.use(
  'github',
  new GitHubStrategy(
    {
      clientID: 'Iv1.e4149f39af2a233b',
      clientSecret: process.env.GITHUB_SECRET,
      callbackURL: 'http://localhost:4000/api/register/githubcallback',
    },

    async (accessToken, refreshToken, profile, done) => {
      try {
        //console.log(profile)
        const user = await userModel.findOne({ email: profile._json.email })
        if (!user) {
          const newUser = new userModel({
            first_name: profile._json.name.split(' ')[0],
            last_name: profile._json.name.split(' ')[1] ?? ' ',
            age: 0,
            email: profile._json.email,
            password: 'Github',
          })
          const newUserDB = await userModel.create(newUser)
          return done(null, newUserDB)
        } else {
          return done(null, user)
        }
      } catch (error) {
        return done('error trying to login with GitHub ', +error)
      }
    }
  )
)
// Para inicial session

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await userModel.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})
