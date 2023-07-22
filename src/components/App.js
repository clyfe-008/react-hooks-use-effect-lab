import React, { useState, useEffect, useCallback } from "react";
import Question from "./Question";
import Timer from "./Timer"; // New Timer component
import quiz from "../data/quiz";

function App() {
  const [currentQuestionId, setCurrentQuestionId] = useState(1);
  const [score, setScore] = useState(0);
  const currentQuestion = quiz.find((q) => q.id === currentQuestionId);
  const [timeRemaining, setTimeRemaining] = useState(10);

  const handleQuestionAnswered = useCallback(
    (correct) => {
      if (correct) {
        setScore((score) => score + 1);
      }
      setCurrentQuestionId((currentQuestionId) => currentQuestionId + 1);
      setTimeRemaining(10); // Reset timeRemaining after each question
    },
    []
  );

  useEffect(() => {
    if (timeRemaining === 0 && currentQuestionId !== null) {
      setCurrentQuestionId(null);
    }

    if (currentQuestionId !== null) {
      const timerId = setTimeout(() => {
        setTimeRemaining((prevTime) => prevTime - 1);
      }, 1000);

      return () => {
        clearTimeout(timerId);
      };
    }
  }, [timeRemaining, currentQuestionId]);

  return (
    <div>
      <main>
        <section>
          {currentQuestionId !== null ? (
            <>
              <Question question={currentQuestion} onAnswered={handleQuestionAnswered} />
              <Timer timeRemaining={timeRemaining} /> {/* Display the timer */}
            </>
          ) : (
            <>
              <h1>Game Over</h1>
              <h2>Total Correct: {score}</h2>
            </>
          )}
        </section>
      </main>
    </div>
  );
}

export default App;
