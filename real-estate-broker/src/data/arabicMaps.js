export const MAPS = {
  riyadh: {
    id: 'riyadh',
    name: 'الرياض',
    districts: [
      {
        id: 'olaya',
        name: 'العليا',
        blocks: [
          { id: 'olaya1', name: 'برج المملكة', pieces: 25, basePrice: 2000000 }, // 2500 points (hard)
          { id: 'olaya2', name: 'طريق الملك فهد', pieces: 20, basePrice: 1800000 }, // 2000 points (hard)
          { id: 'olaya3', name: 'شارع التحلية', pieces: 15, basePrice: 1600000 } // 1500 points (medium)
        ]
      },
      {
        id: 'malaz',
        name: 'الملز',
        blocks: [
          { id: 'malaz1', name: 'منطقة الملعب', pieces: 12, basePrice: 1200000 }, // 1200 points (medium)
          { id: 'malaz2', name: 'طريق الأمير فيصل', pieces: 8, basePrice: 1000000 }, // 800 points (easy)
          { id: 'malaz3', name: 'وسط الملز', pieces: 6, basePrice: 900000 } // 600 points (easy)
        ]
      },
      {
        id: 'diriyah',
        name: 'الدرعية',
        blocks: [
          { id: 'diriyah1', name: 'حي الطريف', pieces: 22, basePrice: 1700000 }, // 2200 points (hard)
          { id: 'diriyah2', name: 'البجيري', pieces: 18, basePrice: 1500000 }, // 1800 points (hard)
          { id: 'diriyah3', name: 'قرية التراث', pieces: 14, basePrice: 1400000 } // 1400 points (medium)
        ]
      },
      {
        id: 'nakheel',
        name: 'النخيل',
        blocks: [
          { id: 'nakheel1', name: 'حدائق النخيل', pieces: 10, basePrice: 1100000 }, // 1000 points (medium)
          { id: 'nakheel2', name: 'الوادي الأخضر', pieces: 7, basePrice: 950000 }, // 700 points (easy)
          { id: 'nakheel3', name: 'ساحة النخيل', pieces: 5, basePrice: 1250000 } // 500 points (easy)
        ]
      },
      {
        id: 'diplomatic',
        name: 'حي السفارات',
        blocks: [
          { id: 'dq1', name: 'شارع السفارات', pieces: 24, basePrice: 2200000 }, // 2400 points (hard)
          { id: 'dq2', name: 'المنطقة الدولية', pieces: 23, basePrice: 2000000 }, // 2300 points (hard)
          { id: 'dq3', name: 'حدائق الدبلوماسيين', pieces: 19, basePrice: 1850000 } // 1900 points (hard)
        ]
      },
      {
        id: 'hittin',
        name: 'حطين',
        blocks: [
          { id: 'hittin1', name: 'حي النموذجية', pieces: 13, basePrice: 1300000 }, // 1300 points (medium)
          { id: 'hittin2', name: 'شارع الأمير سلطان', pieces: 11, basePrice: 1100000 }, // 1100 points (medium)
          { id: 'hittin3', name: 'مركز حطين التجاري', pieces: 4, basePrice: 1000000 } // 400 points (easy)
        ]
      },
      {
        id: 'yarmouk',
        name: 'اليرموك',
        blocks: [
          { id: 'yarmouk1', name: 'حي الجامعات', pieces: 15, basePrice: 1400000 }, // 1500 points (medium)
          { id: 'yarmouk2', name: 'مجمع اليرموك', pieces: 7, basePrice: 1200000 }, // 700 points (easy)
          { id: 'yarmouk3', name: 'حديقة اليرموك', pieces: 3, basePrice: 1000000 } // 300 points (easy)
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