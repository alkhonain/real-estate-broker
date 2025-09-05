import React from 'react';
import { useGame } from '../contexts/GameContext.jsx';

function RiyadhRealisticMap() {
  const { state } = useGame();
  
  const getBlockStatus = (districtId, blockIndex) => {
    const block = state.blocks.find(b => 
      b.districtId === districtId && 
      b.id === state.selectedMap.districts.find(d => d.id === districtId)?.blocks[blockIndex]?.id
    );
    
    if (!block) return { color: '#FFFFFF', isAuction: false, owner: null };
    
    const isAuction = state.currentAuction?.block.id === block.id;
    let color = '#FFFFFF';
    
    if (isAuction) {
      color = '#FF5722';
    } else if (block.owner) {
      const team = state.teams.find(t => t.id === block.owner);
      color = team?.hex || '#FFFFFF';
    }
    
    return { color, isAuction, owner: block.owner };
  };
  
  return (
    <div className="bg-map-bg rounded-lg shadow-lg p-6 overflow-auto">
      <h2 className="text-2xl font-montserrat font-bold mb-4 text-center">
        خريطة الرياض
      </h2>
      
      <div className="relative mx-auto" style={{ maxWidth: '900px', minHeight: '600px' }}>
        <svg viewBox="0 0 900 700" className="w-full h-full">
          {/* Background */}
          <rect width="900" height="700" fill="#F5EEE6" />
          
          {/* Districts - Based on actual Riyadh map layout */}
          
          {/* North - حطين/النرجس area */}
          <g id="north-districts">
            <path d="M 200 50 L 400 50 L 420 120 L 380 180 L 200 150 Z" 
                  fill="#FFB366" stroke="#333" strokeWidth="2" opacity="0.3"/>
            <text x="300" y="100" textAnchor="middle" className="fill-text-dark font-bold" style={{ fontSize: '14px' }}>الشمال</text>
          </g>
          
          {/* Center - العليا (Olaya) */}
          <g id="olaya-district">
            <path d="M 350 200 L 450 180 L 480 250 L 450 320 L 350 300 Z" 
                  fill={getBlockStatus('olaya', 0).color} 
                  stroke="#333" strokeWidth="2"
                  className={getBlockStatus('olaya', 0).isAuction ? 'animate-pulse' : ''}
                  style={{ cursor: 'pointer' }}/>
            <text x="400" y="250" textAnchor="middle" className="fill-text-dark font-bold" style={{ fontSize: '16px' }}>العليا</text>
            
            {/* Olaya Blocks */}
            <rect x="360" y="210" width="30" height="25" fill={getBlockStatus('olaya', 0).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('olaya', 0).isAuction ? 'animate-pulse' : ''} />
            <rect x="400" y="210" width="30" height="25" fill={getBlockStatus('olaya', 1).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('olaya', 1).isAuction ? 'animate-pulse' : ''} />
            <rect x="360" y="245" width="30" height="25" fill={getBlockStatus('olaya', 2).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('olaya', 2).isAuction ? 'animate-pulse' : ''} />
            <rect x="400" y="245" width="30" height="25" fill={getBlockStatus('olaya', 3).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('olaya', 3).isAuction ? 'animate-pulse' : ''} />
            <rect x="380" y="280" width="30" height="25" fill={getBlockStatus('olaya', 4).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('olaya', 4).isAuction ? 'animate-pulse' : ''} />
          </g>
          
          {/* East - الملز (Malaz) */}
          <g id="malaz-district">
            <path d="M 500 200 L 600 180 L 620 280 L 580 350 L 500 320 Z" 
                  fill="#98FB98" stroke="#333" strokeWidth="2" opacity="0.3"/>
            <text x="550" y="250" textAnchor="middle" className="fill-text-dark font-bold" style={{ fontSize: '16px' }}>الملز</text>
            
            {/* Malaz Blocks */}
            <rect x="520" y="220" width="25" height="25" fill={getBlockStatus('malaz', 0).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('malaz', 0).isAuction ? 'animate-pulse' : ''} />
            <rect x="555" y="220" width="25" height="25" fill={getBlockStatus('malaz', 1).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('malaz', 1).isAuction ? 'animate-pulse' : ''} />
            <rect x="520" y="255" width="25" height="25" fill={getBlockStatus('malaz', 2).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('malaz', 2).isAuction ? 'animate-pulse' : ''} />
            <rect x="555" y="255" width="25" height="25" fill={getBlockStatus('malaz', 3).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('malaz', 3).isAuction ? 'animate-pulse' : ''} />
            <rect x="537" y="290" width="25" height="25" fill={getBlockStatus('malaz', 4).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('malaz', 4).isAuction ? 'animate-pulse' : ''} />
          </g>
          
          {/* West - الدرعية (Diriyah) */}
          <g id="diriyah-district">
            <path d="M 100 200 L 200 180 L 220 280 L 180 350 L 100 320 Z" 
                  fill="#DEB887" stroke="#333" strokeWidth="2" opacity="0.3"/>
            <text x="150" y="250" textAnchor="middle" className="fill-text-dark font-bold" style={{ fontSize: '16px' }}>الدرعية</text>
            
            {/* Diriyah Blocks */}
            <rect x="120" y="220" width="25" height="25" fill={getBlockStatus('diriyah', 0).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('diriyah', 0).isAuction ? 'animate-pulse' : ''} />
            <rect x="155" y="220" width="25" height="25" fill={getBlockStatus('diriyah', 1).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('diriyah', 1).isAuction ? 'animate-pulse' : ''} />
            <rect x="120" y="255" width="25" height="25" fill={getBlockStatus('diriyah', 2).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('diriyah', 2).isAuction ? 'animate-pulse' : ''} />
            <rect x="155" y="255" width="25" height="25" fill={getBlockStatus('diriyah', 3).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('diriyah', 3).isAuction ? 'animate-pulse' : ''} />
            <rect x="137" y="290" width="25" height="25" fill={getBlockStatus('diriyah', 4).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('diriyah', 4).isAuction ? 'animate-pulse' : ''} />
          </g>
          
          {/* Southeast - الروضة (Rowdah) */}
          <g id="rowdah-district">
            <path d="M 500 380 L 620 360 L 640 480 L 580 520 L 500 480 Z" 
                  fill="#87CEEB" stroke="#333" strokeWidth="2" opacity="0.3"/>
            <text x="560" y="430" textAnchor="middle" className="fill-text-dark font-bold" style={{ fontSize: '16px' }}>الروضة</text>
            
            {/* Rowdah Blocks */}
            <rect x="520" y="390" width="25" height="25" fill={getBlockStatus('rowdah', 0).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('rowdah', 0).isAuction ? 'animate-pulse' : ''} />
            <rect x="555" y="390" width="25" height="25" fill={getBlockStatus('rowdah', 1).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('rowdah', 1).isAuction ? 'animate-pulse' : ''} />
            <rect x="590" y="390" width="25" height="25" fill={getBlockStatus('rowdah', 2).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('rowdah', 2).isAuction ? 'animate-pulse' : ''} />
            <rect x="537" y="425" width="25" height="25" fill={getBlockStatus('rowdah', 3).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('rowdah', 3).isAuction ? 'animate-pulse' : ''} />
            <rect x="572" y="425" width="25" height="25" fill={getBlockStatus('rowdah', 4).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('rowdah', 4).isAuction ? 'animate-pulse' : ''} />
          </g>
          
          {/* South - الشفا (Shifa) */}
          <g id="shifa-district">
            <path d="M 300 480 L 420 460 L 440 580 L 380 620 L 300 580 Z" 
                  fill="#FFA07A" stroke="#333" strokeWidth="2" opacity="0.3"/>
            <text x="360" y="530" textAnchor="middle" className="fill-text-dark font-bold" style={{ fontSize: '16px' }}>الشفا</text>
            
            {/* Shifa Blocks */}
            <rect x="320" y="490" width="25" height="25" fill={getBlockStatus('shifa', 0).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('shifa', 0).isAuction ? 'animate-pulse' : ''} />
            <rect x="355" y="490" width="25" height="25" fill={getBlockStatus('shifa', 1).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('shifa', 1).isAuction ? 'animate-pulse' : ''} />
            <rect x="390" y="490" width="25" height="25" fill={getBlockStatus('shifa', 2).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('shifa', 2).isAuction ? 'animate-pulse' : ''} />
            <rect x="337" y="525" width="25" height="25" fill={getBlockStatus('shifa', 3).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('shifa', 3).isAuction ? 'animate-pulse' : ''} />
            <rect x="372" y="525" width="25" height="25" fill={getBlockStatus('shifa', 4).color} stroke="#666" strokeWidth="1" rx="3"
                  className={getBlockStatus('shifa', 4).isAuction ? 'animate-pulse' : ''} />
          </g>
          
          {/* Main Roads */}
          <line x1="50" y1="350" x2="850" y2="350" stroke="#999" strokeWidth="3" opacity="0.3" />
          <line x1="450" y1="50" x2="450" y2="650" stroke="#999" strokeWidth="3" opacity="0.3" />
          
          {/* Road Labels */}
          <text x="450" y="340" textAnchor="middle" className="fill-gray-600" style={{ fontSize: '12px' }}>طريق الملك فهد</text>
          <text x="700" y="360" textAnchor="middle" className="fill-gray-600" style={{ fontSize: '12px', transform: 'rotate(-90deg)', transformOrigin: '700px 360px' }}>الطريق الدائري الشرقي</text>
        </svg>
      </div>
      
      {/* Legend */}
      <div className="mt-6 flex justify-center gap-4 text-sm flex-wrap">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-white border border-gray-300 rounded"></div>
          <span>متاح</span>
        </div>
        {state.teams.map(team => (
          <div key={team.id} className="flex items-center gap-2">
            <div className="w-4 h-4 rounded" style={{ backgroundColor: team.hex }}></div>
            <span>{team.icon} {team.name}</span>
          </div>
        ))}
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-accent rounded animate-pulse"></div>
          <span>قيد المزاد</span>
        </div>
      </div>
      
      {/* District Info */}
      <div className="mt-4 grid grid-cols-2 md:grid-cols-3 gap-2 text-xs">
        {state.selectedMap.districts.map(district => {
          const ownedBlocks = state.blocks.filter(b => b.districtId === district.id && b.owner).length;
          return (
            <div key={district.id} className="bg-gray-100 rounded p-2">
              <div className="font-semibold">{district.name}</div>
              <div className="text-gray-600">{ownedBlocks}/{district.blocks.length} مملوكة</div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default RiyadhRealisticMap;