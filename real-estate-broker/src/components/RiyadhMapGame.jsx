import React, { useEffect, useState, useMemo, useCallback } from 'react';
import { MapContainer, TileLayer, Polygon, Popup, useMap, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useGame } from '../contexts/GameContext.jsx';
import { GAME_AREAS, RIYADH_CENTER, getAreaBoundaries, getDistrictBoundary, getDistrictGroup } from '../utils/riyadhDistrictsProcessor.js';
import { getAreaForDistrict, getDistrictsInArea } from '../data/arabicMaps.js';
import { formatNumber } from '../utils/formatters.js';

// Fix Leaflet icon issue
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
});

// Component to handle map bounds and zoom controls
function MapBounds({ setMapInstance }) {
  const map = useMap();
  
  useEffect(() => {
    // Save map instance
    setMapInstance(map);
    
    // Calculate bounds for all Riyadh districts
    const allCoords = [];
    GAME_AREAS.forEach(area => {
      const boundaries = getAreaBoundaries(area.id);
      boundaries.forEach(boundary => {
        boundary.coordinates.forEach(coord => {
          allCoords.push(coord);
        });
      });
    });
    
    if (allCoords.length > 0) {
      const bounds = L.latLngBounds(allCoords);
      map.fitBounds(bounds, { padding: [50, 50] });
    }
  }, [map, setMapInstance]);
  
  return null;
}

