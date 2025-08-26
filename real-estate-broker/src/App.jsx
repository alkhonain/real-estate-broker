import React from 'react';
import { GameProvider, useGame } from './contexts/GameContext.jsx';
import GameSetup from './components/GameSetup.jsx';
import GameBoard from './components/GameBoard.jsx';
import GameEnd from './components/GameEnd.jsx';

function GameContent() {
  const { state } = useGame();
  
  switch (state.gamePhase) {
    case 'setup':
      return <GameSetup />;
    case 'playing':
      return <GameBoard />;
    case 'ended':
      return <GameEnd />;
    default:
      return <GameSetup />;
  }
}

function App() {
  return (
    <GameProvider>
      <div className="min-h-screen bg-game-bg">
        <GameContent />
      </div>
    </GameProvider>
  );
}

export default App;