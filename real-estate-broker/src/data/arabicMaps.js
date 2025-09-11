import { GAME_AREAS, getAreaBoundaries, getDistrictBoundary } from '../utils/riyadhDistrictsProcessor.js';

// Points distribution for each district based on difficulty
const DISTRICT_POINTS = {
  // منطقة ١ - High difficulty districts
  10100003145: { pieces: 25, points: 2500, name: 'حي الملقا' }, // حي الملقا
  10100003147: { pieces: 24, points: 2400, name: 'حي الياسمين' }, // حي الياسمين
  10100003146: { pieces: 23, points: 2300, name: 'حي النزهة' }, // حي النزهة
  
  // منطقة ٢ - High difficulty districts
  10100003089: { pieces: 20, points: 2000, name: 'حي الروابي' }, // حي الروابي
  10100003090: { pieces: 19, points: 1900, name: 'حي الريان' }, // حي الريان
  10100003047: { pieces: 18, points: 1800, name: 'حي الربوة' }, // حي الربوة
  
  // منطقة ٣ - Medium difficulty districts
  10100003140: { pieces: 15, points: 1500, name: 'حي المونسية' }, // حي المونسية
  10100003101: { pieces: 14, points: 1400, name: 'حي قرطبة' }, // حي قرطبة
  10100003139: { pieces: 13, points: 1300, name: 'حي اليرموك' }, // حي اليرموك
  
  // منطقة ٤ - Medium difficulty districts
  10100003142: { pieces: 12, points: 1200, name: 'عرقة' }, // عرقة
  10100003014: { pieces: 11, points: 1100, name: 'حي لبن' }, // حي لبن
  10100003099: { pieces: 10, points: 1000, name: 'حي السفارات' }, // حي السفارات
  
  // منطقة ٥ - Medium difficulty districts
  10100003108: { pieces: 9, points: 900, name: 'حي النخيل' }, // حي النخيل
  10100003110: { pieces: 8, points: 800, name: 'حي المروج' }, // حي المروج
  10100003084: { pieces: 7, points: 700, name: 'حي المصيف' }, // حي المصيف
  
  // منطقة ٦ - Easy difficulty districts
  10100003051: { pieces: 6, points: 600, name: 'حي الملز' }, // حي الملز
  10100003075: { pieces: 5, points: 500, name: 'حي العليا' }, // حي العليا
  10100003033: { pieces: 4, points: 400, name: 'حي الفيصلية' }, // حي الفيصلية
  
  // منطقة ٧ - Easy difficulty districts
  10100003095: { pieces: 3, points: 300, name: 'حي طيبة' }, // حي طيبة
  10100003029: { pieces: 2, points: 200, name: 'حي العزيزية' }, // حي العزيزية
  10100003130: { pieces: 1, points: 100, name: 'حي الدار البيضاء' } // حي الدار البيضاء
};

// Create blocks from the 7 Riyadh areas with districts
const createRiyadhBlocks = () => {
  const blocks = [];
  
  GAME_AREAS.forEach((area) => {
    area.districtIds.forEach(districtId => {
      const districtInfo = DISTRICT_POINTS[districtId];
      if (districtInfo) {
        blocks.push({
          id: `district-${districtId}`,
          name: districtInfo.name,
          pieces: districtInfo.pieces,
          points: districtInfo.points,
          basePrice: 1000000 + (districtInfo.pieces * 50000),
          districtId: districtId,
          areaId: area.id,
          areaName: area.name
        });
      }
    });
  });
  
  return blocks;
};

export const MAPS = {
  riyadh: {
    id: 'riyadh',
    name: 'الرياض',
    districts: [
      {
        id: 'riyadh-districts',
        name: 'أحياء الرياض',
        blocks: createRiyadhBlocks()
      }
    ]
  }
};

export const getMapById = (mapId) => MAPS[mapId];

export const getDistrictById = (mapId, districtId) => {
  const map = getMapById(mapId);
  return map?.districts.find(d => d.id === districtId);
};

export const getBlockById = (mapId, districtId, blockId) => {
  const district = getDistrictById(mapId, districtId);
  return district?.blocks.find(b => b.id === blockId);
};

export const calculateBlockValue = (pieces, basePrice) => {
  return Math.floor((pieces * basePrice) / 10);
};

export const calculateBlockPoints = (pieces) => {
  return pieces * 100;
};

// Get all districts in a specific area/group
export const getDistrictsInArea = (areaId) => {
  const area = GAME_AREAS.find(a => a.id === areaId);
  if (!area) return [];
  
  return area.districtIds.map(districtId => {
    const districtInfo = DISTRICT_POINTS[districtId];
    if (districtInfo) {
      return {
        id: districtId,
        name: districtInfo.name,
        points: districtInfo.points,
        pieces: districtInfo.pieces
      };
    }
    return null;
  }).filter(Boolean);
};

// Get area information for a district
export const getAreaForDistrict = (districtId) => {
  const area = GAME_AREAS.find(a => a.districtIds.includes(districtId));
  return area ? { id: area.id, name: area.name } : null;
};