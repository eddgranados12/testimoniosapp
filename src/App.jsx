// src/App.jsx
import React, { useState, useEffect, useRef } from 'react';
import testimonios from './data';
import Testimonial from './components/Testimonial';
import Controls from './components/Controls';
import './styles.css';

export default function App() {
  const [index, setIndex] = useState(0);
  const length = testimonios.length;
  const autoplayRef = useRef(null);

  const next = () => {
    setIndex(prev => (prev + 1) % length);
  };

  const prev = () => {
    setIndex(prev => (prev - 1 + length) % length);
  };

  const random = () => {
    let randomIndex = Math.floor(Math.random() * length);
    if (randomIndex === index) {
      randomIndex = (randomIndex + 1) % length;
    }
    setIndex(randomIndex);
  };

  const handleUserAction = (actionFn) => {
    clearInterval(autoplayRef.current);
    actionFn();
    autoplayRef.current = setInterval(() => {
      setIndex(i => (i + 1) % length);
    }, 5000);
  };

  useEffect(() => {
    autoplayRef.current = setInterval(() => {
      setIndex(i => (i + 1) % length);
    }, 5000);
    
    return () => clearInterval(autoplayRef.current);
  }, [length]);

  return (
    <main className="app">
      <h1>Testimonios</h1>
      
      <div className="card-wrapper">
        <Testimonial item={testimonios[index]} />
      </div>
      
      <Controls 
        onPrev={() => handleUserAction(prev)}
        onNext={() => handleUserAction(next)}
        onRandom={() => handleUserAction(random)}
      />
      
      <p className="counter">
        {index + 1} / {length}
      </p>
    </main>
  );
}