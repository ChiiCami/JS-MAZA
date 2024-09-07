// Obtiene los elementos del DOM donde se mostrarán los productos y los totales.
const contenedorDiscos = document.getElementById("productos-container");
const unidadesElement = document.getElementById("unidades");
const precioElement = document.getElementById("precio");

// Renderiza los productos en el carrito, creando elementos HTML para cada producto.
function renderProductos() {
  try {
    // Obtiene el array de productos del localStorage o inicializa uno vacío si no existe.
    const productos = JSON.parse(localStorage.getItem("discos")) || [];

    // Limpia el contenido actual del contenedor de productos.
    contenedorDiscos.innerHTML = "";

    if (productos.length > 0) {
      // Si hay productos en el carrito, crea y añade elementos HTML para cada uno.
      productos.forEach((producto) => {
        const contenedor = document.createElement("section");
        contenedor.className = "discos";
        contenedor.innerHTML = `
                        <p>Album número ${producto.id}</p>
                        <img src="${producto.imagen}" alt="${producto.nombre}">                        
                        <h2>${producto.nombre}</h2>
                        <p>Precio: U$D ${producto.precio}</p>
                        <div>
                            <button class="restar">-</button>
                            <span class="cantidad">${producto.cantidad}</span>
                            <button class="agregar">+</button>
                            <button class="eliminar">Eliminar</button>
                        </div>`;
        contenedorDiscos.appendChild(contenedor);

        // Añade un event listener para el botón "agregar" que incrementa la cantidad del producto en el carrito.
        contenedor.querySelector(".agregar").addEventListener("click", () => {
          try {
            const cuenta = agregarAlCarrito(producto);
            contenedor.querySelector(".cantidad").innerText = cuenta;
            actualizarTotales();
          } catch (error) {
            console.error("Error adding to cart:", error);
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un problema al añadir el producto al carrito. Actualiza la página.",
              confirmButtonColor: "#FF5F5F",
            });
          }
        });

        // Añade un event listener para el botón "restar" que decrementa la cantidad del producto en el carrito.
        contenedor.querySelector(".restar").addEventListener("click", () => {
          try {
            restarAlCarrito(producto);
            renderProductos(); // Vuelve a renderizar los productos para mostrar los cambios.
            actualizarTotales();
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un problema al restar el producto del carrito.",
              confirmButtonColor: "#FF5F5F",
            });
          }
        });

        // Añade un event listener para el botón "eliminar" que elimina el producto del carrito.
        contenedor.querySelector(".eliminar").addEventListener("click", () => {
          try {
            eliminarProductoDelCarrito(producto.id);
            renderProductos(); // Vuelve a renderizar los productos para mostrar los cambios.
            actualizarTotales();
            Toastify({
              text: `El producto "${producto.nombre}" ha sido eliminado del carrito.`,
              duration: 3000,
              gravity: "top",
              position: "right",
              backgroundColor: "#FF5F5F",
            }).showToast();
          } catch (error) {
            Swal.fire({
              icon: "error",
              title: "Error",
              text: "Hubo un problema al eliminar el producto del carrito.",
              confirmButtonColor: "#FF5F5F",
            });
          }
        });
      });
    } else {
      // Si no hay productos en el carrito, muestra un mensaje informativo.
      contenedorDiscos.innerHTML = "<p>No hay productos en el carrito.</p>";
    }
  } catch (error) {
    // Muestra un mensaje de error si ocurre un problema al cargar los productos.
    contenedorDiscos.innerHTML = "<p>Error al cargar los productos.</p>";
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al cargar los productos.",
      confirmButtonColor: "#FF5F5F",
    });
  }
}

// Limpia el carrito. Muestra una alerta de confirmación antes de vaciarlo.
function limpiarCarrito() {
  const productos = JSON.parse(localStorage.getItem("discos")) || [];
  if (productos.length === 0) {
    Swal.fire({
      icon: "warning",
      title: "Carrito vacío",
      text: "No tienes productos en el carrito.",
      showCancelButton: true,
      confirmButtonText: "Ir a la tienda",
      cancelButtonText: "Cancelar",
      confirmButtonColor: "#00b09b",
      cancelButtonColor: "#d33",
    }).then((result) => {
      if (result.isConfirmed) {
        window.location.href = "../index.html";
      }
    });
    return;
  }

  // Muestra una alerta de confirmación antes de vaciar el carrito.
  Swal.fire({
    title: "¿Estás seguro?",
    text: "Esto vaciará todo el carrito.",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#00b09b",
    cancelButtonColor: "#d33",
    confirmButtonText: "Sí, vaciar",
    cancelButtonText: "Cancelar",
  }).then((result) => {
    if (result.isConfirmed) {
      // Vacía el carrito y actualiza la vista.
      localStorage.removeItem("discos");
      renderProductos();
      actualizarCantidadCarrito();
      actualizarTotales();
      Swal.fire({
        icon: "success",
        title: "Carrito vaciado",
        text: "El carrito ha sido vaciado.",
        confirmButtonColor: "#00b09b",
      });
    }
  });
}

// Elimina un producto específico del carrito según su ID.
function eliminarProductoDelCarrito(productoId) {
  try {
    let memoria = JSON.parse(localStorage.getItem("discos")) || [];

    // Filtra los productos para eliminar el que coincide con el ID proporcionado.
    memoria = memoria.filter((disco) => disco.id !== productoId);

    // Guarda el carrito actualizado en localStorage.
    localStorage.setItem("discos", JSON.stringify(memoria));
  } catch (error) {
    Swal.fire({
      icon: "error",
      title: "Error",
      text: "Hubo un problema al eliminar el producto del carrito.",
      confirmButtonColor: "#FF5F5F",
    });
  }
}

// Maneja el evento de clic del botón "Comprar". Redirige al usuario a la página de compra si hay productos en el carrito.
const botonComprar = document.querySelector("#boton-comprar");
if (botonComprar) {
  botonComprar.addEventListener("click", () => {
    const productos = JSON.parse(localStorage.getItem("discos")) || [];
    if (productos.length > 0) {
      window.location.href = "./form-compra.html";
    } else {
      Swal.fire({
        icon: "warning",
        title: "Carrito vacío",
        text: "El carrito está vacío. Agrega productos antes de comprar.",
        showCancelButton: true,
        confirmButtonText: "Ir a la tienda",
        cancelButtonText: "Cancelar",
        confirmButtonColor: "#00b09b",
        cancelButtonColor: "#d33",
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.href = "../index.html";
        }
      });
    }
  });
}

// Maneja el evento de clic del botón "Reiniciar". Limpia el carrito.
const botonReiniciar = document.querySelector("#boton-reiniciar");
if (botonReiniciar) {
  botonReiniciar.addEventListener("click", limpiarCarrito);
}

// Al cargar el contenido del DOM, renderiza los productos y actualiza los totales y el contador de productos.
document.addEventListener("DOMContentLoaded", () => {
  renderProductos();
  actualizarTotales();
  actualizarCantidadCarrito();
});
