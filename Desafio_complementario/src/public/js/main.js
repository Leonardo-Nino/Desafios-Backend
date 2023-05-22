// const socket = io()

// const formProduct = document.getElementById('formNewProduc')

// formProduct.addEventListener('submit', (e) => {
//   //e.preventDefault()
//   const productIterator = new FormData(e.target)

//   const product = Object.fromEntries(productIterator)

//   //console.log(product)

//   socket.emit('newProduc', product) //envie los product
// })

// const productList = document.getElementById('productList')

// socket.on('products', (product) => {
//   productList.innerHTML = ''

//   product.forEach((product) => {
//     productList.innerHTML += `<div class="card w-25 mt-5 border border-dark">
//         <div class="card-header text-white bg-dark">${product.title}</div>
//         <div class="card-body">
//           Price: € ${product.price}
//           <br />
//           Stock : ${product.stock}
//           <br />
//           <br />
//           <button type="button" class="btn btn-outline-dark">
//             Delete
//           </button>
//         </div>
//       </div>`
//   })
// })
