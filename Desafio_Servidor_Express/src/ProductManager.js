import { promises as fs } from 'fs'

export class ProductManager {
  constructor(path) {
    this.products = []
    this.path = path
  }

  async addProduct(product) {
    const productTXT = await fs.readFile(this.path, 'utf-8')

    this.products = JSON.parse(productTXT)

    //Verifico campos obligatorios

    if (
      !product.title ||
      !product.description ||
      !product.price ||
      !product.thumbnail ||
      !product.code ||
      !product.stock
    ) {
      return console.log('You must provide all required properties')
    }

    // Verifico  "Code" sea diferente

    const validCode = this.products.find((ele) => ele.code === product.code)

    if (validCode) {
      return console.log('The Product already exists')
    }

    //Despues de los chequeos  agrego el producto al array de products

    this.products.push(product)

    await fs.writeFile(this.path, JSON.stringify(this.products))
  }

  async getProducts() {
    const productTXT = await fs.readFile(this.path, 'utf-8')

    this.products = JSON.parse(productTXT)

    return this.products
  }

  async getProductById(id) {
    const productTXT = await fs.readFile(this.path, 'utf-8')

    this.products = JSON.parse(productTXT)

    const productByid = this.products.find((prod) => prod.id === parseInt(id))

    const result = productByid !== undefined ? productByid : 'Product not found'

    return result
  }

  async updateProduct(id) {
    const productTXT = await fs.readFile(this.path, 'utf-8')

    this.products = JSON.parse(productTXT)

    const productByid = this.products.find((ele) => ele.id === id)

    productByid !== undefined
      ? productByid.stock--
      : console.log('Product not found')

    await fs.writeFile(this.path, JSON.stringify(this.products))
  }

  async deteleProduct(id) {
    const productTXT = await fs.readFile(this.path, 'utf-8')

    this.products = JSON.parse(productTXT)

    const filteredProducts = this.products.filter((ele) => ele.id !== id)

    this.products = filteredProducts

    await fs.writeFile(this.path, JSON.stringify(this.products))
  }
}

class Product {
  constructor(title, description, price, thumbnail, code, stock) {
    this.title = title
    this.description = description
    this.price = price
    this.thumbnail = thumbnail
    this.code = code
    this.stock = stock
    this.id = Product.idGenerator()
  }

  static idGenerator() {
    this.IdGenerator ? this.IdGenerator++ : (this.IdGenerator = 1)

    return this.IdGenerator
  }
}

// Productos

const product1 = new Product(
  'Mario Odyssey',
  'Description of Mario Odyssey',
  45,
  'mario_odyssey.png',
  'marioOd124',
  20
)
const product2 = new Product(
  "Luigi's mansion 3",
  "Description of Luigi' mansion 3",
  40,
  'luigi_mansion_3.png',
  'luigy3',
  10
)
const product3 = new Product(
  'Mario kart 8',
  'Description of Mario kart 8',
  60,
  'mario_kart_8.png',
  'marioKart8',
  7
)
const product4 = new Product(
  'Zelda',
  'Description of Zelda',
  59,
  'zelda.png',
  'zelda3',
  4
)
const product5 = new Product(
  'Bomber Man',
  'Description of Bomber Man',
  60,
  'bomber_man.png',
  'bomber3',
  2
)
const product6 = new Product(
  'Terrania',
  'Description of Teerrania',
  15,
  'bomber_man.png',
  'terrania',
  8
)
const product7 = new Product(
  'Doom',
  'Description doom',
  25,
  'doom.png',
  'doomE',
  13
)
const product8 = new Product(
  'Mario Party',
  'Description of Mario Party',
  40,
  'mario_party.png',
  'Mparty',
  9
)
const product9 = new Product(
  'Super Smash Bros',
  'Description of Smash Bros',
  45,
  'super_smash_bros.png',
  'superSB',
  5
)
const product10 = new Product(
  'Metroid Dread',
  'Description Metroid Dread',
  56,
  'metroid.png',
  'metroidD',
  6
)
