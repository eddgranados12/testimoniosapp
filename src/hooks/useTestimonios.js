// src/hooks/useTestimonios.js
import { useState, useEffect, useRef, useCallback } from 'react';
 
const AUTOPLAY_MS = 5000;
const RESUME_MS   = 8000;
const TICK_MS     = 50;
 
export function useTestimonios(length) {
  const [index,     setIndex]     = useState(0);
  const [direction, setDirection] = useState('next');
  const [paused,    setPaused]    = useState(false);
  const [progress,  setProgress]  = useState(0); // 0–100
 
  const autoplayRef = useRef(null);
  const tickRef     = useRef(null);
  const resumeRef   = useRef(null);
  const startedAt   = useRef(null);
 
  const clearAll = useCallback(() => {
    clearInterval(autoplayRef.current);
    clearInterval(tickRef.current);
    clearTimeout(resumeRef.current);
  }, []);
 
  const startAutoplay = useCallback(() => {
    clearAll();
    setProgress(0);
    startedAt.current = Date.now();
 
    // Tick: refresca la barra cada TICK_MS ms
    tickRef.current = setInterval(() => {
      const elapsed = Date.now() - startedAt.current;
      setProgress(Math.min((elapsed / AUTOPLAY_MS) * 100, 100));
    }, TICK_MS);
 
    // Avance real al llegar a 5 s
    autoplayRef.current = setTimeout(() => {
      setDirection('next');
      setIndex(i => (i + 1) % length);
    }, AUTOPLAY_MS);
  }, [length, clearAll]);
 
  // Arrancar / detener según paused e index
  useEffect(() => {
    if (!paused) startAutoplay();
    else {
      clearAll();
      setProgress(0);
    }
    return clearAll;
  }, [paused, index, startAutoplay, clearAll]);
 
  /**
   * go — núcleo de navegación manual.
   * Pausa el autoplay y programa reanudación.
   */
  const go = useCallback((actionFn, dir) => {
    setDirection(dir);
    actionFn();
    setPaused(true);
    clearAll();
    setProgress(0);
    resumeRef.current = setTimeout(() => setPaused(false), RESUME_MS);
  }, [clearAll]);
 
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
 
  return { index, direction, next, prev, goTo, random, paused, setPaused, progress };
}