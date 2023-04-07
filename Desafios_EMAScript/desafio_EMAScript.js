class ProductManager {
  constructor() {
    this.products = []
  }

  addProduct(product) {
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

    // Genero id unico

    product.id = this.products.length + 1

    //Despues de los chequeos  agrego el producto al array de products

    this.products.push(product)
  }

  getProducts() {
    console.log(this.products)
  }

  getProductById(id) {
    const productByid = this.products.find((ele) => ele.id === id)

    productByid !== undefined
      ? console.log(productByid.title)
      : console.log('Product not found')
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
  }
}

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
const product6 = new Product(
  'Bomber Man',
  'Description of Bomber Man',
  60,
  'bomber_man.png',
  'bomber3',
  2
)

// Un producto repetido y un producto con una propiedad vacia para testing

const product5 = new Product(
  'Mario Odyssey',
  'Description of Mario Odyssey',
  45,
  'mario_odyssey.png',
  'marioOd124',
  20
)
const product7 = new Product('Zelda', '', 59, 'zelda.png', 'zelda3', 4)

const myProductManager = new ProductManager()

myProductManager.getProducts()

myProductManager.addProduct(product1)
myProductManager.addProduct(product2)
myProductManager.addProduct(product3)
myProductManager.addProduct(product4)
myProductManager.addProduct(product5)
myProductManager.addProduct(product6)
myProductManager.addProduct(product7)

myProductManager.getProducts()

myProductManager.getProductById(9)
myProductManager.getProductById(2)
myProductManager.getProductById(6)
myProductManager.getProductById(5)
myProductManager.getProductById(1)
