const contenedorDiscos = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");


function renderProductos() {
    const productos = JSON.parse(localStorage.getItem("discos")) || [];
    console.log(productos);

    contenedorDiscos.innerHTML = '';

    if (productos && productos.length > 0) {
        productos.forEach(producto => {
            const contenedor = document.createElement("section");
            contenedor.className = "discos";
            contenedor.innerHTML = `
                                <p>Album número ${producto.id}</p>
                                <img src="${producto.imagen}" alt="${producto.nombre}">                        
                                <h2>${producto.nombre}</h2>
                                <p>Precio: ${producto.precio} U$D</p>
                                <div>
                                    <button class="agregarAlCarrito">-</button>
                                    <span class="cantidad">${producto.cantidad}<span/> 
                                    <button class="agregarAlCarrito">+</button>
                                <div/>`
            ;                   
            contenedorDiscos.appendChild(contenedor);
            contenedor.getElementsByTagName("button")[1]
            .addEventListener("click", (e) => {
                const cuentaElement = e.target.parentElement.getElementsByTagName("span")[0];
                cuentaElement.innerText = agregarAlCarrito(producto);
                actualizarTotales();
            });

            contenedor.getElementsByTagName("button")[0]
            .addEventListener("click", (e) => {
                restarAlCarrito(producto);
                renderProductos();
                actualizarTotales();
            });
        });
    }
}


function actualizarTotales(){
    const productos = JSON.parse(localStorage.getItem("discos")) || [];
    let unidades = 0;
    let precio = 0;
    if(productos && productos.length>0){
    productos.forEach(producto =>{
        unidades += producto.cantidad;
        precio += producto.precio * producto.cantidad
    })
    unidadesElement.innerText = unidades;
    precioElement.innerText = precio
    }

}
document.addEventListener("DOMContentLoaded", () => {
    renderProductos();
    actualizarTotales ();
}); 