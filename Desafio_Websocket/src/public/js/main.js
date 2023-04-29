const socket = io()
console.log('hola')

socket.on('mensaje', (info) => {
  console.log(info)
})

const formProduct = document.getElementById('formNewProduc')

formProduct.addEventListener('submit', (e) => {
  e.preventDefault()
  const productIterator = new FormData(e.target)

  const product = Object.fromEntries(productIterator)

  console.log(product)

  socket.emit('newProduc', { product }) //envie los product
})
