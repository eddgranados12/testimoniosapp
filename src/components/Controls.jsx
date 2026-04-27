import React from "react";

export default function Controls({ onPrev, onNext, onRandom }) {
    return (
        <div className="controls">
            <button onClick={onPrev}>Anterior </button>
            <button onClick={onNext}>Siguiente</button>
            <button onClick={onRandom}>Aleatorio</button>
        </div>
    );
}