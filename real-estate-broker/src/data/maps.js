export const MAPS = {
  riyadh: {
    id: 'riyadh',
    name: 'Riyadh',
    districts: [
      {
        id: 'olaya',
        name: 'Al Olaya',
        blocks: [
          { id: 'olaya1', name: 'Olaya Tower Block', pieces: 24, basePrice: 2000000 },
          { id: 'olaya2', name: 'King Fahd Road', pieces: 20, basePrice: 1800000 },
          { id: 'olaya3', name: 'Tahlia Street', pieces: 18, basePrice: 1600000 },
          { id: 'olaya4', name: 'Business District', pieces: 22, basePrice: 1900000 },
          { id: 'olaya5', name: 'Olaya Gardens', pieces: 16, basePrice: 1400000 }
        ]
      },
      {
        id: 'malaz',
        name: 'Al Malaz',
        blocks: [
          { id: 'malaz1', name: 'Stadium Area', pieces: 14, basePrice: 1200000 },
          { id: 'malaz2', name: 'Prince Faisal', pieces: 12, basePrice: 1000000 },
          { id: 'malaz3', name: 'Malaz Central', pieces: 10, basePrice: 900000 },
          { id: 'malaz4', name: 'University District', pieces: 16, basePrice: 1300000 },
          { id: 'malaz5', name: 'Malaz Park', pieces: 8, basePrice: 800000 }
        ]
      },
      {
        id: 'diriyah',
        name: 'Diriyah',
        blocks: [
          { id: 'diriyah1', name: 'Historic Quarter', pieces: 20, basePrice: 1700000 },
          { id: 'diriyah2', name: 'Al Bujairi', pieces: 18, basePrice: 1500000 },
          { id: 'diriyah3', name: 'Heritage Village', pieces: 16, basePrice: 1400000 },
          { id: 'diriyah4', name: 'Wadi Hanifa', pieces: 14, basePrice: 1200000 },
          { id: 'diriyah5', name: 'Cultural District', pieces: 22, basePrice: 1800000 }
        ]
      },
      {
        id: 'nakheel',
        name: 'Al Nakheel',
        blocks: [
          { id: 'nakheel1', name: 'Palm Gardens', pieces: 12, basePrice: 1100000 },
          { id: 'nakheel2', name: 'Green Valley', pieces: 10, basePrice: 950000 },
          { id: 'nakheel3', name: 'Nakheel Plaza', pieces: 14, basePrice: 1250000 },
          { id: 'nakheel4', name: 'Family District', pieces: 8, basePrice: 850000 },
          { id: 'nakheel5', name: 'Community Center', pieces: 6, basePrice: 700000 }
        ]
      },
      {
        id: 'diplomatic',
        name: 'Diplomatic Quarter',
        blocks: [
          { id: 'dq1', name: 'Embassy Row', pieces: 24, basePrice: 2200000 },
          { id: 'dq2', name: 'International Zone', pieces: 22, basePrice: 2000000 },
          { id: 'dq3', name: 'Diplomat Gardens', pieces: 20, basePrice: 1850000 },
          { id: 'dq4', name: 'Cultural Center', pieces: 18, basePrice: 1650000 },
          { id: 'dq5', name: 'VIP District', pieces: 24, basePrice: 2100000 }
        ]
      }
    ]
  },
  doha: {
    id: 'doha',
    name: 'Doha',
    districts: [
      {
        id: 'westbay',
        name: 'West Bay',
        blocks: [
          { id: 'wb1', name: 'Marina District', pieces: 24, basePrice: 2300000 },
          { id: 'wb2', name: 'Business Tower', pieces: 22, basePrice: 2100000 },
          { id: 'wb3', name: 'Corniche View', pieces: 20, basePrice: 1900000 },
          { id: 'wb4', name: 'City Center', pieces: 18, basePrice: 1700000 },
          { id: 'wb5', name: 'Diplomatic Area', pieces: 24, basePrice: 2200000 }
        ]
      },
      {
        id: 'pearl',
        name: 'The Pearl',
        blocks: [
          { id: 'pearl1', name: 'Porto Arabia', pieces: 24, basePrice: 2400000 },
          { id: 'pearl2', name: 'Viva Bahriya', pieces: 22, basePrice: 2200000 },
          { id: 'pearl3', name: 'Qanat Quartier', pieces: 20, basePrice: 2000000 },
          { id: 'pearl4', name: 'Medina Centrale', pieces: 18, basePrice: 1800000 },
          { id: 'pearl5', name: 'Abraj Quartier', pieces: 16, basePrice: 1600000 }
        ]
      },
      {
        id: 'lusail',
        name: 'Lusail',
        blocks: [
          { id: 'lusail1', name: 'Marina Promenade', pieces: 20, basePrice: 1850000 },
          { id: 'lusail2', name: 'Stadium District', pieces: 18, basePrice: 1650000 },
          { id: 'lusail3', name: 'Entertainment City', pieces: 16, basePrice: 1450000 },
          { id: 'lusail4', name: 'Fox Hills', pieces: 14, basePrice: 1250000 },
          { id: 'lusail5', name: 'Energy City', pieces: 22, basePrice: 1950000 }
        ]
      },
      {
        id: 'musheireb',
        name: 'Musheireb',
        blocks: [
          { id: 'mush1', name: 'Heritage Quarter', pieces: 16, basePrice: 1500000 },
          { id: 'mush2', name: 'Downtown Core', pieces: 14, basePrice: 1300000 },
          { id: 'mush3', name: 'Cultural Village', pieces: 12, basePrice: 1100000 },
          { id: 'mush4', name: 'Smart District', pieces: 18, basePrice: 1600000 },
          { id: 'mush5', name: 'Green Community', pieces: 10, basePrice: 900000 }
        ]
      },
      {
        id: 'airport',
        name: 'Airport City',
        blocks: [
          { id: 'air1', name: 'Free Zone', pieces: 14, basePrice: 1200000 },
          { id: 'air2', name: 'Logistics Hub', pieces: 12, basePrice: 1000000 },
          { id: 'air3', name: 'Business Park', pieces: 16, basePrice: 1400000 },
          { id: 'air4', name: 'Cargo District', pieces: 10, basePrice: 800000 },
          { id: 'air5', name: 'Transit Center', pieces: 8, basePrice: 700000 }
        ]
      }
    ]
  },
  amman: {
    id: 'amman',
    name: 'Amman',
    districts: [
      {
        id: 'abdoun',
        name: 'Abdoun',
        blocks: [
          { id: 'abd1', name: 'Abdoun Circle', pieces: 20, basePrice: 1600000 },
          { id: 'abd2', name: 'Embassy District', pieces: 18, basePrice: 1400000 },
          { id: 'abd3', name: 'Taj Mall Area', pieces: 16, basePrice: 1200000 },
          { id: 'abd4', name: 'North Abdoun', pieces: 14, basePrice: 1000000 },
          { id: 'abd5', name: 'South Abdoun', pieces: 12, basePrice: 900000 }
        ]
      },
      {
        id: 'downtown',
        name: 'Downtown',
        blocks: [
          { id: 'dt1', name: 'Roman Theater', pieces: 14, basePrice: 1100000 },
          { id: 'dt2', name: 'Rainbow Street', pieces: 12, basePrice: 950000 },
          { id: 'dt3', name: 'Al Balad', pieces: 10, basePrice: 850000 },
          { id: 'dt4', name: 'Gold Souk', pieces: 8, basePrice: 750000 },
          { id: 'dt5', name: 'Citadel Hill', pieces: 16, basePrice: 1250000 }
        ]
      },
      {
        id: 'shmeisani',
        name: 'Shmeisani',
        blocks: [
          { id: 'shm1', name: 'Business Center', pieces: 18, basePrice: 1500000 },
          { id: 'shm2', name: 'Hospital District', pieces: 16, basePrice: 1300000 },
          { id: 'shm3', name: 'Tech Hub', pieces: 14, basePrice: 1100000 },
          { id: 'shm4', name: 'Banking Quarter', pieces: 20, basePrice: 1700000 },
          { id: 'shm5', name: 'Commercial Zone', pieces: 12, basePrice: 900000 }
        ]
      },
      {
        id: 'sweifieh',
        name: 'Sweifieh',
        blocks: [
          { id: 'swf1', name: 'Galleria Mall', pieces: 16, basePrice: 1350000 },
          { id: 'swf2', name: 'Paris Circle', pieces: 14, basePrice: 1150000 },
          { id: 'swf3', name: 'Wakalat Street', pieces: 12, basePrice: 950000 },
          { id: 'swf4', name: 'Village Center', pieces: 10, basePrice: 850000 },
          { id: 'swf5', name: 'Tech District', pieces: 18, basePrice: 1450000 }
        ]
      },
      {
        id: 'dabouq',
        name: 'Dabouq',
        blocks: [
          { id: 'dbq1', name: 'Green Hills', pieces: 14, basePrice: 1200000 },
          { id: 'dbq2', name: 'Valley View', pieces: 12, basePrice: 1000000 },
          { id: 'dbq3', name: 'Dabouq Heights', pieces: 16, basePrice: 1400000 },
          { id: 'dbq4', name: 'Garden District', pieces: 10, basePrice: 800000 },
          { id: 'dbq5', name: 'Sunset Boulevard', pieces: 8, basePrice: 700000 }
        ]
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