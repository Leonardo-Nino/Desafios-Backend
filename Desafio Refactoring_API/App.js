import 'dotenv/config'

import express from 'express'
import { Server } from 'socket.io'

import cartsRouter from './src/routes/cart.routes.js'
import messagesRouter from './src/routes/messages.routes.js'
import productsRouter from './src/routes/product.routes.js'
import registerRouter from './src/routes/register.routes.js'
import sessionRouter from './src/routes/session.routes.js'

import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import './src/config/passportStrategies.js'

import { engine } from 'express-handlebars'
import { __dirname, __filename } from './src/path.js'
import * as path from 'path'
import mongoose, { mongo } from 'mongoose'

const app = express()

const port = 4000

// Cookies configuration

app.use(cookieParser(process.env.SIGNED_COOKIES))

// Passport configuration

passport.serializeUser((user, done) => {
  done(null, user._id)
})

passport.deserializeUser(async (id, done) => {
  try {
    const user = await usersModel.findById(id)
    done(null, user)
  } catch (error) {
    done(error)
  }
})

// session  configuration

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.URL_MONGOOSE,

      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },

      ttl: 300,
    }),
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true,
  })
)

//moongoose configuration

mongoose
  .connect(process.env.URL_MONGOOSE)
  .then(() => console.log('DB is connected'))
  .catch((err) => {
    console.log('Error connecting to Mongo')
  })

// Configuration handlebars

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const myServer = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// server Io

const io = new Server(myServer) // , { cors: { origin: '*' } }

app.use((req, res, next) => {
  req.io = io
  return next()
})

// routes

app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', productsRouter)
app.use('/api/cart', cartsRouter)
app.use('/api/messages', messagesRouter)
app.use('/api/register', registerRouter)
app.use('/api/session', sessionRouter)
