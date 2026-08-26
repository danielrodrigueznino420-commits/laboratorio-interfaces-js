/* Diseño «Cuaderno de Señales»: cada evento actualiza una tabla construida desde datos reales en memoria, con resumen visible. */
const formularioInventario = document.getElementById("formularioInventario");
const nombreProductoInput = document.getElementById("nombreProducto");
const precioProductoInput = document.getElementById("precioProducto");
const cantidadProductoInput = document.getElementById("cantidadProducto");
const categoriaProductoInput = document.getElementById("categoriaProducto");
const errorInventario = document.getElementById("errorInventario");
const tablaInventario = document.getElementById("tablaInventario");
const resumenInventario = document.getElementById("resumenInventario");
const contadorProductos = document.getElementById("contadorProductos");
const valorInventario = document.getElementById("valorInventario");
let productos = [];

function formatoPeso(valor) { return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(valor); }

function actualizarInventario() {
  tablaInventario.innerHTML = "";
  if (productos.length === 0) {
    tablaInventario.innerHTML = '<tr><td class="empty-row" colspan="6">Aún no hay productos. Registra el primero desde el formulario.</td></tr>';
  } else {
    productos.forEach((producto) => {
      const fila = document.createElement("tr");
      fila.innerHTML = `<td><strong>${producto.nombre}</strong></td><td>${producto.categoria}</td><td>${formatoPeso(producto.precio)}</td><td>${producto.cantidad}</td><td><strong>${formatoPeso(producto.precio * producto.cantidad)}</strong></td><td><button class="delete-button" type="button" data-id="${producto.id}">Eliminar</button></td>`;
      tablaInventario.appendChild(fila);
    });
  }

  const unidades = productos.reduce((total, producto) => total + producto.cantidad, 0);
  const valorTotal = productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  contadorProductos.textContent = productos.length;
  valorInventario.textContent = formatoPeso(valorTotal);
  resumenInventario.innerHTML = `<div class="summary-grid"><div><span>Referencias</span><b>${productos.length}</b></div><div><span>Unidades</span><b>${unidades}</b></div><div><span>Valor total</span><b>${formatoPeso(valorTotal)}</b></div></div>`;

  document.querySelectorAll(".delete-button").forEach((boton) => {
    boton.addEventListener("click", () => eliminarProducto(Number(boton.dataset.id)));
  });
}

function eliminarProducto(id) {
  productos = productos.filter((producto) => producto.id !== id);
  actualizarInventario();
}

function agregarProducto() {
  const nombre = nombreProductoInput.value.trim();
  const precio = Number(precioProductoInput.value);
  const cantidad = Number(cantidadProductoInput.value);
  const categoria = categoriaProductoInput.value;

  if (!nombre || !categoria) {
    errorInventario.textContent = "Escribe el nombre y selecciona una categoría.";
    return;
  }
  if (precio <= 0 || cantidad <= 0 || Number.isNaN(precio) || Number.isNaN(cantidad)) {
    errorInventario.textContent = "El precio y la cantidad deben ser mayores que cero.";
    return;
  }

  productos.push({ id: Date.now(), nombre, precio, cantidad, categoria });
  errorInventario.textContent = "";
  formularioInventario.reset();
  actualizarInventario();
}

formularioInventario.addEventListener("submit", (evento) => { evento.preventDefault(); agregarProducto(); });
actualizarInventario();
