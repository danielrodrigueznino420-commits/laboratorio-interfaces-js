/* Diseño «Cuaderno de Señales»: los cálculos se registran como una cuenta clara, con total destacado y validación cercana. */
const formularioCompra = document.getElementById("formularioCompra");
const productoSelect = document.getElementById("producto");
const precioInput = document.getElementById("precio");
const cantidadInput = document.getElementById("cantidad");
const descuentoInput = document.getElementById("descuento");
const errorCompra = document.getElementById("errorCompra");
const resultadoCompra = document.getElementById("resultadoCompra");

function formatoPeso(valor) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(valor);
}

function actualizarPrecio() {
  const opcionSeleccionada = productoSelect.options[productoSelect.selectedIndex];
  const precio = Number(opcionSeleccionada.dataset.precio || 0);
  precioInput.value = formatoPeso(precio);
}

function calcularCompra() {
  const opcionSeleccionada = productoSelect.options[productoSelect.selectedIndex];
  const producto = productoSelect.value;
  const precio = Number(opcionSeleccionada.dataset.precio || 0);
  const cantidad = Number(cantidadInput.value);
  const descuento = Number(descuentoInput.value || 0);

  if (!producto) {
    errorCompra.textContent = "Selecciona un producto para continuar.";
    return;
  }
  if (cantidad <= 0 || Number.isNaN(cantidad)) {
    errorCompra.textContent = "La cantidad debe ser mayor que 0.";
    return;
  }
  if (descuento < 0 || descuento > 100 || Number.isNaN(descuento)) {
    errorCompra.textContent = "El descuento debe estar entre 0 y 100 %.";
    return;
  }

  const subtotal = precio * cantidad;
  const valorDescuento = subtotal * (descuento / 100);
  const baseConDescuento = subtotal - valorDescuento;
  const iva = baseConDescuento * 0.19;
  const total = baseConDescuento + iva;
  errorCompra.textContent = "";

  resultadoCompra.innerHTML = `
    <p class="purchase-product">${producto} · ${cantidad} unidad(es)</p>
    <div class="money-list">
      <div><span>Precio unitario</span><strong>${formatoPeso(precio)}</strong></div>
      <div><span>Subtotal</span><strong>${formatoPeso(subtotal)}</strong></div>
      <div><span>Descuento (${descuento} %)</span><strong>− ${formatoPeso(valorDescuento)}</strong></div>
      <div><span>IVA (19 %)</span><strong>${formatoPeso(iva)}</strong></div>
      <div class="total-line"><span>Total a pagar</span><strong>${formatoPeso(total)}</strong></div>
    </div>`;
}

productoSelect.addEventListener("change", actualizarPrecio);
formularioCompra.addEventListener("submit", (evento) => { evento.preventDefault(); calcularCompra(); });
