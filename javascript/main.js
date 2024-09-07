// Obtiene el contenedor donde se mostrarán los discos.
const contenedorDiscos = document.getElementById("productos-container");

// Realiza una solicitud para obtener datos de productos desde un archivo JSON.
fetch("./db/data.json")
  .then((response) => response.json())
  .then((data) => {
    data.forEach((producto) => {
      // Crea una Card HTML para cada producto.
      const contenedor = document.createElement("section");
      contenedor.className = "discos";
      contenedor.innerHTML = `<p>Album número ${producto.id}</p>
                                    <img src="${producto.imagen}" alt="${producto.nombre}">                        
                                    <h2>${producto.nombre}</h2>
                                    <p>Precio: U$D ${producto.precio}</p>
                                    <button class="agregarAlCarrito">Agregar al Carrito</button>`;
      contenedorDiscos.appendChild(contenedor);

      contenedor
        .querySelector(".agregarAlCarrito")
        .addEventListener("click", () => agregarAlCarrito(producto));
    });
  })
  .catch((error) => {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: `Error cargando los productos: ${error.message}. Actualiza la pagina`,
    });
  });
