/* Diseño «Cuaderno de Señales»: el inventario persiste, se organiza por categoría y permite registrar correcciones desde su propia tabla. */
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
const filtroCategoria = document.getElementById("filtroCategoria");
const estadoFiltro = document.getElementById("estadoFiltro");
const vaciarInventarioBoton = document.getElementById("vaciarInventario");
const CLAVE_INVENTARIO = "laboratorioInterfacesJS.inventario";
const CATEGORIAS = ["Tecnología", "Oficina", "Accesorios", "Hogar"];
let productos = cargarProductos();
let categoriaActiva = "";
let temporizadorNotificacion;

function formatoPeso(valor) {
  return new Intl.NumberFormat("es-CO", { style: "currency", currency: "COP", maximumFractionDigits: 0 }).format(valor);
}

function escaparHTML(texto) {
  return String(texto).replace(/[&<>"']/g, (caracter) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[caracter]);
}

function cargarProductos() {
  try {
    const inventarioGuardado = JSON.parse(localStorage.getItem(CLAVE_INVENTARIO));
    if (!Array.isArray(inventarioGuardado)) return [];
    return inventarioGuardado
      .filter((producto) => producto && producto.nombre && Number(producto.precio) > 0 && Number(producto.cantidad) > 0)
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

function opcionesDeCategoria(categoriaSeleccionada) {
  return CATEGORIAS.map((categoria) => `<option value="${categoria}" ${categoria === categoriaSeleccionada ? "selected" : ""}>${categoria}</option>`).join("");
}

function productosFiltrados() {
  return productos.filter((producto) => !categoriaActiva || producto.categoria === categoriaActiva);
}

function actualizarInventario(productoDestacadoId = null) {
  const productosVisibles = productosFiltrados();
  tablaInventario.innerHTML = "";

  if (productosVisibles.length === 0) {
    const mensajeVacio = productos.length === 0
      ? "Aún no hay observaciones registradas. Anota el primer producto."
      : `Sin observaciones en la categoría “${escaparHTML(categoriaActiva)}”.`;
    tablaInventario.innerHTML = `<tr><td class="empty-row" colspan="6">${mensajeVacio}</td></tr>`;
  } else {
    productosVisibles.forEach((producto) => {
      const fila = document.createElement("tr");
      if (producto.id === productoDestacadoId) fila.classList.add("fila-entrada");
      fila.innerHTML = `
        <td><strong>${escaparHTML(producto.nombre)}</strong></td>
        <td>${escaparHTML(producto.categoria)}</td>
        <td>${formatoPeso(producto.precio)}</td>
        <td>${producto.cantidad}</td>
        <td><strong>${formatoPeso(producto.precio * producto.cantidad)}</strong></td>
        <td class="table-actions"><button class="edit-button" type="button">Editar</button><button class="delete-button" type="button">Eliminar</button></td>`;
      tablaInventario.appendChild(fila);
      fila.querySelector(".edit-button").addEventListener("click", () => iniciarEdicion(producto.id, fila));
      fila.querySelector(".delete-button").addEventListener("click", () => eliminarProducto(producto.id, fila));
    });
  }

  const unidades = productos.reduce((total, producto) => total + producto.cantidad, 0);
  const valorTotal = productos.reduce((total, producto) => total + (producto.precio * producto.cantidad), 0);
  contadorProductos.textContent = productosVisibles.length;
  valorInventario.textContent = formatoPeso(valorTotal);
  resumenInventario.innerHTML = `<div class="summary-grid"><div><span>Referencias</span><b>${productos.length}</b></div><div><span>Unidades</span><b>${unidades}</b></div><div><span>Valor total</span><b>${formatoPeso(valorTotal)}</b></div></div>`;
  estadoFiltro.textContent = categoriaActiva
    ? `Observación filtrada: ${categoriaActiva}. ${productosVisibles.length} producto(s) visible(s).`
    : `Todas las observaciones están visibles. ${productosVisibles.length} producto(s) visible(s).`;
  vaciarInventarioBoton.disabled = productos.length === 0;
}

function eliminarProducto(id, fila) {
  const productoEliminado = productos.find((producto) => producto.id === id);
  if (!productoEliminado) return;
  fila.classList.add("fila-salida");
  setTimeout(() => {
    productos = productos.filter((producto) => producto.id !== id);
    guardarProductos();
    actualizarInventario();
    mostrarNotificacion(`Registro retirado: “${productoEliminado.nombre}”.`);
  }, 220);
}

function iniciarEdicion(id, fila) {
  const producto = productos.find((item) => item.id === id);
  if (!producto) return;
  fila.classList.add("fila-edicion");
  fila.innerHTML = `
    <td><input class="edit-field" data-campo="nombre" aria-label="Nombre del producto" type="text" value="${escaparHTML(producto.nombre)}" /></td>
    <td><select class="edit-field" data-campo="categoria" aria-label="Categoría del producto">${opcionesDeCategoria(producto.categoria)}</select></td>
    <td><input class="edit-field edit-number" data-campo="precio" aria-label="Precio del producto" type="number" min="1" value="${producto.precio}" /></td>
    <td><input class="edit-field edit-number" data-campo="cantidad" aria-label="Cantidad del producto" type="number" min="1" value="${producto.cantidad}" /></td>
    <td><strong>${formatoPeso(producto.precio * producto.cantidad)}</strong></td>
    <td class="table-actions"><button class="save-button" type="button">Guardar</button><button class="cancel-button" type="button">Cancelar</button></td>`;
  fila.querySelector(".save-button").addEventListener("click", () => guardarEdicion(id, fila));
  fila.querySelector(".cancel-button").addEventListener("click", () => actualizarInventario());
}

function guardarEdicion(id, fila) {
  const producto = productos.find((item) => item.id === id);
  if (!producto) return;
  const nombre = fila.querySelector('[data-campo="nombre"]').value.trim();
  const categoria = fila.querySelector('[data-campo="categoria"]').value;
  const precio = Number(fila.querySelector('[data-campo="precio"]').value);
  const cantidad = Number(fila.querySelector('[data-campo="cantidad"]').value);

  if (!nombre || !categoria || precio <= 0 || cantidad <= 0 || Number.isNaN(precio) || Number.isNaN(cantidad)) {
    mostrarNotificacion("Revisa los datos antes de guardar la edición.");
    return;
  }

  Object.assign(producto, { nombre, categoria, precio, cantidad });
  guardarProductos();
  actualizarInventario(id);
  mostrarNotificacion(`Ficha actualizada: “${nombre}”.`);
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
  mostrarNotificacion(`Registro guardado: “${nombre}”.`);
}

function vaciarInventario() {
  if (productos.length === 0) return;
  const confirmar = window.confirm("¿Deseas vaciar todo el inventario? Esta acción eliminará los productos guardados en este navegador.");
  if (!confirmar) return;
  productos = [];
  guardarProductos();
  actualizarInventario();
  mostrarNotificacion("El cuaderno de inventario quedó listo para una nueva observación.");
}

formularioInventario.addEventListener("submit", (evento) => { evento.preventDefault(); agregarProducto(); });
filtroCategoria.addEventListener("change", () => { categoriaActiva = filtroCategoria.value; actualizarInventario(); });
vaciarInventarioBoton.addEventListener("click", vaciarInventario);
actualizarInventario();
