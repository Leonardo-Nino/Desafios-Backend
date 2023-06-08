import 'dotenv/config'

import express from 'express'
import { Server } from 'socket.io'

import productsRouters from './routes/product.routes.js'
import cartsRouters from './routes/carts.routes.js'
import messagesRouters from './routes/messages.routes.js'
import sessionRouters from './routes/session.routes.js'

import session from 'express-session'
import MongoStore from 'connect-mongo'

import { engine } from 'express-handlebars'
import { __dirname, __filename } from './path.js'
import * as path from 'path'
import mongoose, { mongo } from 'mongoose'

// Configuration express

const app = express()
const port = 4000

// session configuration

app.use(
  session({
    store: MongoStore.create({
      mongoUrl: process.env.URL_MONGOOSE,
    }),
    secret: process.env.Secret,
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
