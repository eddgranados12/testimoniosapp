// src/components/Controls.jsx
import React from 'react';

export default function Controls({
  onPrev, onNext, onRandom, onGoTo, onTogglePause,
  index, total, paused, testimonios,
}) {
  return (
    <div className="controls-wrapper">
      {/* Botones de navegación */}
      <div className="controls" role="group" aria-label="Navegación de testimonios">
        <button onClick={onPrev} aria-label="Testimonio anterior (←)">
          ← Anterior
        </button>

        <button
          className={`btn-pause${paused ? ' is-paused' : ''}`}
          onClick={onTogglePause}
          aria-label={paused ? 'Reanudar autoplay' : 'Pausar autoplay'}
          aria-pressed={paused}
        >
          {paused ? '▶' : '⏸'}
        </button>

        <button
          className="btn-random"
          onClick={onRandom}
          aria-label="Testimonio aleatorio"
        >
          ⟳ Aleatorio
        </button>

        <button onClick={onNext} aria-label="Siguiente testimonio (→)">
          Siguiente →
        </button>
      </div>

      {/* Indicadores dot */}
      <div className="dots" role="tablist" aria-label="Ir a testimonio">
        {Array.from({ length: total }).map((_, i) => (
          <button
            key={i}
            role="tab"
            aria-selected={i === index}
            aria-label={`Ir al testimonio ${i + 1}${testimonios ? ': ' + testimonios[i].name : ''}`}
            className={`dot${i === index ? ' dot-active' : ''}`}
            onClick={() => onGoTo(i)}
          />
        ))}
      </div>

      {/* Contador */}
      <p className="counter" aria-label={`Testimonio ${index + 1} de ${total}`}>
        {index + 1} <span className="counter-sep">/</span> {total}
      </p>

      {/* Nota de pausa */}
      <p
        className="pause-note"
        aria-live="polite"
        style={{ opacity: paused ? 1 : 0 }}
      >
        ⏸ Autoplay pausado — reanuda en 8 s
      </p>

      <p className="keyboard-hint" aria-hidden="true">
        Usa ← → para navegar · autoplay cada 5 s
      </p>
    </div>
  );
}
