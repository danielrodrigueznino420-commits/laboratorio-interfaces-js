/* Diseño «Cuaderno de Señales»: interacción breve y visible; los datos ingresados se convierten en una observación editorial. */
const formularioRegistro = document.getElementById("formularioRegistro");
const nombreInput = document.getElementById("nombre");
const edadInput = document.getElementById("edad");
const correoInput = document.getElementById("correo");
const ciudadInput = document.getElementById("ciudad");
const errorRegistro = document.getElementById("errorRegistro");
const resultadoRegistro = document.getElementById("resultadoRegistro");

function limpiarTexto(texto) {
  return texto.replace(/[&<>'"]/g, (caracter) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", "'": "&#39;", '"': "&quot;" })[caracter]);
}

function registrarPersona() {
  const nombre = nombreInput.value.trim();
  const edad = edadInput.value.trim();
  const correo = correoInput.value.trim();
  const ciudad = ciudadInput.value.trim();

  if (!nombre || !edad || !correo || !ciudad) {
    errorRegistro.textContent = "Completa todos los campos antes de registrar los datos.";
    resultadoRegistro.innerHTML = '<p class="empty">El registro está pendiente: falta información por completar.</p>';
    return;
  }

  if (Number(edad) <= 0) {
    errorRegistro.textContent = "La edad debe ser un número mayor que cero.";
    return;
  }

  errorRegistro.textContent = "";
  resultadoRegistro.innerHTML = `
    <p class="observation">Hola, <strong>${limpiarTexto(nombre)}</strong>. Tienes <strong>${limpiarTexto(edad)}</strong> años y vives en <strong>${limpiarTexto(ciudad)}</strong>.</p>
    <div class="result-meta"><div><span>Correo registrado</span><b>${limpiarTexto(correo)}</b></div><div><span>Estado</span><b>Registro completo</b></div></div>`;
}

formularioRegistro.addEventListener("submit", (evento) => {
  evento.preventDefault();
  registrarPersona();
});
