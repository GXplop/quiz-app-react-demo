import React, { useState, useEffect } from 'react';
import './App.css';
import StartScreen from './components/StartScreen';
import QuizCard from './components/QuizCard';
import ResultsScreen from './components/ResultsScreen';
import questions from './data/questions';

function App() {
  const [quizStarted, setQuizStarted] = useState(false);
  const [quizFinished, setQuizFinished] = useState(false);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(60);
  const [timerActive, setTimerActive] = useState(false);

  // Barajar preguntas al cargar la aplicación
  const [shuffledQuestions, setShuffledQuestions] = useState([]);

  useEffect(() => {
    // Barajar preguntas al cargar la aplicación
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  }, []);

  // Efecto para el temporizador
  useEffect(() => {
    let timer;
    if (quizStarted && !quizFinished && timerActive && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      // Tiempo agotado, pasar a la siguiente pregunta
      handleNextQuestion();
    }
    return () => clearInterval(timer);
  }, [timeLeft, quizStarted, quizFinished, timerActive]);

  const startQuiz = () => {
    setQuizStarted(true);
    setTimerActive(true);
  };

  const handleAnswerSelect = (answer) => {
    const currentQuestion = shuffledQuestions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correctAnswer;
    
    // Guardar la respuesta seleccionada
    setSelectedAnswers({
      ...selectedAnswers,
      [currentQuestionIndex]: {
        answer,
        isCorrect
      }
    });

    // Actualizar puntuación si la respuesta es correcta
    if (isCorrect) {
      setScore(score + 1);
    }

    // Desactivar el temporizador cuando se selecciona una respuesta
    setTimerActive(false);
  };

  const handleNextQuestion = () => {
    // Verificar si es la última pregunta
    if (currentQuestionIndex < shuffledQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      // Reiniciar el temporizador para la siguiente pregunta
      setTimeLeft(60);
      setTimerActive(true);
    } else {
      // Terminar el cuestionario
      setQuizFinished(true);
      setTimerActive(false);
    }
  };

  const restartQuiz = () => {
    // Reiniciar el estado del cuestionario
    setQuizStarted(false);
    setQuizFinished(false);
    setCurrentQuestionIndex(0);
    setScore(0);
    setSelectedAnswers({});
    setTimeLeft(60);
    
    // Barajar las preguntas nuevamente
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
  };

  // Si el cuestionario no ha comenzado, mostrar la pantalla de inicio
  if (!quizStarted) {
    return (
      <div className="app-container">
        <StartScreen onStart={startQuiz} />
      </div>
    );
  }

  // Si el cuestionario ha terminado, mostrar los resultados
  if (quizFinished) {
    return (
      <div className="app-container">
        <ResultsScreen 
          score={score} 
          totalQuestions={shuffledQuestions.length} 
          onRestart={restartQuiz} 
        />
      </div>
    );
  }

  // Mostrar la pregunta actual
  const currentQuestion = shuffledQuestions[currentQuestionIndex];
  const selectedAnswer = selectedAnswers[currentQuestionIndex]?.answer;

  return (
    <div className="app-container">
      <QuizCard
        question={currentQuestion.question}
        options={currentQuestion.options}
        correctAnswer={currentQuestion.correctAnswer}
        selectedAnswer={selectedAnswer}
        onAnswerSelect={handleAnswerSelect}
        currentQuestion={currentQuestionIndex + 1}
        totalQuestions={shuffledQuestions.length}
        timeLeft={timeLeft}
      />
      
      {selectedAnswer && (
        <button 
          className="next-button" 
          onClick={handleNextQuestion}
        >
          {currentQuestionIndex < shuffledQuestions.length - 1 ? 'Siguiente Pregunta' : 'Ver Resultados'}
        </button>
      )}
    </div>
  );
}

export default App;
