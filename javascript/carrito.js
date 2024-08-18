function agregarAlCarrito(producto) {
    const memoria = JSON.parse(localStorage.getItem("discos")) || [];
    console.log(memoria);
    let cuenta = 0;
    if(!memoria){
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        localStorage.setItem("discos", JSON.stringify([nuevoProducto]));
        cuenta =1;
    } else {
        const indiceProducto = memoria.findIndex(disco => disco.id);
        console.log(indiceProducto)
        const nuevaMemoria = memoria;
    if (indiceProducto === -1) {
        nuevaMemoria.push(getNuevoProductoParaMemoria(producto));
        cuenta =1;
    } else {
        memoria[indiceProducto].cantidad++;
        cuenta =nuevaMemoria[indiceProducto].cantidad;
    }
    localStorage.setItem("discos", JSON.stringify(nuevaMemoria));
    }
    actualizarCantidadCarrito();
    return cuenta;
}

function restarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("discos")) || [];
    const indiceProducto = memoria.findIndex(disco => disco.id === producto.id);
    if(memoria[indiceProducto].cantidad === 1){
        memoria.splice(indiceProducto,1);
    } else {
        memoria[indiceProducto].cantidad--;
    }
        localStorage.setItem("discos", JSON.stringify(memoria));
        actualizarCantidadCarrito();
}

function getNuevoProductoParaMemoria(producto) {
    return { ...producto, cantidad: 1 };
}

function actualizarCantidadCarrito() {
    const cuentaCantidadCarrito = document.getElementById("cantidad-carrito");
    if (cuentaCantidadCarrito) {
        const memoria = JSON.parse(localStorage.getItem("discos")) || [];
        const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
        cuentaCantidadCarrito.innerText = cuenta;
    }
}
actualizarCantidadCarrito();

