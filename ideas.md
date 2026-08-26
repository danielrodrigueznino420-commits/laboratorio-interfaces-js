# Dirección visual — Laboratorio de Interfaces JS

## Tres posibles enfoques

| Tema | Introducción breve | Probabilidad |
| --- | --- | --- |
| **Cuaderno de Señales** | Un laboratorio editorial de tonos marfil y azul tinta, con tarjetas que parecen fichas de estudio y acentos cálidos. Busca hacer que cada práctica se sienta clara, tangible y estimulante. | 0.07 |
| **Mecánica de Aprendizaje** | Una interfaz de inspiración industrial suave, con paneles modularizados, indicadores de estado y códigos de color por ejercicio. Evoca la precisión de una herramienta construida para experimentar. | 0.04 |
| **Jardín de Datos** | Un entorno luminoso y orgánico que convierte cada formulario en una pequeña estación de crecimiento, usando verdes botánicos y detalles de papel. Propone un aprendizaje lento y amable. | 0.09 |

## Enfoque seleccionado: Cuaderno de Señales

### Movimiento de diseño

**Editorial académico contemporáneo**, combinado con el lenguaje visual de una libreta de laboratorio. La interfaz evita el aspecto de plantilla; privilegia los márgenes generosos, la tipografía expresiva y los datos presentados como observaciones estructuradas.

### Principios rectores

1. **Claridad como jerarquía:** cada ejercicio expone objetivo, datos de entrada y resultado en una secuencia obvia.
2. **Materialidad digital:** fondos de papel, líneas de registro y sombras suaves dan profundidad sin distraer del aprendizaje.
3. **Color con intención:** cada ejercicio tiene un acento propio para facilitar la orientación y la memoria visual.
4. **Respuesta visible:** los mensajes, cálculos y estados cambian de forma inmediata, legible y acompañada de microinteracciones discretas.

### Filosofía cromática

El fondo marfil cálido aporta calma de cuaderno; el azul tinta comunica rigor y lectura prolongada. Las notas coral, azafrán, verde y violeta distinguen actividades sin depender solo del texto. El tono distintivo de marca es **Azul Cobalto de Registro (#1E4B8F)**: profundo, académico y fácilmente reconocible en botones, marcas y estados activos.

### Paradigma de composición

La página principal funciona como una **mesa de trabajo vertical**: una franja introductoria asimétrica a la izquierda, un registro de progreso a la derecha y módulos de ejercicios escalonados. Cada ejercicio se abre como una pieza autónoma, con una cabecera de ficha, un formulario y un área de resultados que no parece una alerta genérica.

### Elementos distintivos

1. **El margen de libreta:** una línea vertical coloreada y pequeños indicadores numéricos acompañan títulos y módulos.
2. **Fichas de observación:** resultados y validaciones se presentan como notas ancladas, con etiquetas de estado y lectura rápida.
3. **Puntos de registro:** pequeños nodos circulares marcan los cuatro ejercicios en la navegación y el pie de cada página.

### Filosofía de interacción

Las acciones deben sentirse como registrar una observación: botones claros, validación cercana al campo y resultado visible sin recargar. Los controles responden al foco de teclado y los cambios importantes resaltan únicamente el bloque afectado.

### Animación

Las tarjetas entran por una transición breve de opacidad y desplazamiento vertical de 8 px. Botones y tarjetas responden con desplazamientos de hasta 2 px y duración máxima de 180 ms. Los resultados aparecen con opacidad y una leve elevación; se respeta `prefers-reduced-motion`.

### Sistema tipográfico

**DM Serif Display** se reserva para los encabezados principales y cifras destacadas, aportando el gesto editorial. **Manrope** se emplea en texto funcional, etiquetas, formularios y tablas por su alta legibilidad. Los títulos usan una escala marcada; etiquetas y ayudas se escriben con mayúsculas espaciadas, sin abusar de ellas.

### Esencia de marca

**Laboratorio de Interfaces JS convierte prácticas fundamentales de JavaScript en experiencias de interfaz claras, táctiles y visualmente memorables.** Personalidad: **metódica, cercana y estimulante**.

### Voz de marca

Los titulares son directos, curiosos y orientados a la acción. Los llamados a la acción usan verbos concretos y las ayudas explican lo justo, sin relleno genérico.

> «Registra el dato. Observa el cambio.»

> «Calcula, valida y deja que la interfaz te responda.»

### Wordmark y símbolo

La marca utiliza un **monograma “<>” construido como una libreta abierta**, acompañado por el nombre en DM Serif Display. El símbolo no depende del texto para reconocerse y se usa como elemento de navegación y favicon.

## Style Decisions

- El **Azul Cobalto de Registro #1E4B8F** se reserva de forma permanente para navegación, acciones principales, estados activos y líneas de registro. Los colores de cada práctica funcionan únicamente como identificadores secundarios.
- Cada práctica muestra el monograma **“<>” como libreta abierta** junto al nombre del laboratorio en DM Serif Display; la etiqueta funcional del ejercicio acompaña la marca, sin sustituirla.
- El margen de libreta combina una línea vertical, nodo numerado y fichas de observación, de modo que formularios, resultados y tablas se lean como registros de laboratorio y no como componentes administrativos genéricos.
- El monograma **“<>”** debe conservar la lectura de libreta abierta aun en una cabecera compacta; la marca Laboratorio de Interfaces JS mantiene una presencia equivalente a la etiqueta del ejercicio.
- Las tablas, filtros y estados vacíos se expresan como **registros de observación sobre papel**, con etiquetas, notas de contexto y acciones integradas en el lenguaje del cuaderno.
- El violeta identifica exclusivamente la práctica de inventario en nodos, sellos y énfasis puntuales; el Azul Cobalto de Registro conserva la jerarquía principal de navegación, estructura y acciones.
