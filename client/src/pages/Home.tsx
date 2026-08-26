/**
 * Diseño «Cuaderno de Señales»: portada editorial asimétrica en marfil y azul cobalto,
 * con tipografía expresiva, acentos por práctica y superficies que evocan fichas de laboratorio.
 */
import { ArrowUpRight, Calculator, CheckCircle2, ClipboardPenLine, PackagePlus, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const exercises = [
  {
    number: "01",
    title: "Registro",
    description: "Registra datos personales y observa una respuesta visible creada con el DOM.",
    path: "./ejercicios/ejercicio-1-registro/index.html",
    image: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?auto=format&fit=crop&w=1200&q=85",
    icon: ClipboardPenLine,
    accent: "coral",
    tags: [".value", "innerHTML", "if"],
  },
  {
    number: "02",
    title: "Compra",
    description: "Registra una compra y observa subtotal, IVA y descuento en una sola ficha.",
    path: "./ejercicios/ejercicio-2-compra/index.html",
    image: "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1200&q=85",
    icon: Calculator,
    accent: "amber",
    tags: ["Number()", "cálculos", "formularios"],
  },
  {
    number: "03",
    title: "Notas",
    description: "Registra tres notas, valida los rangos y observa el estado académico.",
    path: "./ejercicios/ejercicio-3-notas/index.html",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=1200&q=85",
    icon: CheckCircle2,
    accent: "green",
    tags: ["if / else", "clases CSS", "promedio"],
  },
  {
    number: "04",
    title: "Inventario",
    description: "Registra productos y observa cómo los totales cambian con cada evento.",
    path: "./ejercicios/ejercicio-4-inventario/index.html",
    image: null,
    icon: PackagePlus,
    accent: "violet",
    tags: ["arrays", "createElement()", "eventos"],
  },
];

export default function Home() {
  return (
    <div className="lab-home">
      <header className="lab-nav">
        <a className="lab-brand" href="#inicio" aria-label="Ir al inicio del laboratorio">
          <span className="lab-brand-mark" aria-hidden="true">&lt;&gt;</span>
          <span className="lab-brand-copy"><strong>Laboratorio</strong><em>de Interfaces JS</em></span>
        </a>
        <p className="lab-nav-note">HTML · CSS · JavaScript</p>
        <a className="lab-nav-link" href="#practicas">Ver prácticas <ArrowUpRight size={16} aria-hidden="true" /></a>
      </header>

      <main id="inicio">
        <section className="lab-hero" aria-labelledby="hero-title">
          <div className="lab-hero-copy">
            <p className="eyebrow"><Sparkles size={15} aria-hidden="true" /> Cuaderno de señales</p>
            <p className="hero-index">Módulo 01 — Interfaces que responden</p>
            <h1 id="hero-title">Aprender JavaScript también puede sentirse <em>tangible.</em></h1>
            <p className="hero-lead">
              Cuatro prácticas para convertir variables, eventos y elementos del DOM en interfaces claras, funcionales y bien presentadas.
            </p>
            <a className="hero-cta" href="#practicas">Abrir el cuaderno <ArrowUpRight size={18} aria-hidden="true" /></a>
          </div>
          <div className="lab-hero-visual" aria-hidden="true">
            <img src="https://images.unsplash.com/photo-1499750310107-5fef28a66643?auto=format&fit=crop&w=1600&q=85" alt="Mesa de trabajo con cuaderno, portátil y materiales de estudio" />
            <div className="hero-stamp"><span>4</span><small>prácticas<br />interactivas</small></div>
          </div>
        </section>

        <section className="lab-intro" aria-label="Metodología del laboratorio">
          <p className="margin-label">00 / Método</p>
          <div>
            <p className="intro-main">Cada actividad es una interfaz autónoma: se llena, se valida y devuelve una observación visible.</p>
            <p className="intro-sub">Explora los ejercicios en orden o entra directamente a la herramienta que quieras practicar.</p>
          </div>
          <div className="method-points">
            <span>DOM</span><span>Eventos</span><span>Validación</span>
          </div>
        </section>

        <section id="practicas" className="lab-exercises" aria-labelledby="practice-title">
          <div className="section-heading">
            <p className="eyebrow">01 — Estaciones de trabajo</p>
            <h2 id="practice-title">Elige una práctica<br /><em>y hazla responder.</em></h2>
          </div>
          <div className="exercise-grid">
            {exercises.map((exercise) => {
              const Icon = exercise.icon;
              return (
                <Card key={exercise.number} className={`exercise-card exercise-${exercise.accent}`}>
                  <CardContent className="exercise-content">
                    <div className="exercise-topline">
                      <span className="exercise-number">{exercise.number}</span>
                      <span className="exercise-icon"><Icon size={20} aria-hidden="true" /></span>
                    </div>
                    {exercise.image ? (
                      <img className="exercise-image" src={exercise.image} alt="" />
                    ) : (
                      <div className="inventory-abstract" aria-hidden="true"><i></i><i></i><i></i><b></b></div>
                    )}
                    <h3>{exercise.title}</h3>
                    <p>{exercise.description}</p>
                    <div className="exercise-tags" aria-label={`Conceptos: ${exercise.tags.join(", ")}`}>
                      {exercise.tags.map((tag) => <span key={tag}>{tag}</span>)}
                    </div>
                    <a href={exercise.path} className="exercise-link">Abrir práctica <ArrowUpRight size={18} aria-hidden="true" /></a>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </section>
      </main>

      <footer className="lab-footer">
        <div><span className="lab-footer-mark" aria-hidden="true">&lt;&gt;</span><span>Laboratorio de Interfaces JS</span></div>
        <p>Registrar · Calcular · Validar · Actualizar</p>
      </footer>
    </div>
  );
}