function RiyadhMapGame() {
  const { state } = useGame();
  const [hoveredDistrict, setHoveredDistrict] = useState(null);
  const [hoveredGroup, setHoveredGroup] = useState(null);
  const [auctionGroup, setAuctionGroup] = useState(null);
  const [mapLoaded, setMapLoaded] = useState(false);
  const [mapInstance, setMapInstance] = useState(null);
  const [expandedGroup, setExpandedGroup] = useState('all'); // Show all expanded by default
  
  useEffect(() => {
    setMapLoaded(true);
  }, []);
  
  // Map districts to game blocks - memoized for performance
  const districtToBlock = useMemo(() => {
    const mapping = {};
    if (state.blocks && state.blocks.length > 0) {
      state.blocks.forEach(block => {
        if (block.districtId) {
          mapping[block.districtId] = block;
        }
      });
    }
    return mapping;
  }, [state.blocks]);
  
  // Get color for a district based on ownership
  const getDistrictColor = useCallback((districtId) => {
    const block = districtToBlock[districtId];
    
    // Check if district is blocked
    if (block && state.blockedBlocks?.includes(block.id)) {
      return '#4A4A4A'; // Dark gray for blocked districts
    }
    
    // If no owner, return grey
    if (!block || !block.owner) {
      return '#CCCCCC'; // Grey for unowned
    }
    
    // If owned, return team color
    const team = state.teams.find(t => t.id === block.owner);
    return team?.hex || '#CCCCCC';
  }, [districtToBlock, state.teams, state.blockedBlocks]);
  
  // Check if district is in auction
  const isDistrictInAuction = useCallback((districtId) => {
    const block = districtToBlock[districtId];
    return state.currentAuction?.block?.id === block?.id;
  }, [districtToBlock, state.currentAuction]);
  
  // Check if district is blocked
  const isDistrictBlocked = useCallback((districtId) => {
    const block = districtToBlock[districtId];
    return block && state.blockedBlocks?.includes(block.id);
  }, [districtToBlock, state.blockedBlocks]);
  
  const handleDistrictClick = useCallback((district, group) => {
    console.log('Clicked district:', district.districtName, 'in group:', group.name);
  }, []);
  
  // Update auction group when auction changes
  useEffect(() => {
    if (state.currentAuction?.block?.districtId) {
      const group = getDistrictGroup(state.currentAuction.block.districtId);
      setAuctionGroup(group?.id || null);
    } else {
      setAuctionGroup(null);
    }
  }, [state.currentAuction]);
  
  if (!mapLoaded) {
    return (
      <div className="h-[600px] w-full rounded-2xl bg-gradient-to-br from-blue-50 to-indigo-50 flex items-center justify-center">
        <div className="text-2xl font-montserrat text-gray-600 animate-pulse">جاري تحميل خريطة الرياض...</div>
      </div>
    );
  }
  
  return (
    <div className="space-y-4">
      {/* Compact Groups Section */}
      <div className="bg-white rounded-xl shadow-lg border border-gray-200" dir="rtl">
        <div className="bg-gradient-to-r from-blue-600 to-indigo-600 p-2">
          <h3 className="font-bold text-sm text-white flex items-center gap-1">
            <span>🏘️</span>
            مجموعات الرياض
          </h3>
        </div>
        
        <div className="p-2">
          <div className={`grid ${auctionGroup ? 'grid-cols-1' : 'grid-cols-7'} gap-1 transition-all duration-500`}>
            {GAME_AREAS.map(group => {
              const districtsInGroup = getDistrictsInArea(group.id);
              
              // Hide other groups when one is in auction
              if (auctionGroup && auctionGroup !== group.id) {
                return null;
              }
              
              return (
                <div 
                  key={group.id} 
                  className={`
                    rounded border transition-all duration-300
                    ${auctionGroup === group.id 
                      ? 'bg-red-50 border-red-400 shadow-lg' 
                      : 'bg-gray-50 border-gray-200 hover:shadow-md text-[10px]'}
                  `}
                  onMouseEnter={() => setHoveredGroup(group.id)}
                  onMouseLeave={() => setHoveredGroup(null)}
                >
                  {/* Group Header */}
                  <div className={`
                    font-bold text-center
                    ${auctionGroup === group.id 
                      ? 'p-2 text-base bg-red-500 text-white' 
                      : 'p-1 text-xs bg-blue-600 text-white'}
                  `}>
                    {auctionGroup === group.id && <span className="text-lg animate-bounce">🔨 </span>}
                    {group.name}
                  </div>
                  
                  {/* Districts List - Compact or Expanded based on auction */}
                  <div className={auctionGroup === group.id ? "p-3 grid grid-cols-3 gap-2" : "p-1 space-y-0.5"}>
                    {districtsInGroup.map(district => {
                      const block = districtToBlock[district.id];
                      const ownerTeam = block?.owner ? state.teams.find(t => t.id === block.owner) : null;
                      const isBlocked = isDistrictBlocked(district.id);
                      const isInAuction = isDistrictInAuction(district.id);
                      
                      // Default view - only circles and points
                      if (auctionGroup !== group.id) {
                        return (
                          <div 
                            key={district.id}
                            className="flex items-center gap-1 p-0.5"
                          >
                            <div 
                              className="w-3 h-3 rounded-full flex-shrink-0"
                              style={{ 
                                backgroundColor: isBlocked ? '#4A4A4A' : (ownerTeam ? ownerTeam.hex : '#E5E7EB')
                              }}
                              title={`${district.name} - ${ownerTeam?.name || 'غير مملوك'}`}
                            />
                            <div className={`text-[10px] font-bold ${isBlocked ? 'text-gray-500' : 'text-gray-700'}`}>
                              {formatNumber(district.points)}
                            </div>
                          </div>
                        );
                      }
                      
                      // Expanded view when in auction
                      return (
                        <div 
                          key={district.id}
                          className={`
                            p-2 rounded border transition-all
                            ${isInAuction 
                              ? 'border-red-400 bg-red-50 shadow-md animate-pulse' 
                              : isBlocked 
                                ? 'border-gray-400 bg-gray-100' 
                                : 'border-gray-200 bg-white'}
                          `}
                        >
                          {/* District Name */}
                          <div className="font-semibold text-xs mb-1 text-center">
                            <span className={isBlocked ? 'line-through text-gray-500' : 'text-gray-800'}>
                              {district.name}
                            </span>
                          </div>
                          
                          {/* Points */}
                          <div className="text-center mb-2">
                            <span className={`font-bold text-sm ${isBlocked ? 'text-gray-500' : 'text-blue-600'}`}>
                              {formatNumber(district.points)}
                            </span>
                            <span className="text-[10px] text-gray-500 ml-1">نقطة</span>
                          </div>
                          
                          {/* Owner */}
                          <div className="flex flex-col items-center">
                            {ownerTeam ? (
                              <>
                                <div 
                                  className="w-8 h-8 rounded-full flex items-center justify-center text-white text-sm font-bold mb-1"
                                  style={{ backgroundColor: isBlocked ? '#4A4A4A' : ownerTeam.hex }}
                                >
                                  {ownerTeam.icon || ownerTeam.name.charAt(0)}
                                </div>
                                <span className={`text-[10px] font-medium ${isBlocked ? 'text-gray-500' : 'text-gray-700'}`}>
                                  {ownerTeam.name}
                                </span>
                              </>
                            ) : (
                              <div className="text-[10px] text-gray-400 italic">
                                غير مملوك
                              </div>
                            )}
                          </div>
                          
                          {/* Status */}
                          {(isInAuction || isBlocked) && (
                            <div className="mt-2 text-center">
                              {isInAuction && (
                                <span className="px-2 py-0.5 bg-red-500 text-white text-[9px] font-bold rounded-full animate-pulse block">
                                  في المزاد
                                </span>
                              )}
                              {isBlocked && !isInAuction && (
                                <span className="px-2 py-0.5 bg-gray-500 text-white text-[9px] font-bold rounded-full block">
                                  محظور
                                </span>
                              )}
                            </div>
                          )}
                        </div>
                      );
                    })}
                  </div>
                  
                  {/* Compact Total */}
                  <div className="bg-gray-200 px-1 py-0.5 border-t text-center">
                    <span className="font-bold text-xs text-gray-700">
                      المجموع: {formatNumber(districtsInGroup.reduce((sum, d) => sum + d.points, 0))}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
          
          {/* Compact Team Summary */}
          <div className="mt-2 pt-2 border-t border-gray-300">
            <div className="flex justify-around items-center">
              {state.teams.map(team => (
                <div key={team.id} className="text-center">
                  <div 
                    className="w-6 h-6 rounded-full mx-auto mb-0.5 flex items-center justify-center text-white text-xs font-bold"
                    style={{ backgroundColor: team.hex }}
                  >
                    {team.icon || team.name.charAt(0)}
                  </div>
                  <div className="text-[10px] font-medium">{team.name}</div>
                  <div className="text-xs font-bold">{formatNumber(team.score)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative h-[600px] w-full rounded-2xl overflow-hidden shadow-2xl border-4 border-white bg-gradient-to-br from-blue-50 to-indigo-50">
        <MapContainer
          center={RIYADH_CENTER}
          zoom={10}
          style={{ height: '100%', width: '100%' }}
          className="z-0"
          zoomControl={false}
          attributionControl={false}
        >
          <TileLayer
            url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
            opacity={0.6}
          />
          <MapBounds setMapInstance={setMapInstance} />
          
          {/* Render individual districts */}
          {GAME_AREAS.map(group => {
            const boundaries = getAreaBoundaries(group.id);
            
            return boundaries.map((boundary) => {
              const isInAuction = isDistrictInAuction(boundary.districtId);
              const isBlocked = isDistrictBlocked(boundary.districtId);
              const block = districtToBlock[boundary.districtId];
              const ownerTeam = block?.owner ? state.teams.find(t => t.id === block.owner) : null;
              
              // Get other districts in the same group
              const districtsInGroup = getDistrictsInArea(group.id);
              
              return (
                <Polygon
                  key={boundary.districtId}
                  positions={boundary.coordinates}
                  pathOptions={{
                    fillColor: getDistrictColor(boundary.districtId),
                    fillOpacity: isBlocked ? 0.7 : (hoveredDistrict === boundary.districtId || isInAuction ? 0.8 : 0.6),
                    color: isInAuction ? '#ff0000' : (hoveredDistrict === boundary.districtId ? '#333333' : '#666666'),
                    weight: isInAuction ? 3 : (hoveredDistrict === boundary.districtId ? 3 : 1),
                    dashArray: isInAuction ? '10, 5' : null,
                    smoothFactor: 1.0,
                    noClip: false
                  }}
                  eventHandlers={{
                    click: () => handleDistrictClick(boundary, group),
                    mouseover: () => {
                      setHoveredDistrict(boundary.districtId);
                      setHoveredGroup(group.id);
                    },
                    mouseout: () => {
                      setHoveredDistrict(null);
                      setHoveredGroup(null);
                    }
                  }}
                >
                  <Tooltip 
                    permanent={false} 
                    sticky={false} 
                    direction="center" 
                    offset={[0, 0]} 
                    opacity={0.95}
                    className="custom-tooltip"
                  >
                    <div className="text-right p-2 min-w-[250px] bg-white rounded-lg shadow-lg" dir="rtl">
                      <h3 className="font-bold text-lg mb-2 text-gray-800">{block?.name || boundary.districtName}</h3>
                      <div className="space-y-1 text-sm">
                        <p className="text-gray-600">المجموعة: <span className="font-bold text-indigo-600">{group.name}</span></p>
                        {block && (
                          <>
                            <p>النقاط: <span className="font-bold text-yellow-600">{formatNumber(block.points)}</span></p>
                          </>
                        )}
                        <div className="mt-2 pt-2 border-t border-gray-200">
                          <p className="text-gray-500 text-xs mb-1">أحياء أخرى في نفس المجموعة:</p>
                          <div className="text-xs space-y-1">
                            {districtsInGroup.filter(d => d.id !== boundary.districtId).map(d => {
                              const otherBlock = districtToBlock[d.id];
                              const otherOwnerTeam = otherBlock?.owner ? state.teams.find(t => t.id === otherBlock.owner) : null;
                              const otherIsBlocked = otherBlock && state.blockedBlocks?.includes(otherBlock.id);
                              
                              return (
                                <div key={d.id} className="flex items-center gap-1">
                                  <span className={otherIsBlocked ? "text-gray-400" : "text-gray-600"}>•</span>
                                  <span className={`${otherIsBlocked ? 'line-through text-gray-400' : 'text-gray-600'}`}>
                                    {d.name}
                                  </span>
                                  <span className={otherIsBlocked ? "text-gray-400" : "text-gray-500"}>
                                    ({formatNumber(d.points)} نقطة)
                                  </span>
                                  {otherOwnerTeam && (
                                    <div 
                                      className="w-3 h-3 rounded-full ml-1" 
                                      style={{ backgroundColor: otherIsBlocked ? '#4A4A4A' : otherOwnerTeam.hex }}
                                      title={otherOwnerTeam.name}
                                    />
                                  )}
                                </div>
                              );
                            })}
                          </div>
                        </div>
                        {ownerTeam ? (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="font-bold">المالك:</p>
                            <div className={`inline-flex items-center gap-2 mt-1 ${ownerTeam.bgColor} text-white px-3 py-1 rounded-lg`}>
                              <span className="text-lg">{ownerTeam.icon}</span>
                              <span>{ownerTeam.name}</span>
                            </div>
                          </div>
                        ) : (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <p className="text-gray-500 italic">غير مملوك</p>
                          </div>
                        )}
                        {isBlocked && (
                          <div className="mt-2 pt-2 border-t border-gray-200">
                            <div className="bg-gray-800 text-white px-3 py-2 rounded-lg font-bold text-center">
                              🚫 محظور - فشل في الإجابة
                            </div>
                          </div>
                        )}
                        {isInAuction && (
                          <p className="text-green-500 font-bold mt-2 animate-pulse">🔨 في المزاد الآن</p>
                        )}
                      </div>
                    </div>
                  </Tooltip>
                </Polygon>
              );
            });
          })}
        </MapContainer>
        
        {/* Zoom Controls */}
        <div className="absolute top-4 left-4 z-10 flex flex-col gap-2">
          <button 
            onClick={() => mapInstance && mapInstance.zoomIn()}
            className="bg-white/90 backdrop-blur hover:bg-white rounded-lg p-2 shadow-lg transition-all hover:scale-110 active:scale-95"
            title="تكبير"
          >
            <span className="text-xl">+</span>
          </button>
          <button 
            onClick={() => mapInstance && mapInstance.zoomOut()}
            className="bg-white/90 backdrop-blur hover:bg-white rounded-lg p-2 shadow-lg transition-all hover:scale-110 active:scale-95"
            title="تصغير"
          >
            <span className="text-xl">−</span>
          </button>
          <button 
            onClick={() => {
              if (mapInstance) {
                const allCoords = [];
                GAME_AREAS.forEach(area => {
                  const boundaries = getAreaBoundaries(area.id);
                  boundaries.forEach(boundary => {
                    boundary.coordinates.forEach(coord => {
                      allCoords.push(coord);
                    });
                  });
                });
                if (allCoords.length > 0) {
                  const bounds = L.latLngBounds(allCoords);
                  mapInstance.fitBounds(bounds, { padding: [50, 50] });
                }
              }
            }}
            className="bg-white/90 backdrop-blur hover:bg-white rounded-lg p-2 shadow-lg transition-all hover:scale-110 active:scale-95"
            title="إعادة ضبط العرض"
          >
            <span className="text-xl">⟲</span>
          </button>
        </div>
        
        {/* Current Auction Indicator */}
        {state.currentAuction && (
          <div className="absolute top-4 right-4 z-10">
            <div className="bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl px-6 py-3 shadow-2xl animate-pulse" dir="rtl">
              <div className="flex items-center gap-3">
                <span className="text-2xl animate-bounce">🔨</span>
                <div>
                  <div className="font-bold text-sm">مزاد حالي</div>
                  <div className="text-lg font-bold">
                    {state.currentAuction.block.name}
                  </div>
                  <div className="text-sm opacity-90">
                    {state.currentAuction.block.areaName}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default RiyadhMapGame;