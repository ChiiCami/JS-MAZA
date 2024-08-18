const contenedorDiscos = document.getElementById("productos-container");

function renderProductos(productos){
    productos.forEach(producto => {
        const contenedor = document.createElement("section");
        contenedor.className = "discos";
        contenedor.innerHTML = `<p>Album número ${producto.id}</p>
                                <img src="${producto.imagen}" alt="${producto.nombre}">                        
                                <h2>${producto.nombre}</h2>
                                <p>Precio: ${producto.precio} U$D</p>
                                <button class="agregarAlCarrito">Agregar al Carrito</button>`;
        contenedorDiscos.appendChild(contenedor);
        contenedor.getElementsByTagName("button")[0].addEventListener("click",()=>agregarAlCarrito(producto));
    });
}
  
renderProductos(discos);    


function agregarAlCarritoButton () {
    addButton = document.querySelectorAll(".agregarAlCarrito")
    addButton.forEach(button => {
        button.onclick = (e) => {
            const productId = e.currentTarget.id
            const selectedProduct = productos.find(producto => producto.id == productId)

            cartProducts.push(selectedProduct)
            console.log(cartProducts)

            localStorage.setItem("cartProducts", JSON.stringify(cartProducts))
        }

    })
}

