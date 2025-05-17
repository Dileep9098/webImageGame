import React, { createContext, useContext, useState } from 'react';

const GameContext = createContext();

export const GameProvider = ({ children }) => {
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState([]);

  const resetGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setAnswers([]);
  };

  return (
    <GameContext.Provider
      value={{
        score,
        setScore,
        currentIndex,
        setCurrentIndex,
        answers,
        setAnswers,
        resetGame,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => useContext(GameContext);
