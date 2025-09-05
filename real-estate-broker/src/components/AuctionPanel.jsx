import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import CategorySelector from './CategorySelector.jsx';

function AuctionPanel({ auction, teams }) {
  const { dispatch, state } = useGame();
  const [selectedTeam, setSelectedTeam] = useState(null);
  const [bidAmount, setBidAmount] = useState(auction.currentBid + 50000);
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const handlePlaceBid = () => {
    if (!selectedTeam) return;
    
    dispatch({
      type: 'PLACE_BID',
      payload: {
        teamId: selectedTeam,
        amount: bidAmount
      }
    });
    
    // Reset for next bid
    setSelectedTeam(null);
    setBidAmount(bidAmount + 50000);
  };
  
  const handleEndAuction = () => {
    if (!auction.currentBidder) return;
    setShowCategorySelection(true);
  };
  
  const handleCategorySelected = () => {
    setShowCategorySelection(false);
  };
  
  const canBid = (team) => {
    return team.money >= bidAmount;
  };
  
  if (showCategorySelection) {
    return <CategorySelector onCategorySelected={handleCategorySelected} />;
  }
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-2xl shadow-2xl p-8 backdrop-blur-sm border border-blue-200/50">
      {/* Animated background pattern */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-100/30 via-transparent to-indigo-100/30 pointer-events-none"></div>
      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-blue-400/20 to-transparent rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-gradient-to-tr from-indigo-400/20 to-transparent rounded-full blur-xl animate-pulse delay-700"></div>
      <div className="absolute -top-4 -right-4 w-20 h-20 bg-yellow-300/30 rounded-full blur-2xl animate-bounce delay-300"></div>
      <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-purple-300/30 rounded-full blur-2xl animate-bounce delay-500"></div>
      
      <div className="relative z-10">
        <h3 className="text-3xl font-montserrat font-bold mb-6 text-center bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent drop-shadow-sm">
          🏛️ المزاد العقاري
        </h3>
        
        {/* Property Details */}
        <div className="bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm rounded-2xl p-6 mb-6 shadow-xl border border-white/50 transform transition-all duration-300 hover:scale-[1.02]">
          <div className="flex items-center gap-3 mb-3">
            <span className="text-2xl">🏢</span>
            <div className="text-xl font-montserrat font-bold text-gray-800">
              {auction.block.name}
            </div>
          </div>
          <div className="flex items-center gap-2 mb-4">
            <span className="text-lg">📍</span>
            <div className="text-sm font-medium text-gray-600">
              الحي: {auction.block.districtName}
            </div>
          </div>
          <div className="flex justify-between items-center p-3 bg-white/70 rounded-xl backdrop-blur-sm">
            <div className="flex items-center gap-2">
              <span className="text-lg">🧱</span>
              <span className="font-medium">القطع: {auction.block.pieces}</span>
            </div>
            <div className="flex items-center gap-2 px-3 py-2 bg-gradient-to-r from-yellow-400 to-amber-500 rounded-full shadow-lg">
              <span className="text-lg">⭐</span>
              <span className="font-bold text-white">
                {auction.block.points} نقطة
              </span>
            </div>
          </div>
        </div>
        
        {/* Current Bid */}
        <div className="text-center mb-8 p-6 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-2xl shadow-lg border border-green-200/50 transform transition-all duration-300">
          <div className="flex items-center justify-center gap-2 mb-3">
            <span className="text-xl">💸</span>
            <div className="text-sm font-medium text-green-700">المزايدة الحالية</div>
          </div>
          <div className="text-4xl font-roboto-mono font-bold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent drop-shadow-sm mb-2 animate-pulse">
            {auction.currentBid > 0 ? formatMoney(auction.currentBid) : 'لا توجد مزايدات'}
          </div>
          {auction.currentBidder && (
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/70 rounded-full text-sm font-medium text-gray-700 shadow-md">
              <span>👤</span>
              بواسطة {teams.find(t => t.id === auction.currentBidder)?.name}
            </div>
          )}
        </div>
        
        {/* Bidding Interface */}
        <div className="space-y-6">
          {/* Team Selection */}
          <div className="p-6 bg-gradient-to-r from-white/70 to-gray-50/70 backdrop-blur-sm rounded-2xl shadow-lg border border-gray-200/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">👥</span>
              <label className="text-lg font-medium text-gray-700">اختر الفريق</label>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {teams.map(team => (
                <button
                  key={team.id}
                  onClick={() => setSelectedTeam(team.id)}
                  disabled={!canBid(team)}
                  className={`group relative overflow-hidden p-4 rounded-xl border-2 transition-all duration-300 transform ${
                    selectedTeam === team.id
                      ? `border-${team.color} bg-gradient-to-br from-white to-${team.color}/10 scale-105 shadow-lg`
                      : 'border-gray-200 bg-white/80 hover:border-gray-300'
                  } ${!canBid(team) ? 'opacity-50 cursor-not-allowed' : 'hover:scale-102 hover:shadow-md'}`}
                >
                  <div className="relative z-10">
                    <div className="flex items-center gap-2 mb-2">
                      {team.icon && <span className="text-lg">{team.icon}</span>}
                      <div className="font-semibold text-gray-800">{team.name}</div>
                    </div>
                    <div className="text-sm font-roboto-mono text-gray-600 bg-gray-100/70 px-2 py-1 rounded-lg">
                      {formatMoney(team.money)}
                    </div>
                  </div>
                  {selectedTeam === team.id && (
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-blue-100/30 to-blue-200/20 pointer-events-none"></div>
                  )}
                </button>
              ))}
            </div>
          </div>
          
          {/* Bid Amount */}
          <div className="p-6 bg-gradient-to-r from-white/70 to-purple-50/70 backdrop-blur-sm rounded-2xl shadow-lg border border-purple-200/50">
            <div className="flex items-center gap-2 mb-4">
              <span className="text-xl">💰</span>
              <label className="text-lg font-medium text-gray-700">قيمة المزايدة</label>
            </div>
            <div className="flex gap-3 items-center">
              <button
                onClick={() => setBidAmount(Math.max(auction.currentBid + 50000, bidAmount - 50000))}
                className="group px-6 py-3 bg-gradient-to-r from-red-400 to-red-500 hover:from-red-500 hover:to-red-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg group-hover:animate-bounce">➖</span>
                  50 ألف
                </span>
              </button>
              <div className="flex-1 text-center py-4 px-6 bg-gradient-to-r from-gray-50 to-gray-100 rounded-xl font-roboto-mono font-bold text-xl text-gray-800 shadow-inner border-2 border-gray-200 animate-pulse">
                {formatMoney(bidAmount)}
              </div>
              <button
                onClick={() => setBidAmount(bidAmount + 50000)}
                className="group px-6 py-3 bg-gradient-to-r from-green-400 to-green-500 hover:from-green-500 hover:to-green-600 text-white rounded-xl font-semibold shadow-lg transition-all duration-300 transform hover:scale-105 hover:shadow-xl active:scale-95"
              >
                <span className="flex items-center gap-2">
                  <span className="text-lg group-hover:animate-bounce">➕</span>
                  50 ألف
                </span>
              </button>
            </div>
          </div>
          
          {/* Action Buttons */}
          <div className="flex gap-4">
            <button
              onClick={handlePlaceBid}
              disabled={!selectedTeam || bidAmount <= auction.currentBid}
              className="group relative overflow-hidden flex-1 px-8 py-4 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 active:scale-95"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-xl group-hover:animate-pulse">🔨</span>
                تقديم المزايدة
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
            <button
              onClick={handleEndAuction}
              disabled={!auction.currentBidder}
              className="group relative overflow-hidden flex-1 px-8 py-4 bg-gradient-to-r from-orange-500 to-red-600 hover:from-orange-600 hover:to-red-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-2xl font-bold text-lg shadow-xl transition-all duration-300 transform hover:scale-105 hover:shadow-2xl disabled:opacity-50 disabled:cursor-not-allowed disabled:scale-100 active:scale-95"
            >
              <div className="relative z-10 flex items-center justify-center gap-3">
                <span className="text-xl group-hover:animate-spin">⚡</span>
                إنهاء المزاد وطرح السؤال
              </div>
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AuctionPanel;