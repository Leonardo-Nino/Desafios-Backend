import 'dotenv/config'

import express from 'express'
import './config/configDB.js'
import { Server } from 'socket.io'

import productsRouters from './routes/product.routes.js'
import cartsRouters from './routes/carts.routes.js'
import messagesRouters from './routes/messages.routes.js'
import sessionRouters from './routes/session.routes.js'
import registerRouter from './routes/register.routes.js'
import mockingProductsRouter from './Testing/routes/mockingproducts.routes.js'

import session from 'express-session'
import MongoStore from 'connect-mongo'
import cookieParser from 'cookie-parser'
import passport from 'passport'
import initializePassport from './config/passportStrategies.js'

import { engine } from 'express-handlebars'
import { __dirname, __filename } from './utils/path.js'
import * as path from 'path'

// Configuration express

const app = express()
const port = 4000

// Cookies configuration

app.use(cookieParser(process.env.SIGNED_COOKIES))

// session  configuration

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.URL_MONGOOSE,

      mongoOptions: { useNewUrlParser: true, useUnifiedTopology: true },

      ttl: 300,
    }),
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
)

// Passport configuration
initializePassport()
app.use(passport.initialize())
app.use(passport.session())

// Configuration handlebars

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Middleware

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

//Configuration routes

app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', productsRouters)
app.use('/api/carts', cartsRouters)
app.use('/api/messages', messagesRouters)
app.use('/api/session', sessionRouters)
app.use('/api/register', registerRouter)
app.use('/api/mockingproducts', mockingProductsRouter)
