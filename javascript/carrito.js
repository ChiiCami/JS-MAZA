function agregarAlCarrito(producto){
    const memoria = JSON.parse(localStorage.getItem("discos")) || [];
    console.log(memoria);

    const indiceProducto = memoria.findIndex(disco => disco.id === producto.id);
    console.log(indiceProducto);

    if (indiceProducto === -1) {
        const nuevoProducto = getNuevoProductoParaMemoria(producto);
        memoria.push(nuevoProducto);
    } else {
        memoria[indiceProducto].cantidad++;
    }

    localStorage.setItem("discos", JSON.stringify(memoria));

    actualizarCantidadCarrito ();
}

function getNuevoProductoParaMemoria(producto) {
    return { ...producto, cantidad: 1 };
}

function actualizarCantidadCarrito() {
    const cuentaCantidadCarrito = document.getElementById("cantidad-carrito");
    if (cuentaCantidadCarrito) {
        // Obtén el carrito de localStorage o inicializa uno vacío
        const memoria = JSON.parse(localStorage.getItem("discos")) || [];
        // Calcula la cantidad total de productos en el carrito
        const cuenta = memoria.reduce((acum, current) => acum + current.cantidad, 0);
        // Actualiza el texto del elemento que muestra la cantidad
        cuentaCantidadCarrito.innerText = cuenta;
    }
}
document.addEventListener("DOMContentLoaded", () => {
    actualizarCantidadCarrito();
});
