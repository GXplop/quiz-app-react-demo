import React from 'react';
import '../styles/QuizCard.css';

const QuizCard = ({ 
  question, 
  options, 
  correctAnswer,
  selectedAnswer, 
  onAnswerSelect, 
  currentQuestion, 
  totalQuestions,
  timeLeft
}) => {
  return (
    <div className="quiz-card">
      <div className="quiz-header">
        <div className="question-counter">
          Pregunta {currentQuestion} de {totalQuestions}
        </div>
        {timeLeft > 0 && (
          <div className="timer">
            ⏱️ {timeLeft}s
          </div>
        )}
      </div>
      
      <h2 className="question">{question}</h2>
      
      <div className="options">
        {options.map((option, index) => {
          const isSelected = selectedAnswer === option;
          const isCorrect = selectedAnswer && option === correctAnswer;
          const isIncorrect = selectedAnswer && isSelected && option !== correctAnswer;
          
          let optionClass = 'option';
          if (selectedAnswer) {
            if (isCorrect) optionClass += ' correct';
            if (isIncorrect) optionClass += ' incorrect';
            if (!isSelected && option === correctAnswer) optionClass += ' show-correct';
          }
          
          return (
            <button
              key={index}
              className={optionClass}
              onClick={() => !selectedAnswer && onAnswerSelect(option)}
              disabled={!!selectedAnswer}
            >
              {option}
            </button>
          );
        })}
      </div>
      
      {selectedAnswer && (
        <div className="feedback">
          {selectedAnswer === correctAnswer ? (
            <p className="correct-feedback">¡Correcto! 🎉</p>
          ) : (
            <p className="incorrect-feedback">
              Incorrecto. La respuesta correcta es: <strong>{correctAnswer}</strong>
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default QuizCard;
