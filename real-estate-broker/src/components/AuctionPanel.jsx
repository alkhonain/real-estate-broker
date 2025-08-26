import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import CategorySelector from './CategorySelector.jsx';

function AuctionPanel({ auction, teams, onQuestionStart }) {
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
    if (state.currentQuestion) {
      onQuestionStart(state.currentQuestion);
    }
  };
  
  const canBid = (team) => {
    return team.money >= bidAmount;
  };
  
  if (showCategorySelection) {
    return <CategorySelector onCategorySelected={handleCategorySelected} />;
  }
  
  return (
    <div className="bg-card-bg rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-montserrat font-bold mb-4 text-center">
        المزاد العقاري
      </h3>
      
      {/* Property Details */}
      <div className="bg-premium-bg rounded-lg p-4 mb-4">
        <div className="text-lg font-montserrat font-semibold">
          {auction.block.name}
        </div>
        <div className="text-sm text-gray-600">
          الحي: {auction.block.districtName}
        </div>
        <div className="flex justify-between mt-2">
          <span>القطع: {auction.block.pieces}</span>
          <span className="font-bold text-luxury-gold">
            {auction.block.points} نقطة
          </span>
        </div>
      </div>
      
      {/* Current Bid */}
      <div className="text-center mb-4">
        <div className="text-sm text-gray-600">المزايدة الحالية</div>
        <div className="text-3xl font-roboto-mono font-bold text-property-blue">
          {auction.currentBid > 0 ? formatMoney(auction.currentBid) : 'لا توجد مزايدات'}
        </div>
        {auction.currentBidder && (
          <div className="text-sm mt-1">
            بواسطة {teams.find(t => t.id === auction.currentBidder)?.name}
          </div>
        )}
      </div>
      
      {/* Bidding Interface */}
      <div className="space-y-4">
        {/* Team Selection */}
        <div>
          <label className="block text-sm font-medium mb-2">اختر الفريق</label>
          <div className="grid grid-cols-2 gap-2">
            {teams.map(team => (
              <button
                key={team.id}
                onClick={() => setSelectedTeam(team.id)}
                disabled={!canBid(team)}
                className={`p-3 rounded-lg border-2 transition-all ${
                  selectedTeam === team.id
                    ? `border-${team.color} bg-opacity-20 ${team.bgColor}`
                    : 'border-gray-300'
                } ${!canBid(team) ? 'opacity-50 cursor-not-allowed' : 'hover:border-luxury-gold'}`}
              >
                <div className="font-medium">{team.name}</div>
                <div className="text-xs">{formatMoney(team.money)}</div>
              </button>
            ))}
          </div>
        </div>
        
        {/* Bid Amount */}
        <div>
          <label className="block text-sm font-medium mb-2">قيمة المزايدة</label>
          <div className="flex gap-2">
            <button
              onClick={() => setBidAmount(Math.max(auction.currentBid + 50000, bidAmount - 50000))}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              -50 ألف
            </button>
            <div className="flex-1 text-center py-2 px-4 bg-gray-100 rounded-lg font-roboto-mono font-medium">
              {formatMoney(bidAmount)}
            </div>
            <button
              onClick={() => setBidAmount(bidAmount + 50000)}
              className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300"
            >
              +50 ألف
            </button>
          </div>
        </div>
        
        {/* Action Buttons */}
        <div className="flex gap-2">
          <button
            onClick={handlePlaceBid}
            disabled={!selectedTeam || bidAmount <= auction.currentBid}
            className="flex-1 btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            تقديم المزايدة
          </button>
          <button
            onClick={handleEndAuction}
            disabled={!auction.currentBidder}
            className="flex-1 btn-secondary disabled:opacity-50 disabled:cursor-not-allowed"
          >
            إنهاء المزاد وطرح السؤال
          </button>
        </div>
      </div>
    </div>
  );
}

export default AuctionPanel;