import { promises as fs } from 'fs'

//Constante con mi ruta de Archivo

const myPath = './products.txt'

//Funcion para crear el archivo Txt

const newFile = async (path) => {
  await fs.writeFile(path, '')

  await fs.appendFile(path, '[]')
}

// LLamo a la Funcion para crear el archivo Txt

await newFile(myPath)

//Clases

class ProductManager {
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

    return console.log(this.products)
  }

  async getProductById(id) {
    const productTXT = await fs.readFile(this.path, 'utf-8')

    this.products = JSON.parse(productTXT)

    const productByid = this.products.find((ele) => ele.id === id)

    productByid !== undefined
      ? console.log(productByid.title)
      : console.log('Product not found')
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

const myProductManager = new ProductManager(myPath)

// operaciones

await myProductManager.getProducts()

await myProductManager.addProduct(product1)
await myProductManager.addProduct(product2)
await myProductManager.addProduct(product3)
await myProductManager.addProduct(product4)
await myProductManager.addProduct(product5)

await myProductManager.updateProduct(5)

await myProductManager.getProducts()

await myProductManager.deteleProduct(2)

await myProductManager.getProducts()
