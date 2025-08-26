import React from 'react';
import { useGame } from '../contexts/GameContext.jsx';

function TeamPanel({ team }) {
  const { state } = useGame();
  
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const teamBlocks = state.blocks.filter(b => b.owner === team.id);
  const districtCounts = teamBlocks.reduce((acc, block) => {
    acc[block.districtId] = (acc[block.districtId] || 0) + 1;
    return acc;
  }, {});
  
  return (
    <div className={`bg-card-bg rounded-lg shadow-lg p-4 border-2 border-${team.color}`}>
      <div className={`text-xl font-montserrat font-bold mb-3 text-${team.color}`}>
        {team.name}
      </div>
      
      {/* Money */}
      <div className="mb-3">
        <div className="text-sm text-gray-600">المال</div>
        <div className="text-lg font-roboto-mono font-medium">
          {formatMoney(team.money)}
        </div>
      </div>
      
      {/* Score */}
      <div className="mb-3">
        <div className="text-sm text-gray-600">النقاط</div>
        <div className="text-2xl font-roboto-mono font-bold text-luxury-gold">
          {team.score.toLocaleString()} نقطة
        </div>
      </div>
      
      {/* Properties */}
      <div className="mb-3">
        <div className="text-sm text-gray-600 mb-1">العقارات ({teamBlocks.length})</div>
        {Object.entries(districtCounts).map(([districtId, count]) => {
          const district = state.selectedMap.districts.find(d => d.id === districtId);
          const hasBonus = count >= 3;
          return (
            <div key={districtId} className="text-xs flex justify-between">
              <span>{district.name}</span>
              <span className={hasBonus ? 'font-bold text-success' : ''}>
                {count} {hasBonus && '(2x)'}
              </span>
            </div>
          );
        })}
      </div>
      
      {/* Power Cards */}
      <div>
        <div className="text-sm text-gray-600 mb-1">البطاقات الخاصة</div>
        <div className="flex gap-2">
          <div className={`text-xs px-2 py-1 rounded ${
            team.powerCards.replaceQuestion > 0 ? 'bg-blue-100' : 'bg-gray-100 opacity-50'
          }`}>
            استبدال ({team.powerCards.replaceQuestion})
          </div>
          <div className={`text-xs px-2 py-1 rounded ${
            team.powerCards.loan > 0 ? 'bg-green-100' : 'bg-gray-100 opacity-50'
          }`}>
            قرض ({team.powerCards.loan})
          </div>
          <div className={`text-xs px-2 py-1 rounded ${
            team.powerCards.deleteOption > 0 ? 'bg-red-100' : 'bg-gray-100 opacity-50'
          }`}>
            حذف ({team.powerCards.deleteOption})
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamPanel;