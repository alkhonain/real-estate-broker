import React from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import QuestionPanel from './QuestionPanel.jsx';

function QuestionModal({ onAnswer }) {
  const { state } = useGame();
  
  if (!state.currentQuestion || !state.currentAuction?.currentBidder) {
    return null;
  }
  
  const team = state.teams.find(t => t.id === state.currentAuction.currentBidder);
  
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <div className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        <QuestionPanel
          question={state.currentQuestion}
          onAnswer={onAnswer}
          team={team}
        />
      </div>
    </div>
  );
}

export default QuestionModal;