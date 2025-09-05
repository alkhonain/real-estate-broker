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
  
  // Check if team has property in all districts
  const districtsWithProperty = Object.keys(districtCounts).length;
  const hasPropertyInAllDistricts = districtsWithProperty === state.selectedMap.districts.length;
  
  return (
    <div className={`relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-2xl shadow-2xl p-6 border-2 border-${team.color} backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.02] hover:shadow-3xl`}>
      {/* Gradient overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent pointer-events-none"></div>
      
      {/* Header with team info */}
      <div className={`relative z-10 text-xl font-montserrat font-bold mb-6 text-${team.color} flex items-center gap-3 p-3 bg-white/60 rounded-xl backdrop-blur-sm border border-white/50 shadow-md`}>
        {team.icon && <span className="text-3xl drop-shadow-md">{team.icon}</span>}
        <span className="drop-shadow-sm">{team.name}</span>
      </div>
      
      {/* Money Section */}
      <div className="relative z-10 mb-6 p-4 bg-gradient-to-r from-green-50 to-emerald-50 rounded-xl shadow-inner border border-green-100">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">💰</span>
          <div className="text-sm font-medium text-green-700">المال</div>
        </div>
        <div className="text-xl font-roboto-mono font-bold text-green-800 drop-shadow-sm">
          {formatMoney(team.money)}
        </div>
      </div>
      
      {/* Score Section */}
      <div className="relative z-10 mb-6 p-4 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-xl shadow-inner border border-yellow-200">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-lg">🏆</span>
          <div className="text-sm font-medium text-amber-700">النقاط</div>
        </div>
        <div className="text-2xl font-roboto-mono font-bold text-luxury-gold drop-shadow-sm">
          {team.score.toLocaleString()} نقطة
        </div>
        {hasPropertyInAllDistricts && (
          <div className="mt-2 text-xs font-medium text-green-700 bg-green-100 px-2 py-1 rounded-full inline-flex items-center gap-1">
            <span>🌟</span>
            <span>مكافأة 10% لامتلاك عقار في جميع الأحياء</span>
          </div>
        )}
      </div>
      
      {/* Properties Section */}
      <div className="relative z-10 mb-6 p-4 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-xl shadow-inner border border-blue-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">🏠</span>
          <div className="text-sm font-medium text-blue-700">العقارات ({teamBlocks.length})</div>
        </div>
        <div className="space-y-2">
          {Object.entries(districtCounts).map(([districtId, count]) => {
            const district = state.selectedMap.districts.find(d => d.id === districtId);
            const totalBlocksInDistrict = district.blocks.length;
            const ownsEntireDistrict = count === totalBlocksInDistrict;
            return (
              <div key={districtId} className="flex justify-between items-center p-2 bg-white/60 rounded-lg backdrop-blur-sm">
                <span className="text-sm font-medium text-gray-700">{district.name}</span>
                <div className="flex items-center gap-2">
                  <span className={`text-sm font-bold px-2 py-1 rounded-full ${
                    ownsEntireDistrict 
                      ? 'bg-gradient-to-r from-green-400 to-emerald-500 text-white shadow-md' 
                      : 'bg-gray-100 text-gray-600'
                  }`}>
                    {count}/{totalBlocksInDistrict}
                  </span>
                  {ownsEntireDistrict && (
                    <span className="text-xs font-bold px-2 py-1 bg-gradient-to-r from-yellow-400 to-amber-500 text-white rounded-full shadow-md">
                      2x
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
      
      {/* Power Cards Section */}
      <div className="relative z-10 p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl shadow-inner border border-purple-100">
        <div className="flex items-center gap-2 mb-3">
          <span className="text-lg">⚡</span>
          <div className="text-sm font-medium text-purple-700">البطاقات الخاصة</div>
        </div>
        <div className="flex gap-2 flex-wrap">
          <div className={`text-sm px-3 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 transform shadow-md ${
            team.powerCards.showOptions > 0 
              ? 'bg-gradient-to-r from-blue-400 to-blue-500 text-white hover:scale-105 shadow-lg' 
              : 'bg-gray-100 text-gray-400 opacity-50'
          }`}>
            <span className="text-lg">🎯</span>
            <span className="font-medium">خيارات ({team.powerCards.showOptions})</span>
          </div>
          <div className={`text-sm px-3 py-2 rounded-xl flex items-center gap-2 transition-all duration-300 transform shadow-md ${
            team.powerCards.showHint > 0 
              ? 'bg-gradient-to-r from-yellow-400 to-amber-500 text-white hover:scale-105 shadow-lg' 
              : 'bg-gray-100 text-gray-400 opacity-50'
          }`}>
            <span className="text-lg">💡</span>
            <span className="font-medium">تلميح ({team.powerCards.showHint})</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TeamPanel;