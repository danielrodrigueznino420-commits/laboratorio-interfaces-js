/* Diseño «Cuaderno de Señales»: el promedio se presenta como observación académica y la clase visual responde al resultado. */
const formularioNotas = document.getElementById("formularioNotas");
const estudianteInput = document.getElementById("estudiante");
const nota1Input = document.getElementById("nota1");
const nota2Input = document.getElementById("nota2");
const nota3Input = document.getElementById("nota3");
const errorNotas = document.getElementById("errorNotas");
const resultadoNotas = document.getElementById("resultadoNotas");
const panelResultadoNotas = document.getElementById("panelResultadoNotas");

function notasValidas(notas) { return notas.every((nota) => !Number.isNaN(nota) && nota >= 0 && nota <= 5); }

function calcularNota() {
  const estudiante = estudianteInput.value.trim();
  const nota1 = Number(nota1Input.value);
  const nota2 = Number(nota2Input.value);
  const nota3 = Number(nota3Input.value);
  const notas = [nota1, nota2, nota3];

  if (!estudiante) {
    errorNotas.textContent = "Escribe el nombre del estudiante.";
    return;
  }
  if (!notasValidas(notas)) {
    errorNotas.textContent = "Cada nota debe ser un número entre 0.0 y 5.0.";
    return;
  }

  const definitiva = (nota1 + nota2 + nota3) / 3;
  let estado = "";
  let claseEstado = "";

  if (definitiva >= 3.5) {
    estado = "APROBADO";
    claseEstado = "approved";
    panelResultadoNotas.classList.remove("reprobado");
  } else {
    estado = "REPROBADO";
    claseEstado = "failed";
    panelResultadoNotas.classList.add("reprobado");
  }

  errorNotas.textContent = "";
  resultadoNotas.innerHTML = `
    <p class="observation">${estudiante}, tu nota definitiva es <strong>${definitiva.toFixed(1)}</strong>.</p>
    <span class="status-badge ${claseEstado}">Estado: ${estado}</span>
    <div class="result-meta"><div><span>Notas ingresadas</span><b>${nota1.toFixed(1)} · ${nota2.toFixed(1)} · ${nota3.toFixed(1)}</b></div><div><span>Promedio</span><b class="status-${claseEstado}">${definitiva.toFixed(1)}</b></div></div>`;
}

formularioNotas.addEventListener("submit", (evento) => { evento.preventDefault(); calcularNota(); });
