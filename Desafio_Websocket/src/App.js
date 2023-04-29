import express from 'express'
import { Server } from 'socket.io'

import productsRouters from './routes/product.routes.js'
import cartsRouters from './routes/carts.routes.js'
import realTimeRouters from './routes/realTimeProducts.routes.js'
import { engine } from 'express-handlebars'
import { __dirname, __filename } from './path.js'
import * as path from 'path'

// Configuration express

const app = express()
const port = 4000

// Configuration handlebars

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')
app.set('views', path.resolve(__dirname, './views'))

//Middleware

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

//Configuration routes

app.use('/', express.static(__dirname + '/public'))
app.use('/api/products', productsRouters)
app.use('/api/carts', cartsRouters)
app.use('/api/realtimeproducts', realTimeRouters)

const myServer = app.listen(port, () => {
  console.log(`Listening on port ${port}`)
})

// server Io
const io = new Server(myServer) // , { cors: { origin: '*' } }

app.use((req, res, next) => {
  req.io = io
  return next()
})

io.on('connection', (socket) => {
  console.log('client connected')
  socket.on('newProduc', (product) => {
    console.log(product) //push newProduc
  })
})
