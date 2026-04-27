// src/hooks/useTestimonios.js
import { useState, useEffect, useRef, useCallback } from 'react';
 
const AUTOPLAY_MS  = 5000;
const RESUME_MS    = 8000;
 
export function useTestimonios(length) {
  const [index,     setIndex]     = useState(0);
  const [direction, setDirection] = useState('next');
  const [paused,    setPaused]    = useState(false);
  const timerRef = useRef(null);
 
  const clearTimer = useCallback(() => {
    clearInterval(timerRef.current);
    clearTimeout(timerRef.current);
  }, []);
 
  const startAutoplay = useCallback(() => {
    clearTimer();
    timerRef.current = setInterval(() => {
      setDirection('next');
      setIndex(i => (i + 1) % length);
    }, AUTOPLAY_MS);
  }, [length, clearTimer]);
 
  // Arrancar o detener autoplay según estado paused
  useEffect(() => {
    if (!paused) startAutoplay();
    else clearTimer();
    return clearTimer;
  }, [paused, startAutoplay, clearTimer]);
 
  /**
   * go — núcleo de navegación.
   * Aplica la acción, pausa el autoplay y programa la reanudación.
   */
  const go = useCallback((actionFn, dir) => {
    setDirection(dir);
    actionFn();
    setPaused(true);
    clearTimer();
    timerRef.current = setTimeout(() => setPaused(false), RESUME_MS);
  }, [clearTimer]);
 
  const next = useCallback(
    () => go(() => setIndex(i => (i + 1) % length), 'next'),
    [go, length]
  );
 
  const prev = useCallback(
    () => go(() => setIndex(i => (i - 1 + length) % length), 'prev'),
    [go, length]
  );
 
  const goTo = useCallback(
    (i) => go(() => setIndex(i), i > index ? 'next' : 'prev'),
    [go, index]
  );
 
  const random = useCallback(() => {
    let r = Math.floor(Math.random() * length);
    if (r === index) r = (r + 1) % length;
    go(() => setIndex(r), r > index ? 'next' : 'prev');
  }, [go, index, length]);
 
  // Navegación con teclado
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft')  prev();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [next, prev]);
 
  return { index, direction, next, prev, goTo, random, paused, setPaused };
}