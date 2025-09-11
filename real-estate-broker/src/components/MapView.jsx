import React from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import { formatNumber } from '../utils/formatters.js';

function MapView() {
  const { state } = useGame();
  
  const getTeamColor = (ownerId) => {
    if (!ownerId) return 'bg-white';
    const team = state.teams.find(t => t.id === ownerId);
    return team?.bgColor || 'bg-white';
  };
  
  const getTeamBorderColor = (ownerId) => {
    if (!ownerId) return 'border-gray-300';
    const team = state.teams.find(t => t.id === ownerId);
    return `border-${team?.color || 'gray-300'}`;
  };
  
  const isInAuction = (blockId) => {
    return state.currentAuction?.block.id === blockId;
  };
  
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-amber-50 via-yellow-50 to-orange-50 rounded-2xl shadow-2xl p-6 border border-amber-200/50">
      {/* Animated decorations */}
      <div className="absolute -top-3 -left-3 w-16 h-16 bg-gradient-to-br from-yellow-300/30 to-transparent rounded-full blur-xl animate-float"></div>
      <div className="absolute -bottom-3 -right-3 w-20 h-20 bg-gradient-to-tr from-orange-300/30 to-transparent rounded-full blur-xl animate-float-delayed"></div>
      
      <h2 className="relative z-10 text-3xl font-montserrat font-bold mb-6 text-center bg-gradient-to-r from-amber-600 to-orange-600 bg-clip-text text-transparent drop-shadow-sm">
        خريطة {state.selectedMap.name}
      </h2>
      
      <div className="relative z-10 space-y-6">
        {state.selectedMap.districts.map(district => (
          <div key={district.id} className="relative bg-white/90 backdrop-blur-sm rounded-xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 border border-amber-100 hover:scale-[1.01]">
            <div className="absolute -top-2 -left-2 w-8 h-8 bg-gradient-to-br from-yellow-400 to-amber-500 rounded-full shadow-md flex items-center justify-center">
              <span className="text-white text-xs font-bold">{district.blocks.length}</span>
            </div>
            <h3 className="text-xl font-montserrat font-bold mb-4 text-gray-700 flex items-center gap-2">
              <span className="text-2xl animate-pulse">🏘️</span>
              {district.name}
            </h3>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {district.blocks.map(block => {
                const blockData = state.blocks.find(b => b.id === block.id);
                const isBlocked = state.blockedBlocks.includes(block.id);
                const teamColor = isBlocked ? 'bg-gray-200' : getTeamColor(blockData?.owner);
                const borderColor = isBlocked ? 'border-red-400' : getTeamBorderColor(blockData?.owner);
                const inAuction = isInAuction(block.id);
                const ownerTeam = state.teams.find(t => t.id === blockData?.owner);
                
                return (
                  <div
                    key={block.id}
                    className={`
                      relative p-6 rounded-xl border-3 transition-all duration-300 transform
                      ${teamColor} ${borderColor}
                      ${inAuction ? 'animate-pulse shadow-2xl scale-110 border-accent ring-4 ring-accent/30' : ''}
                      ${!blockData?.owner && !inAuction && !isBlocked ? 'hover:border-luxury-gold hover:shadow-xl hover:scale-105 cursor-pointer hover:-translate-y-2' : ''}
                      ${blockData?.owner ? 'shadow-lg hover:shadow-xl' : ''}
                      ${isBlocked ? 'opacity-60 cursor-not-allowed' : ''}
                    `}
                  >
                    {/* Owner Icon or Blocked Icon */}
                    {isBlocked ? (
                      <div className="absolute -top-4 -right-4 text-3xl bg-red-500 rounded-full p-2 shadow-lg">
                        <span className="text-white text-lg">🚫</span>
                      </div>
                    ) : ownerTeam && (
                      <div className="absolute -top-4 -right-4 text-3xl bg-white rounded-full p-2 shadow-lg border-2 border-gray-200">
                        {ownerTeam.icon}
                      </div>
                    )}
                    
                    {/* Block Name */}
                    <div className="text-lg font-montserrat font-semibold text-center mb-3 text-gray-800">
                      {block.name}
                    </div>
                    
                    {/* Block Details */}
                    <div className="space-y-2 bg-white/50 rounded-lg p-3">
                      <div className="flex justify-between items-center text-base">
                        <span className="text-gray-600 font-medium">القطع:</span>
                        <span className="font-bold text-gray-800 text-lg">{formatNumber(block.pieces)}</span>
                      </div>
                      
                      <div className="flex justify-between items-center text-base mt-2">
                        <span className="text-gray-600 font-medium">النقاط:</span>
                        <span className="font-bold text-luxury-gold text-xl">{formatNumber(blockData?.points || 0)}</span>
                      </div>
                    </div>
                    
                    {/* Auction Badge */}
                    {inAuction && (
                      <div className="absolute -top-2 left-1/2 transform -translate-x-1/2 bg-accent text-white text-xs px-3 py-1 rounded-full shadow-md">
                        مزاد
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
      
      {/* Map Legend */}
      <div className="relative z-10 mt-6 bg-white/90 backdrop-blur-sm rounded-xl p-4 shadow-lg border border-amber-100">
        <div className="flex justify-center gap-6 text-sm flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-white border-2 border-gray-300 rounded"></div>
            <span className="text-gray-700">متوفر</span>
          </div>
          {state.teams.map(team => (
            <div key={team.id} className="flex items-center gap-2">
              <div className={`w-6 h-6 ${team.bgColor} rounded border-2 border-gray-700`}></div>
              <span className="text-gray-700">{team.icon} {team.name}</span>
            </div>
          ))}
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-accent rounded animate-pulse shadow-md"></div>
            <span className="text-gray-700">قيد المزاد</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default MapView;