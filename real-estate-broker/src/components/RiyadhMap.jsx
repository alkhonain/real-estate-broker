import React from 'react';
import { useGame } from '../contexts/GameContext.jsx';

function RiyadhMap() {
  const { state } = useGame();
  
  const getBlockColor = (districtId, blockIndex) => {
    const block = state.blocks.find(b => 
      b.districtId === districtId && 
      b.id === state.selectedMap.districts.find(d => d.id === districtId)?.blocks[blockIndex]?.id
    );
    
    if (!block) return '#FFFFFF';
    if (state.currentAuction?.block.id === block.id) return '#FF5722';
    if (!block.owner) return '#F5EEE6';
    
    const team = state.teams.find(t => t.id === block.owner);
    const colorMap = {
      'property-blue': '#2389DA',
      'property-red': '#E44D2E',
      'estate-green': '#4CAF50',
      'realtor-purple': '#9C27B0'
    };
    
    return colorMap[team?.color] || '#FFFFFF';
  };
  
  const isInAuction = (districtId, blockIndex) => {
    const block = state.blocks.find(b => 
      b.districtId === districtId && 
      b.id === state.selectedMap.districts.find(d => d.id === districtId)?.blocks[blockIndex]?.id
    );
    
    return state.currentAuction?.block.id === block?.id;
  };
  
  return (
    <div className="bg-map-bg rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-montserrat font-bold mb-4 text-center">
        خريطة الرياض
      </h2>
      
      <div className="relative">
        <svg viewBox="0 0 800 600" className="w-full h-full">
          {/* Background */}
          <rect width="800" height="600" fill="#F5EEE6" />
          
          {/* North (العليا) */}
          <g id="olaya">
            <text x="400" y="80" textAnchor="middle" className="fill-text-dark font-montserrat font-bold text-lg">العليا</text>
            <rect x="280" y="100" width="60" height="60" fill={getBlockColor('olaya', 0)} stroke="#333" strokeWidth="2" 
                  className={isInAuction('olaya', 0) ? 'animate-pulse' : ''} rx="5" />
            <rect x="350" y="100" width="60" height="60" fill={getBlockColor('olaya', 1)} stroke="#333" strokeWidth="2"
                  className={isInAuction('olaya', 1) ? 'animate-pulse' : ''} rx="5" />
            <rect x="420" y="100" width="60" height="60" fill={getBlockColor('olaya', 2)} stroke="#333" strokeWidth="2"
                  className={isInAuction('olaya', 2) ? 'animate-pulse' : ''} rx="5" />
            <rect x="315" y="170" width="60" height="60" fill={getBlockColor('olaya', 3)} stroke="#333" strokeWidth="2"
                  className={isInAuction('olaya', 3) ? 'animate-pulse' : ''} rx="5" />
            <rect x="385" y="170" width="60" height="60" fill={getBlockColor('olaya', 4)} stroke="#333" strokeWidth="2"
                  className={isInAuction('olaya', 4) ? 'animate-pulse' : ''} rx="5" />
          </g>
          
          {/* East (الملز) */}
          <g id="malaz">
            <text x="600" y="250" textAnchor="middle" className="fill-text-dark font-montserrat font-bold text-lg">الملز</text>
            <rect x="550" y="270" width="50" height="50" fill={getBlockColor('malaz', 0)} stroke="#333" strokeWidth="2"
                  className={isInAuction('malaz', 0) ? 'animate-pulse' : ''} rx="5" />
            <rect x="610" y="270" width="50" height="50" fill={getBlockColor('malaz', 1)} stroke="#333" strokeWidth="2"
                  className={isInAuction('malaz', 1) ? 'animate-pulse' : ''} rx="5" />
            <rect x="550" y="330" width="50" height="50" fill={getBlockColor('malaz', 2)} stroke="#333" strokeWidth="2"
                  className={isInAuction('malaz', 2) ? 'animate-pulse' : ''} rx="5" />
            <rect x="610" y="330" width="50" height="50" fill={getBlockColor('malaz', 3)} stroke="#333" strokeWidth="2"
                  className={isInAuction('malaz', 3) ? 'animate-pulse' : ''} rx="5" />
            <rect x="580" y="390" width="50" height="50" fill={getBlockColor('malaz', 4)} stroke="#333" strokeWidth="2"
                  className={isInAuction('malaz', 4) ? 'animate-pulse' : ''} rx="5" />
          </g>
          
          {/* West (الدرعية) */}
          <g id="diriyah">
            <text x="150" y="250" textAnchor="middle" className="fill-text-dark font-montserrat font-bold text-lg">الدرعية</text>
            <rect x="100" y="270" width="55" height="55" fill={getBlockColor('diriyah', 0)} stroke="#333" strokeWidth="2"
                  className={isInAuction('diriyah', 0) ? 'animate-pulse' : ''} rx="5" />
            <rect x="165" y="270" width="55" height="55" fill={getBlockColor('diriyah', 1)} stroke="#333" strokeWidth="2"
                  className={isInAuction('diriyah', 1) ? 'animate-pulse' : ''} rx="5" />
            <rect x="100" y="335" width="55" height="55" fill={getBlockColor('diriyah', 2)} stroke="#333" strokeWidth="2"
                  className={isInAuction('diriyah', 2) ? 'animate-pulse' : ''} rx="5" />
            <rect x="165" y="335" width="55" height="55" fill={getBlockColor('diriyah', 3)} stroke="#333" strokeWidth="2"
                  className={isInAuction('diriyah', 3) ? 'animate-pulse' : ''} rx="5" />
            <rect x="132" y="400" width="55" height="55" fill={getBlockColor('diriyah', 4)} stroke="#333" strokeWidth="2"
                  className={isInAuction('diriyah', 4) ? 'animate-pulse' : ''} rx="5" />
          </g>
          
          {/* Center (النخيل) */}
          <g id="nakheel">
            <text x="400" y="300" textAnchor="middle" className="fill-text-dark font-montserrat font-bold text-lg">النخيل</text>
            <rect x="340" y="320" width="50" height="50" fill={getBlockColor('nakheel', 0)} stroke="#333" strokeWidth="2"
                  className={isInAuction('nakheel', 0) ? 'animate-pulse' : ''} rx="5" />
            <rect x="400" y="320" width="50" height="50" fill={getBlockColor('nakheel', 1)} stroke="#333" strokeWidth="2"
                  className={isInAuction('nakheel', 1) ? 'animate-pulse' : ''} rx="5" />
            <rect x="310" y="380" width="50" height="50" fill={getBlockColor('nakheel', 2)} stroke="#333" strokeWidth="2"
                  className={isInAuction('nakheel', 2) ? 'animate-pulse' : ''} rx="5" />
            <rect x="370" y="380" width="50" height="50" fill={getBlockColor('nakheel', 3)} stroke="#333" strokeWidth="2"
                  className={isInAuction('nakheel', 3) ? 'animate-pulse' : ''} rx="5" />
            <rect x="430" y="380" width="50" height="50" fill={getBlockColor('nakheel', 4)} stroke="#333" strokeWidth="2"
                  className={isInAuction('nakheel', 4) ? 'animate-pulse' : ''} rx="5" />
          </g>
          
          {/* South (حي السفارات) */}
          <g id="diplomatic">
            <text x="400" y="480" textAnchor="middle" className="fill-text-dark font-montserrat font-bold text-lg">حي السفارات</text>
            <rect x="280" y="500" width="55" height="55" fill={getBlockColor('diplomatic', 0)} stroke="#333" strokeWidth="2"
                  className={isInAuction('diplomatic', 0) ? 'animate-pulse' : ''} rx="5" />
            <rect x="345" y="500" width="55" height="55" fill={getBlockColor('diplomatic', 1)} stroke="#333" strokeWidth="2"
                  className={isInAuction('diplomatic', 1) ? 'animate-pulse' : ''} rx="5" />
            <rect x="410" y="500" width="55" height="55" fill={getBlockColor('diplomatic', 2)} stroke="#333" strokeWidth="2"
                  className={isInAuction('diplomatic', 2) ? 'animate-pulse' : ''} rx="5" />
            <rect x="475" y="500" width="55" height="55" fill={getBlockColor('diplomatic', 3)} stroke="#333" strokeWidth="2"
                  className={isInAuction('diplomatic', 3) ? 'animate-pulse' : ''} rx="5" />
            <rect x="377" y="440" width="55" height="55" fill={getBlockColor('diplomatic', 4)} stroke="#333" strokeWidth="2"
                  className={isInAuction('diplomatic', 4) ? 'animate-pulse' : ''} rx="5" />
          </g>
          
          {/* Roads */}
          <line x1="400" y1="0" x2="400" y2="600" stroke="#999" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
          <line x1="0" y1="300" x2="800" y2="300" stroke="#999" strokeWidth="1" strokeDasharray="5,5" opacity="0.5" />
        </svg>
      </div>
      
      {/* Legend */}
      <div className="mt-4 flex justify-center gap-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
          <span>متاح</span>
        </div>
        {state.teams.map(team => {
          const colorMap = {
            'property-blue': 'bg-property-blue',
            'property-red': 'bg-property-red',
            'estate-green': 'bg-estate-green',
            'realtor-purple': 'bg-realtor-purple'
          };
          return (
            <div key={team.id} className="flex items-center gap-2">
              <div className={`w-4 h-4 ${colorMap[team.color]} rounded`}></div>
              <span>{team.name}</span>
            </div>
          );
        })}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent rounded animate-pulse"></div>
          <span>قيد المزاد</span>
        </div>
      </div>
    </div>
  );
}

export default RiyadhMap;