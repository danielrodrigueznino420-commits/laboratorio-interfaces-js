/* Diseño «Cuaderno de Señales»: el inventario guarda su memoria local y responde a cada cambio con confirmaciones claras y movimiento breve. */
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
const notificacionInventario = document.getElementById("notificacionInventario");
const CLAVE_INVENTARIO = "laboratorioInterfacesJS.inventario";
let productos = cargarProductos();
let temporizadorNotificacion;

function formatoPeso(valor) { return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(valor); }

function escaparHTML(texto) {
  return String(texto).replace(/[&<>"']/g, (caracter) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[caracter]);
}

function cargarProductos() {
  try {
    const inventarioGuardado = JSON.parse(localStorage.getItem(CLAVE_INVENTARIO));
    if (!Array.isArray(inventarioGuardado)) return [];
    return inventarioGuardado.filter((producto) => producto && producto.nombre && Number(producto.precio) > 0 && Number(producto.cantidad) > 0)
      .map((producto) => ({ ...producto, precio: Number(producto.precio), cantidad: Number(producto.cantidad) }));
  } catch (error) {
    return [];
  }
}

function guardarProductos() {
  localStorage.setItem(CLAVE_INVENTARIO, JSON.stringify(productos));
}

function mostrarNotificacion(mensaje) {
  clearTimeout(temporizadorNotificacion);
  notificacionInventario.textContent = mensaje;
  notificacionInventario.classList.add("visible");
  temporizadorNotificacion = setTimeout(() => notificacionInventario.classList.remove("visible"), 3200);
}

function actualizarInventario(productoNuevoId = null) {
  tablaInventario.innerHTML = "";
  if (productos.length === 0) {
    tablaInventario.innerHTML = '<tr><td class="empty-row" colspan="6">Aún no hay productos. Registra el primero desde el formulario.</td></tr>';
  } else {
    productos.forEach((producto) => {
      const fila = document.createElement("tr");
      if (producto.id === productoNuevoId) fila.classList.add("fila-entrada");
      fila.innerHTML = `<td><strong>${escaparHTML(producto.nombre)}</strong></td><td>${escaparHTML(producto.categoria)}</td><td>${formatoPeso(producto.precio)}</td><td>${producto.cantidad}</td><td><strong>${formatoPeso(producto.precio * producto.cantidad)}</strong></td><td><button class="delete-button" type="button" data-id="${producto.id}">Eliminar</button></td>`;
      tablaInventario.appendChild(fila);
      fila.querySelector(".delete-button").addEventListener("click", () => eliminarProducto(producto.id, fila));
    });
  }

  const unidades = productos.reduce((total, producto) => total + producto.cantidad, 0);
  const valorTotal = productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  contadorProductos.textContent = productos.length;
  valorInventario.textContent = formatoPeso(valorTotal);
  resumenInventario.innerHTML = `<div class="summary-grid"><div><span>Referencias</span><b>${productos.length}</b></div><div><span>Unidades</span><b>${unidades}</b></div><div><span>Valor total</span><b>${formatoPeso(valorTotal)}</b></div></div>`;

}

function eliminarProducto(id, fila) {
  const productoEliminado = productos.find((producto) => producto.id === id);
  fila.classList.add("fila-salida");
  setTimeout(() => {
    productos = productos.filter((producto) => producto.id !== id);
    guardarProductos();
    actualizarInventario();
    mostrarNotificacion(`“${productoEliminado.nombre}” se eliminó del inventario.`);
  }, 220);
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

  const nuevoProducto = { id: Date.now(), nombre, precio, cantidad, categoria };
  productos.push(nuevoProducto);
  guardarProductos();
  errorInventario.textContent = "";
  formularioInventario.reset();
  actualizarInventario(nuevoProducto.id);
  mostrarNotificacion(`“${nombre}” se agregó al inventario.`);
}

formularioInventario.addEventListener("submit", (evento) => { evento.preventDefault(); agregarProducto(); });
actualizarInventario();
