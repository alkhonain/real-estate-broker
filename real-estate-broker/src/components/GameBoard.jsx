import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import MapView from './MapView.jsx';
import TeamPanel from './TeamPanel.jsx';
import AuctionPanel from './AuctionPanel.jsx';
import QuestionPanel from './QuestionPanel.jsx';
import Timer from './Timer.jsx';

function GameBoard() {
  const { state, dispatch } = useGame();
  const [showQuestion, setShowQuestion] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  const handleStartAuction = () => {
    dispatch({ type: 'START_AUCTION' });
  };
  
  const handleQuestionAnswer = (isCorrect, questionId) => {
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        isCorrect,
        teamId: state.currentAuction.currentBidder,
        questionId
      }
    });
    setShowQuestion(false);
    setCurrentQuestion(null);
  };
  
  return (
    <div className="min-h-screen p-4">
      {/* Header */}
      <div className="bg-card-bg rounded-lg shadow-lg p-4 mb-4 flex justify-between items-center">
        <h1 className="text-3xl font-montserrat font-bold text-luxury-gold">
          سمسار العقارات - {state.selectedMap.name}
        </h1>
        <Timer />
      </div>
      
      <div className="grid grid-cols-12 gap-4">
        {/* Team Panels */}
        <div className="col-span-3 space-y-4">
          {state.teams.slice(0, Math.ceil(state.teams.length / 2)).map(team => (
            <TeamPanel key={team.id} team={team} />
          ))}
        </div>
        
        {/* Map View */}
        <div className="col-span-6">
          <MapView />
          
          {/* Auction/Question Panel */}
          <div className="mt-4">
            {showQuestion && currentQuestion ? (
              <QuestionPanel
                question={currentQuestion}
                onAnswer={handleQuestionAnswer}
                team={state.teams.find(t => t.id === state.currentAuction?.currentBidder)}
              />
            ) : state.currentAuction ? (
              <AuctionPanel
                auction={state.currentAuction}
                teams={state.teams}
                onQuestionStart={(question) => {
                  setCurrentQuestion(question);
                  setShowQuestion(true);
                }}
              />
            ) : (
              <div className="bg-card-bg rounded-lg shadow-lg p-6 text-center">
                <button
                  onClick={handleStartAuction}
                  className="btn-primary text-xl px-8 py-4"
                >
                  بدء مزاد جديد
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Remaining Team Panels */}
        <div className="col-span-3 space-y-4">
          {state.teams.slice(Math.ceil(state.teams.length / 2)).map(team => (
            <TeamPanel key={team.id} team={team} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default GameBoard;