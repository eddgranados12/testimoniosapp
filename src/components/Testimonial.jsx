// src/components/Testimonial.jsx
import React from 'react';

export default function Testimonial({ item, direction, index, total }) {
  const { name, cargo, texto, foto, tag } = item;
  const progress = ((index + 1) / total) * 100;

  return (
    <article
      className={`testimonial-card testimonial-${direction}`}
      aria-live="polite"
      aria-atomic="true"
    >
      <div className="card-content">
        {/* Etiqueta de categoría */}
        <span className="testimonial-tag">{tag}</span>

        {/* Avatar con anillo degradado */}
        <div className="photo-ring">
          <img
            src={foto}
            alt={`Foto de ${name}`}
            className="testimonial-photo"
          />
        </div>

        <h2 className="testimonial-name">{name}</h2>
        <p className="testimonial-role">{cargo}</p>
        <blockquote className="testimonial-text">"{texto}"</blockquote>

        {/* Barra de progreso */}
        <div
          className="progress-bar"
          role="progressbar"
          aria-valuenow={index + 1}
          aria-valuemin={1}
          aria-valuemax={total}
          aria-label={`Testimonio ${index + 1} de ${total}`}
        >
          <div
            className="progress-bar-fill"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </article>
  );
}
