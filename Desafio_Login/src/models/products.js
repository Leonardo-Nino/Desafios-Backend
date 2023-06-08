import { Schema, model } from 'mongoose'
import paginate from 'mongoose-paginate-v2'

const productSchema = new Schema({
  id: { type: Number },
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: [],
  status: { type: Boolean, default: true },
  category: { type: String, required: true },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
})

productSchema.plugin(paginate)

export const productModel = model('product', productSchema)
