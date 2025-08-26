import React from 'react';
import { useGame } from '../contexts/GameContext.jsx';

function Timer() {
  const { state } = useGame();
  
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };
  
  const isLowTime = state.gameTimer < 300; // Less than 5 minutes
  
  return (
    <div className={`text-3xl font-roboto-mono font-bold ${
      isLowTime ? 'text-error animate-pulse' : 'text-text-dark'
    }`}>
      {formatTime(state.gameTimer)}
    </div>
  );
}

export default Timer;