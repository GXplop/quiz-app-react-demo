import React from 'react';
import '../styles/ResultsScreen.css';

const ResultsScreen = ({ score, totalQuestions, onRestart }) => {
  const percentage = Math.round((score / totalQuestions) * 100);
  
  let message, messageClass;
  
  if (percentage >= 80) {
    message = '¡Excelente trabajo! 🏆';
    messageClass = 'excellent';
  } else if (percentage >= 60) {
    message = '¡Buen trabajo! 👍';
    messageClass = 'good';
  } else if (percentage >= 40) {
    message = 'No está mal, pero puedes mejorar 💪';
    messageClass = 'average';
  } else {
    message = 'Sigue practicando, ¡tú puedes! 💪';
    messageClass = 'poor';
  }

  return (
    <div className="results-screen">
      <h1>Resultados del Cuestionario</h1>
      
      <div className="score-container">
        <div className="score-circle">
          <span className="score-percentage">{percentage}%</span>
          <div className="score-text">
            {score} de {totalQuestions} correctas
          </div>
        </div>
      </div>
      
      <div className={`result-message ${messageClass}`}>
        {message}
      </div>
      
      <button className="restart-button" onClick={onRestart}>
        Volver a intentar
      </button>
    </div>
  );
};

export default ResultsScreen;
