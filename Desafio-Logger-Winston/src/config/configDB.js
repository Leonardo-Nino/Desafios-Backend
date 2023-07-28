import 'dotenv/config'
import mongoose from 'mongoose'

//moongoose configuration

mongoose
  .connect(process.env.URL_MONGOOSE)
  .then(() => console.log('DB is connected'))
  .catch((err) => console.log(err))
