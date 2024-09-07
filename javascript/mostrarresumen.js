document.addEventListener("DOMContentLoaded", () => {
  // Llama a la función para mostrar el resumen de compra y actualizar el contador del carrito cuando el DOM se carga completamente.
  mostrarResumenCompra();
  actualizarCantidadCarrito();

  // Función para mostrar el resumen de compra
  function mostrarResumenCompra() {
    try {
      // Obtiene los productos del carrito desde el localStorage o inicializa un array vacío si no hay productos.
      const productos = JSON.parse(localStorage.getItem("discos")) || [];
      // Obtiene los elementos del DOM donde se mostrará el resumen de productos y el total de la compra.
      const resumenProductos = document.getElementById("resumen-productos");
      const totalCompra = document.getElementById("total-compra");

      if (productos.length > 0) {
        let htmlProductos = "";
        let total = 0;

        // Recorre cada producto para crear el HTML del resumen y calcular el total.
        productos.forEach((producto) => {
          htmlProductos += `
                        <div class="card mb-2">
                            <div class="card-body">
                                <h5 class="card-title">${producto.nombre}</h5>
                                <p class="card-text">Precio: $${producto.precio.toFixed(
                                  2
                                )}</p>
                                <p class="card-text">Cantidad: ${
                                  producto.cantidad
                                }</p>
                                <p class="card-text">Subtotal: $${(
                                  producto.precio * producto.cantidad
                                ).toFixed(2)}</p>
                            </div>
                        </div>
                    `;
          // Calcula el total acumulado de la compra.
          total += producto.precio * producto.cantidad;
        });

        // Actualiza el contenido HTML con el resumen de productos y el total de la compra.
        resumenProductos.innerHTML = htmlProductos;
        totalCompra.innerHTML = `
                    <div class="card">
                        <div class="card-body">
                            <h4 class="card-title">Total de la Compra</h4>
                            <p class="card-text">Total: ${total.toFixed(
                              2
                            )} U$D</p>
                        </div>
                    </div>
                `;
      } else {
        // Si no hay productos en el carrito, muestra un mensaje informativo y un total de 0.
        resumenProductos.innerHTML = "<p>No hay productos en el carrito.</p>";
        totalCompra.innerHTML = "<p>Total: 0.00 U$D</p>";
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Error",
        text: "Error al cargar el resumen de la compra.",
        confirmButtonColor: "#00b09b",
      });
      document.getElementById("resumen-productos").innerHTML =
        "<p>Error al cargar el resumen de la compra.</p>";
      document.getElementById("total-compra").innerHTML =
        "<p>Total: 0.00 U$D</p>";
    }
  }

  // Funcionalidad del botón de pagar
  const botonPagar = document.querySelector("#boton-pagar");
  if (botonPagar) {
    botonPagar.addEventListener("click", (event) => {
      event.preventDefault();

      // Obtiene los productos del carrito desde el localStorage o inicializa un array vacío si no hay productos.
      const productos = JSON.parse(localStorage.getItem("discos")) || [];
      if (productos.length > 0) {
        // Muestra una notificación de éxito y redirige al usuario a la página de inicio si la compra es exitosa.
        Swal.fire({
          icon: "success",
          title: "Compra Exitosa",
          text: "Tu compra ha sido realizada con éxito. Gracias por elegirnos.",
          confirmButtonColor: "#00b09b",
        }).then((result) => {
          if (result.isConfirmed) {
            // Vacía el carrito y actualiza el resumen de compra. Luego redirige al usuario a la página principal.
            localStorage.removeItem("discos");
            mostrarResumenCompra();
            window.location.href = "../index.html";
          }
        });
      } else {
        // Muestra una advertencia si el carrito está vacío.
        Swal.fire({
          icon: "warning",
          title: "Carrito vacío",
          text: "El carrito está vacío. Agrega productos antes de comprar.",
          confirmButtonColor: "#00b09b",
        });
      }
    });
  }
});
