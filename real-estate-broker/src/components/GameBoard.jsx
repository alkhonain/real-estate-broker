import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import RiyadhMapGame from './RiyadhMapGame.jsx';
import TeamPanel from './TeamPanel.jsx';
import AuctionPanel from './AuctionPanel.jsx';
import QuestionModal from './QuestionModal.jsx';
import BlockDetailsAndCategory from './BlockDetailsAndCategory.jsx';
import { formatNumber } from '../utils/formatters.js';

function GameBoard() {
  const { state, dispatch } = useGame();
  const [showBlockDetails, setShowBlockDetails] = useState(false);
  
  
  const handleStartAuction = () => {
    dispatch({ type: 'START_AUCTION' });
  };
  
  const handleAuctionEnd = () => {
    setShowBlockDetails(true);
  };
  
  const handleCategorySelected = () => {
    setShowBlockDetails(false);
  };
  
  const handleQuestionAnswer = (isCorrect, questionId) => {
    console.log('GameBoard - handleQuestionAnswer called:', {
      isCorrect,
      questionId,
      currentBidder: state.currentAuction?.currentBidder
    });
    
    if (!state.currentAuction?.currentBidder) {
      console.error('GameBoard - No current bidder!');
      return;
    }
    
    dispatch({
      type: 'ANSWER_QUESTION',
      payload: {
        isCorrect,
        teamId: state.currentAuction.currentBidder,
        questionId
      }
    });
  };
  
  if (!state || !state.teams || !state.blocks) {
    return <div className="min-h-screen flex items-center justify-center">
      <div className="text-2xl">Loading...</div>
    </div>;
  }

  return (
    <div className="min-h-screen p-4 bg-gradient-to-br from-gray-50 via-blue-50 to-indigo-100">
      {/* Animated background elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-10 w-64 h-64 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 bg-gradient-to-br from-purple-200/20 to-transparent rounded-full blur-3xl animate-pulse delay-1000"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-br from-indigo-100/20 to-transparent rounded-full blur-3xl animate-pulse delay-500"></div>
      </div>

      {/* Header */}
      <div className="relative z-10 bg-gradient-to-r from-white/90 via-blue-50/90 to-indigo-50/90 backdrop-blur-xl rounded-2xl shadow-2xl p-3 mb-2 border border-white/50">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="p-2 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl shadow-lg animate-pulse">
              <span className="text-2xl text-white">🏢</span>
            </div>
            <div>
              <h1 className="text-2xl font-montserrat font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
                سمسار العقارات
              </h1>
              <p className="text-sm font-medium text-gray-600">
                {state.selectedMap.name}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="px-3 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg">
              <span className="text-white text-sm font-semibold flex items-center gap-1">
                <span className="text-base">🏆</span>
                <span>العقارات المتبقية: {formatNumber(state.blocks.filter(b => !b.owner && !state.blockedBlocks.includes(b.id)).length)}</span>
              </span>
            </div>
            <button
              onClick={() => dispatch({ type: 'END_GAME' })}
              className="px-3 py-1 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white text-sm font-montserrat font-medium rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-200"
            >
              <span className="flex items-center gap-2">
                <span>🏁</span>
                <span>إنهاء اللعبة</span>
              </span>
            </button>
          </div>
        </div>
      </div>
      
      <div className="relative z-10 grid grid-cols-12 gap-4">
        {/* Team Panels */}
        <div className="col-span-3 space-y-4">
          {state.teams.slice(0, Math.ceil(state.teams.length / 2)).map(team => (
            <div key={team.id} className="transform transition-all duration-300 hover:scale-[1.01]">
              <TeamPanel team={team} />
            </div>
          ))}
        </div>
        
        {/* Map View */}
        <div className="col-span-6 space-y-4">
          <div className="transform transition-all duration-300">
            <RiyadhMapGame />
          </div>
          
          {/* Auction Panel */}
          <div className="transform transition-all duration-300">
            {state.currentAuction && !state.currentQuestion ? (
              <div className="animate-fade-in">
                <AuctionPanel
                  auction={state.currentAuction}
                  teams={state.teams}
                  onAuctionEnd={handleAuctionEnd}
                />
              </div>
            ) : (
              <div className="relative bg-gradient-to-br from-white/80 via-gray-50/80 to-indigo-50/80 backdrop-blur-sm rounded-2xl shadow-2xl p-8 text-center border border-white/50 overflow-hidden">
                {/* Animated background elements */}
                <div className="absolute -top-10 -left-10 w-32 h-32 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full blur-xl animate-float"></div>
                <div className="absolute -bottom-10 -right-10 w-40 h-40 bg-gradient-to-tr from-indigo-300/20 to-transparent rounded-full blur-xl animate-float-delayed"></div>
                
                <div className="relative z-10 mb-6">
                  <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-full shadow-xl mb-4 animate-glow">
                    <span className="text-3xl text-white animate-pulse">🏛️</span>
                  </div>
                  <h3 className="text-2xl font-montserrat font-bold text-gray-800 mb-2">
                    جاهز لبدء المزاد؟
                  </h3>
                  <p className="text-gray-600">
                    اضغط على الزر أدناه لبدء مزاد عقاري جديد
                  </p>
                </div>
                <button
                  onClick={handleStartAuction}
                  className="group relative overflow-hidden px-12 py-5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl font-bold text-xl shadow-2xl transition-all duration-300 transform hover:scale-105 hover:shadow-3xl active:scale-95 animate-pulse"
                >
                  <div className="relative z-10 flex items-center justify-center gap-3">
                    <span className="text-2xl group-hover:animate-bounce">🎯</span>
                    بدء مزاد جديد
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  {/* Animated glow effect */}
                  <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-2xl opacity-0 group-hover:opacity-75 blur group-hover:animate-pulse -z-10"></div>
                </button>
              </div>
            )}
          </div>
        </div>
        
        {/* Remaining Team Panels */}
        <div className="col-span-3 space-y-4">
          {state.teams.slice(Math.ceil(state.teams.length / 2)).map(team => (
            <div key={team.id} className="transform transition-all duration-300 hover:scale-[1.01]">
              <TeamPanel team={team} />
            </div>
          ))}
        </div>
      </div>
      
      {/* Block Details Modal */}
      {showBlockDetails && state.currentAuction && !state.currentQuestion && (
        <BlockDetailsAndCategory onContinue={handleCategorySelected} />
      )}
      
      {/* Question Modal */}
      {state.currentQuestion && (
        <QuestionModal onAnswer={handleQuestionAnswer} />
      )}
    </div>
  );
}

export default GameBoard;