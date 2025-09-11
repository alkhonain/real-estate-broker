import React from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import { formatMoney, formatNumber } from '../utils/formatters.js';

function TeamPanel({ team }) {
  const gameContext = useGame();
  
  // Comprehensive error checking
  if (!gameContext) {
    console.error('TeamPanel - No game context');
    return <div>No game context</div>;
  }
  
  const { state } = gameContext;
  
  if (!state) {
    console.error('TeamPanel - No state in context');
    return <div>No state</div>;
  }
  
  if (!state.blocks) {
    console.error('TeamPanel - No blocks in state');
    return <div>No blocks</div>;
  }
  
  if (!Array.isArray(state.blocks)) {
    console.error('TeamPanel - blocks is not an array:', state.blocks);
    return <div>Invalid blocks</div>;
  }
  
  if (!team) {
    console.error('TeamPanel - No team prop provided');
    return <div>No team</div>;
  }
  
  
  try {
    const teamBlocks = state.blocks.filter(b => b.owner === team.id);
    const districtCounts = teamBlocks.reduce((acc, block) => {
      acc[block.districtId] = (acc[block.districtId] || 0) + 1;
      return acc;
    }, {});
    
    // Check if team has property in all areas
    const areasWithProperty = new Set(teamBlocks.map(b => b.areaId).filter(Boolean)).size;
    const totalAreas = new Set(state.blocks.map(b => b.areaId).filter(Boolean)).size;
    const hasPropertyInAllAreas = areasWithProperty === totalAreas && totalAreas > 0;
    
    return (
      <div className={`relative overflow-hidden bg-gradient-to-br from-white via-gray-50 to-gray-100 rounded-lg shadow-lg p-3 border-2 border-${team.color} backdrop-blur-sm transform transition-all duration-300 hover:scale-[1.01] hover:shadow-xl`}>
        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent pointer-events-none"></div>
        
        {/* Header with team info */}
        <div className={`relative z-10 text-lg font-montserrat font-bold mb-3 text-${team.color} flex items-center gap-2 p-2 bg-white/60 rounded-lg backdrop-blur-sm border border-white/50 shadow-sm`}>
          {team.icon && <span className="text-2xl drop-shadow-md">{team.icon}</span>}
          <span className="drop-shadow-sm">{team.name}</span>
        </div>
        
        {/* Money Section */}
        <div className="relative z-10 mb-3 p-2 bg-gradient-to-r from-green-50 to-emerald-50 rounded-lg shadow-inner border border-green-100">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-lg">💰</span>
            <span className="text-xs font-medium text-gray-700">الرصيد المالي</span>
          </div>
          <div className="text-xl font-roboto-mono font-bold text-green-700 drop-shadow-sm">
            {formatMoney(team.money)}
          </div>
        </div>
        
        {/* Score Section with animated glow */}
        <div className="relative z-10 mb-3 p-2 bg-gradient-to-r from-yellow-50 to-amber-50 rounded-lg shadow-inner border border-yellow-200 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-yellow-100/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative z-10 flex items-center gap-1 mb-1">
            <span className="text-lg">⭐</span>
            <span className="text-xs font-medium text-gray-700">النقاط</span>
          </div>
          <div className="relative z-10 text-xl font-roboto-mono font-bold text-yellow-700 drop-shadow-sm">
            {formatNumber(team.score)} نقطة
          </div>
          {hasPropertyInAllAreas && (
            <div className="relative z-10 mt-1 text-[10px] bg-yellow-600 text-white px-1 py-0.5 rounded-full inline-flex items-center gap-0.5 animate-pulse">
              <span>🏆</span>
              <span>مكافأة {formatNumber(10)}%</span>
            </div>
          )}
        </div>
        
        {/* Properties Section */}
        <div className="relative z-10 mb-3 p-2 bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg shadow-inner border border-blue-100">
          <div className="flex items-center gap-1 mb-1">
            <span className="text-lg">🏢</span>
            <span className="text-xs font-medium text-gray-700">الممتلكات</span>
          </div>
          <div className="grid grid-cols-2 gap-1 text-xs">
            <div className="bg-white/70 backdrop-blur-sm rounded p-1 text-center shadow-sm">
              <div className="font-bold text-blue-600 text-base">{formatNumber(teamBlocks.length)}</div>
              <div className="text-gray-600 text-[10px]">عقار مملوك</div>
            </div>
            <div className="bg-white/70 backdrop-blur-sm rounded p-1 text-center shadow-sm">
              <div className="font-bold text-indigo-600 text-base">{formatNumber(Object.keys(districtCounts).length)}</div>
              <div className="text-gray-600 text-[10px]">حي مختلف</div>
            </div>
          </div>
        </div>
        
        {/* Power Cards with animated hover effects */}
        <div className="relative z-10">
          <div className="text-xs font-medium text-gray-600 mb-1 flex items-center gap-0.5">
            <span className="text-base">✨</span>
            <span>البطاقات الخاصة</span>
          </div>
          <div className={`group p-2 rounded transition-all duration-300 ${
            team.powerCards.showOptions > 0 
              ? 'bg-gradient-to-r from-blue-100 to-blue-50 border border-blue-300 hover:from-blue-200 hover:to-blue-100 cursor-pointer transform hover:scale-105 hover:shadow-lg' 
              : 'bg-gray-100 border border-gray-300 opacity-50'
          }`}>
            <div className="flex items-center gap-1">
              <span className="text-base group-hover:rotate-12 transition-transform">🎯</span>
              <span className="font-medium text-xs">خيارات متعددة</span>
              <span className="text-lg font-bold text-blue-700 mr-1">{formatNumber(team.powerCards.showOptions)}</span>
            </div>
          </div>
        </div>
        
        {/* Animated background decoration */}
        <div className="absolute -bottom-4 -right-4 w-24 h-24 bg-gradient-to-br from-blue-200/30 to-transparent rounded-full blur-xl animate-float"></div>
        <div className="absolute -top-4 -left-4 w-20 h-20 bg-gradient-to-tr from-yellow-200/30 to-transparent rounded-full blur-xl animate-float-delayed"></div>
      </div>
    );
  } catch (error) {
    console.error('TeamPanel - Error rendering:', error);
    return (
      <div className="p-4 bg-red-100 rounded text-red-700">
        Error displaying team panel
      </div>
    );
  }
}

export default TeamPanel;