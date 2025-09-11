import districtsData from '../../map/districts.json';
import citiesData from '../../map/cities.json';

// Get Riyadh city data
const RIYADH_CITY_ID = 3;
const riyadhCity = citiesData.find(city => city.city_id === RIYADH_CITY_ID);

// Filter only Riyadh districts
const riyadhDistricts = districtsData.filter(district => district.city_id === RIYADH_CITY_ID);

// Define 7 groups with 3 specific districts each
const GROUP_DEFINITIONS = [
  {
    id: 'group1',
    name: 'منطقة ١',
    color: '#FF6B6B',
    districtIds: [10100003145, 10100003147, 10100003146]
  },
  {
    id: 'group2', 
    name: 'منطقة ٢',
    color: '#4ECDC4',
    districtIds: [10100003089, 10100003090, 10100003047]
  },
  {
    id: 'group3',
    name: 'منطقة ٣',
    color: '#45B7D1',
    districtIds: [10100003140, 10100003101, 10100003139]
  },
  {
    id: 'group4',
    name: 'منطقة ٤',
    color: '#F7DC6F',
    districtIds: [10100003142, 10100003014, 10100003099]
  },
  {
    id: 'group5',
    name: 'منطقة ٥',
    color: '#BB8FCE',
    districtIds: [10100003108, 10100003110, 10100003084]
  },
  {
    id: 'group6',
    name: 'منطقة ٦',
    color: '#85C1E2',
    districtIds: [10100003051, 10100003075, 10100003033]
  },
  {
    id: 'group7',
    name: 'منطقة ٧',
    color: '#F8C471',
    districtIds: [10100003095, 10100003029, 10100003130]
  }
];

// Create game areas with specific districts
export function groupRiyadhDistricts() {
  const gameAreas = GROUP_DEFINITIONS.map((group, index) => {
    // Get the actual district data for this group
    const groupDistricts = group.districtIds.map(id => 
      riyadhDistricts.find(d => d.district_id === id)
    ).filter(Boolean); // Remove any undefined districts

    // Calculate center point of the group
    let centerLat = 0, centerLng = 0, pointCount = 0;
    groupDistricts.forEach(district => {
      if (district && district.boundaries && district.boundaries[0]) {
        district.boundaries[0].forEach(point => {
          centerLat += point[0];
          centerLng += point[1];
          pointCount++;
        });
      }
    });
    
    if (pointCount > 0) {
      centerLat /= pointCount;
      centerLng /= pointCount;
    }

    return {
      id: group.id,
      name: group.name,
      color: group.color,
      center: [centerLat, centerLng],
      districts: groupDistricts,
      districtCount: groupDistricts.length,
      districtIds: group.districtIds
    };
  });

  return gameAreas;
}

// Get all district boundaries for a group
export function getAreaBoundaries(groupId) {
  const area = GAME_AREAS.find(a => a.id === groupId);
  if (!area) return [];
  
  const boundaries = [];
  area.districts.forEach(district => {
    if (district && district.boundaries && district.boundaries[0]) {
      boundaries.push({
        districtId: district.district_id,
        districtName: district.name_ar,
        coordinates: district.boundaries[0].map(coord => [coord[0], coord[1]])
      });
    }
  });
  
  return boundaries;
}

// Get individual district boundaries within a group
export function getDistrictBoundary(districtId) {
  const district = riyadhDistricts.find(d => d.district_id === districtId);
  if (!district || !district.boundaries || !district.boundaries[0]) return null;
  
  return {
    districtId: district.district_id,
    districtName: district.name_ar,
    coordinates: district.boundaries[0].map(coord => [coord[0], coord[1]])
  };
}

// Check which group a district belongs to
export function getDistrictGroup(districtId) {
  return GROUP_DEFINITIONS.find(group => 
    group.districtIds.includes(districtId)
  );
}

// Export Riyadh center coordinates
export const RIYADH_CENTER = riyadhCity ? riyadhCity.center : [24.7136, 46.6753];

// Export processed data
export const GAME_AREAS = groupRiyadhDistricts();
export const GROUPS = GROUP_DEFINITIONS;