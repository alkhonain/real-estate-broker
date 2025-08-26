import React from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import RiyadhMap from './RiyadhMap.jsx';

function MapView() {
  const { state } = useGame();
  
  // If the selected map is Riyadh, use the special SVG map
  if (state.selectedMap?.id === 'riyadh') {
    return <RiyadhMap />;
  }
  
  const getTeamColor = (ownerId) => {
    if (!ownerId) return 'bg-white';
    const team = state.teams.find(t => t.id === ownerId);
    return team?.bgColor || 'bg-white';
  };
  
  const isInAuction = (blockId) => {
    return state.currentAuction?.block.id === blockId;
  };
  
  return (
    <div className="bg-map-bg rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-montserrat font-bold mb-4 text-center">
خريطة {state.selectedMap.name}
      </h2>
      
      <div className="space-y-6">
        {state.selectedMap.districts.map(district => (
          <div key={district.id} className="district-card">
            <h3 className="text-lg font-montserrat font-semibold mb-3">
              {district.name}
            </h3>
            
            <div className="grid grid-cols-5 gap-2">
              {district.blocks.map(block => {
                const blockData = state.blocks.find(b => b.id === block.id);
                const teamColor = getTeamColor(blockData?.owner);
                const inAuction = isInAuction(block.id);
                
                return (
                  <div
                    key={block.id}
                    className={`
                      relative p-3 rounded-lg border-2 transition-all duration-300
                      ${teamColor}
                      ${inAuction ? 'border-accent animate-pulse shadow-lg scale-105' : 'border-gray-300'}
                      ${!blockData?.owner && !inAuction ? 'hover:border-luxury-gold cursor-pointer' : ''}
                    `}
                  >
                    <div className="text-xs font-medium text-center">
                      {block.name}
                    </div>
                    <div className="text-xs text-center mt-1">
                      {block.pieces} قطعة
                    </div>
                    <div className="text-xs font-roboto-mono font-bold text-center text-luxury-gold">
                      {blockData?.points} نقطة
                    </div>
                    
                    {inAuction && (
                      <div className="absolute -top-2 -right-2 bg-accent text-white text-xs px-2 py-1 rounded-full">
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
      <div className="mt-6 flex justify-center gap-4 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
          <span>متوفر</span>
        </div>
        {state.teams.map(team => (
          <div key={team.id} className="flex items-center gap-2">
            <div className={`w-4 h-4 ${team.bgColor} rounded`}></div>
            <span>{team.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default MapView;