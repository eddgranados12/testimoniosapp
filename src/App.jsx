// src/App.jsx
import React from 'react';
import testimonios from './data';
import Testimonial from './components/Testimonial';
import Controls from './components/Controls';
import { useTestimonios } from './hooks/useTestimonios';
import './styles.css';

export default function App() {
  const total = testimonios.length;
  const { index, direction, next, prev, goTo, random, paused, setPaused, progress } =
    useTestimonios(total);

  const current = testimonios[index];

  return (
    <main className="app">
      {/* Header */}
      <header className="app-header">
        <span className="app-label">Lo que dicen de nosotros</span>
        <h1>Testimonios</h1>
      </header>

      {/* Barra de progreso del autoplay */}
      <div className="autoplay-bar-wrap" aria-hidden="true">
        <div
          className={`autoplay-bar-fill${paused ? ' is-paused' : ''}`}
          style={{ width: `${progress}%` }}
        />
      </div>

      {/* Card wrapper — los ::before/::after de CSS crean el efecto stack 3D */}
      <div className="card-wrapper">
        {/* key fuerza remount → re-dispara la animación CSS en cada cambio */}
        <Testimonial
          key={index}
          item={current}
          direction={direction}
          index={index}
          total={total}
        />
      </div>

      {/* Controles */}
      <Controls
        onPrev={prev}
        onNext={next}
        onRandom={random}
        onGoTo={goTo}
        onTogglePause={() => setPaused(p => !p)}
        index={index}
        total={total}
        paused={paused}
        testimonios={testimonios}
      />
    </main>
  );
}
