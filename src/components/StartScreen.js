import React from 'react';
import '../styles/StartScreen.css';

const StartScreen = ({ onStart }) => {
  return (
    <div className="start-screen">
      <h1>Bienvenido al Juego de Preguntas</h1>
      <p>Pon a prueba tus conocimientos con nuestro cuestionario interactivo.</p>
      <p>Responde correctamente a todas las preguntas para obtener la mejor puntuación.</p>
      <button className="start-button" onClick={onStart}>
        ¡Comenzar!
      </button>
    </div>
  );
};

export default StartScreen;
