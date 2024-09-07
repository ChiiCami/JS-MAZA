// Añade un producto al carrito. Si el producto ya está en el carrito, incrementa la cantidad. Si el producto no esta en el carrito, se agrega con la cantidad inicial de 1.

function agregarAlCarrito(producto) {
  let memoria;
  try {
    // Obtiene el array de productos del localStorage o inicializa uno vacío si no existe.
    memoria = JSON.parse(localStorage.getItem("discos")) || [];

    // Busca el índice del producto en el carrito.
    const indiceProducto = memoria.findIndex(
      (disco) => disco.id === producto.id
    );

    // Si el producto no está en el carrito, lo agrega con cantidad inicial de 1.
    if (indiceProducto === -1) {
      memoria.push(getNuevoProductoParaMemoria(producto));
    } else {
      // Si el producto ya está en el carrito, incrementa la cantidad.
      if (!memoria[indiceProducto].cantidad) {
        memoria[indiceProducto].cantidad = 1;
      } else {
        memoria[indiceProducto].cantidad++;
      }
    }

    // Guarda el carrito actualizado en localStorage.
    localStorage.setItem("discos", JSON.stringify(memoria));

    // Actualiza el contador de productos en el carrito.
    actualizarCantidadCarrito();

    // Muestra una notificación de éxito.
    Toastify({
      text: `${producto.nombre} ha sido añadido al carrito.`,
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#00b09b",
    }).showToast();

    // Retorna la nueva cantidad del producto en el carrito (o 1 si es un producto nuevo).
    return memoria[indiceProducto] ? memoria[indiceProducto].cantidad : 1;
  } catch (error) {
    Toastify({
      text: "Hubo un problema al añadir el producto al carrito.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#FF5F5F",
    }).showToast();
  }
}

// Reduce la cantidad de un producto en el carrito. Si la cantidad llega a 1, elimina el producto del carrito. Muestra una notificación de éxito o error según el resultado de la operación.
function restarAlCarrito(producto) {
  let memoria;
  try {
    // Obtiene el array de productos del localStorage o inicializa uno vacío si no existe.
    memoria = JSON.parse(localStorage.getItem("discos")) || [];

    // Busca el índice del producto en el carrito.
    const indiceProducto = memoria.findIndex(
      (disco) => disco.id === producto.id
    );

    if (indiceProducto !== -1) {
      // Si la cantidad del producto es 1, lo elimina del carrito.
      if (memoria[indiceProducto].cantidad === 1) {
        memoria.splice(indiceProducto, 1);
        Toastify({
          text: `El producto "${producto.nombre}" ha sido eliminado del carrito.`,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#FF5F5F",
        }).showToast();
      } else if (memoria[indiceProducto].cantidad > 1) {
        // Si la cantidad del producto es mayor a 1, la reduce en 1.
        memoria[indiceProducto].cantidad--;
        Toastify({
          text: `La cantidad del producto "${producto.nombre}" ha sido reducida.`,
          duration: 3000,
          gravity: "top",
          position: "right",
          backgroundColor: "#4d211f",
        }).showToast();
      }
      // Guarda el carrito actualizado en localStorage.
      localStorage.setItem("discos", JSON.stringify(memoria));
      actualizarCantidadCarrito();
    }
  } catch (error) {
    Toastify({
      text: "Hubo un problema al restar el producto del carrito.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: "#FF5F5F",
    }).showToast();
  }
}

// Crea un nuevo producto con una cantidad inicial de 1.
function getNuevoProductoParaMemoria(producto) {
  return { ...producto, cantidad: 1 };
}

//Actualiza la cantidad total de productos en el carrito.
function actualizarCantidadCarrito() {
  // Obtiene el array de productos del localStorage o inicializa uno vacío si no existe.
  const cuentaCantidadCarrito = document.getElementById("cantidad-carrito");

  if (cuentaCantidadCarrito) {
    try {
      // Obtiene el array de productos del localStorage o inicializa uno vacío si no existe.
      const memoria = JSON.parse(localStorage.getItem("discos")) || [];

      // Calcula la cantidad total de productos en el carrito.
      const cuenta = memoria.reduce(
        (acum, current) => acum + (current.cantidad || 0),
        0
      );

      // Actualiza el texto del contador de productos en el carrito.
      cuentaCantidadCarrito.innerText = cuenta;
    } catch (error) {
      // Establece el contador en 0 en caso de error
      cuentaCantidadCarrito.innerText = "0";
    }
  }
}

// Calcula y actualiza el total de unidades y el precio total de los productos en el carrito.
function actualizarTotales() {
  try {
    // Obtiene el array de productos del localStorage o inicializa uno vacío si no existe.
    const productos = JSON.parse(localStorage.getItem("discos")) || [];
    let unidades = 0;
    let precio = 0;

    // Suma la cantidad total y el precio total de los productos.
    productos.forEach((producto) => {
      unidades += producto.cantidad;
      precio += producto.precio * producto.cantidad;
    });

    // Actualiza los elementos del DOM con el total de unidades y el precio total.
    const unidadesElement = document.getElementById("unidades");
    const precioElement = document.getElementById("precio");

    if (unidadesElement) unidadesElement.innerText = unidades;
    if (precioElement) precioElement.innerText = precio.toFixed(2);
  } catch (error) {
    Toastify({
      text: "Hubo un problema al actualizar las cantidades.",
      duration: 3000,
      gravity: "top",
      position: "right",
      backgroundColor: " #FF5F5F",
    }).showToast();
  }
}

// Al cargar el contenido del DOM, actualiza el contador de productos y los totales.
document.addEventListener("DOMContentLoaded", () => {
  actualizarCantidadCarrito();
  actualizarTotales();
});
