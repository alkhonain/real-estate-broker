export const MAPS = {
  riyadh: {
    id: 'riyadh',
    name: 'الرياض',
    districts: [
      {
        id: 'olaya',
        name: 'العليا',
        blocks: [
          { id: 'olaya1', name: 'برج المملكة', pieces: 24, basePrice: 2000000 },
          { id: 'olaya2', name: 'طريق الملك فهد', pieces: 20, basePrice: 1800000 },
          { id: 'olaya3', name: 'شارع التحلية', pieces: 18, basePrice: 1600000 },
          { id: 'olaya4', name: 'حي الأعمال', pieces: 22, basePrice: 1900000 },
          { id: 'olaya5', name: 'حدائق العليا', pieces: 16, basePrice: 1400000 }
        ]
      },
      {
        id: 'malaz',
        name: 'الملز',
        blocks: [
          { id: 'malaz1', name: 'منطقة الملعب', pieces: 14, basePrice: 1200000 },
          { id: 'malaz2', name: 'طريق الأمير فيصل', pieces: 12, basePrice: 1000000 },
          { id: 'malaz3', name: 'وسط الملز', pieces: 10, basePrice: 900000 },
          { id: 'malaz4', name: 'حي الجامعة', pieces: 16, basePrice: 1300000 },
          { id: 'malaz5', name: 'حديقة الملز', pieces: 8, basePrice: 800000 }
        ]
      },
      {
        id: 'diriyah',
        name: 'الدرعية',
        blocks: [
          { id: 'diriyah1', name: 'حي الطريف', pieces: 20, basePrice: 1700000 },
          { id: 'diriyah2', name: 'البجيري', pieces: 18, basePrice: 1500000 },
          { id: 'diriyah3', name: 'قرية التراث', pieces: 16, basePrice: 1400000 },
          { id: 'diriyah4', name: 'وادي حنيفة', pieces: 14, basePrice: 1200000 },
          { id: 'diriyah5', name: 'الحي الثقافي', pieces: 22, basePrice: 1800000 }
        ]
      },
      {
        id: 'nakheel',
        name: 'النخيل',
        blocks: [
          { id: 'nakheel1', name: 'حدائق النخيل', pieces: 12, basePrice: 1100000 },
          { id: 'nakheel2', name: 'الوادي الأخضر', pieces: 10, basePrice: 950000 },
          { id: 'nakheel3', name: 'ساحة النخيل', pieces: 14, basePrice: 1250000 },
          { id: 'nakheel4', name: 'الحي العائلي', pieces: 8, basePrice: 850000 },
          { id: 'nakheel5', name: 'مركز الحي', pieces: 6, basePrice: 700000 }
        ]
      },
      {
        id: 'diplomatic',
        name: 'حي السفارات',
        blocks: [
          { id: 'dq1', name: 'شارع السفارات', pieces: 24, basePrice: 2200000 },
          { id: 'dq2', name: 'المنطقة الدولية', pieces: 22, basePrice: 2000000 },
          { id: 'dq3', name: 'حدائق الدبلوماسيين', pieces: 20, basePrice: 1850000 },
          { id: 'dq4', name: 'المركز الثقافي', pieces: 18, basePrice: 1650000 },
          { id: 'dq5', name: 'حي كبار الشخصيات', pieces: 24, basePrice: 2100000 }
        ]
      }
    ]
  },
  doha: {
    id: 'doha',
    name: 'الدوحة',
    districts: [
      {
        id: 'westbay',
        name: 'الخليج الغربي',
        blocks: [
          { id: 'wb1', name: 'منطقة المارينا', pieces: 24, basePrice: 2300000 },
          { id: 'wb2', name: 'برج الأعمال', pieces: 22, basePrice: 2100000 },
          { id: 'wb3', name: 'إطلالة الكورنيش', pieces: 20, basePrice: 1900000 },
          { id: 'wb4', name: 'وسط المدينة', pieces: 18, basePrice: 1700000 },
          { id: 'wb5', name: 'المنطقة الدبلوماسية', pieces: 24, basePrice: 2200000 }
        ]
      },
      {
        id: 'pearl',
        name: 'اللؤلؤة',
        blocks: [
          { id: 'pearl1', name: 'بورتو أرابيا', pieces: 24, basePrice: 2400000 },
          { id: 'pearl2', name: 'فيفا بحرية', pieces: 22, basePrice: 2200000 },
          { id: 'pearl3', name: 'قناة كارتييه', pieces: 20, basePrice: 2000000 },
          { id: 'pearl4', name: 'مدينة الوسط', pieces: 18, basePrice: 1800000 },
          { id: 'pearl5', name: 'أبراج كارتييه', pieces: 16, basePrice: 1600000 }
        ]
      },
      {
        id: 'lusail',
        name: 'لوسيل',
        blocks: [
          { id: 'lusail1', name: 'ممشى المارينا', pieces: 20, basePrice: 1850000 },
          { id: 'lusail2', name: 'منطقة الاستاد', pieces: 18, basePrice: 1650000 },
          { id: 'lusail3', name: 'مدينة الترفيه', pieces: 16, basePrice: 1450000 },
          { id: 'lusail4', name: 'فوكس هيلز', pieces: 14, basePrice: 1250000 },
          { id: 'lusail5', name: 'مدينة الطاقة', pieces: 22, basePrice: 1950000 }
        ]
      },
      {
        id: 'musheireb',
        name: 'مشيرب',
        blocks: [
          { id: 'mush1', name: 'حي التراث', pieces: 16, basePrice: 1500000 },
          { id: 'mush2', name: 'وسط البلد', pieces: 14, basePrice: 1300000 },
          { id: 'mush3', name: 'القرية الثقافية', pieces: 12, basePrice: 1100000 },
          { id: 'mush4', name: 'الحي الذكي', pieces: 18, basePrice: 1600000 },
          { id: 'mush5', name: 'المجتمع الأخضر', pieces: 10, basePrice: 900000 }
        ]
      },
      {
        id: 'airport',
        name: 'مدينة المطار',
        blocks: [
          { id: 'air1', name: 'المنطقة الحرة', pieces: 14, basePrice: 1200000 },
          { id: 'air2', name: 'مركز اللوجستيات', pieces: 12, basePrice: 1000000 },
          { id: 'air3', name: 'مجمع الأعمال', pieces: 16, basePrice: 1400000 },
          { id: 'air4', name: 'منطقة الشحن', pieces: 10, basePrice: 800000 },
          { id: 'air5', name: 'مركز الترانزيت', pieces: 8, basePrice: 700000 }
        ]
      }
    ]
  },
  amman: {
    id: 'amman',
    name: 'عمّان',
    districts: [
      {
        id: 'abdoun',
        name: 'عبدون',
        blocks: [
          { id: 'abd1', name: 'دوار عبدون', pieces: 20, basePrice: 1600000 },
          { id: 'abd2', name: 'حي السفارات', pieces: 18, basePrice: 1400000 },
          { id: 'abd3', name: 'منطقة تاج مول', pieces: 16, basePrice: 1200000 },
          { id: 'abd4', name: 'عبدون الشمالي', pieces: 14, basePrice: 1000000 },
          { id: 'abd5', name: 'عبدون الجنوبي', pieces: 12, basePrice: 900000 }
        ]
      },
      {
        id: 'downtown',
        name: 'وسط البلد',
        blocks: [
          { id: 'dt1', name: 'المدرج الروماني', pieces: 14, basePrice: 1100000 },
          { id: 'dt2', name: 'شارع الرينبو', pieces: 12, basePrice: 950000 },
          { id: 'dt3', name: 'البلد', pieces: 10, basePrice: 850000 },
          { id: 'dt4', name: 'سوق الذهب', pieces: 8, basePrice: 750000 },
          { id: 'dt5', name: 'جبل القلعة', pieces: 16, basePrice: 1250000 }
        ]
      },
      {
        id: 'shmeisani',
        name: 'الشميساني',
        blocks: [
          { id: 'shm1', name: 'مركز الأعمال', pieces: 18, basePrice: 1500000 },
          { id: 'shm2', name: 'حي المستشفيات', pieces: 16, basePrice: 1300000 },
          { id: 'shm3', name: 'مركز التقنية', pieces: 14, basePrice: 1100000 },
          { id: 'shm4', name: 'الحي المصرفي', pieces: 20, basePrice: 1700000 },
          { id: 'shm5', name: 'المنطقة التجارية', pieces: 12, basePrice: 900000 }
        ]
      },
      {
        id: 'sweifieh',
        name: 'الصويفية',
        blocks: [
          { id: 'swf1', name: 'جاليريا مول', pieces: 16, basePrice: 1350000 },
          { id: 'swf2', name: 'دوار باريس', pieces: 14, basePrice: 1150000 },
          { id: 'swf3', name: 'شارع الوكالات', pieces: 12, basePrice: 950000 },
          { id: 'swf4', name: 'مركز القرية', pieces: 10, basePrice: 850000 },
          { id: 'swf5', name: 'حي التقنية', pieces: 18, basePrice: 1450000 }
        ]
      },
      {
        id: 'dabouq',
        name: 'دابوق',
        blocks: [
          { id: 'dbq1', name: 'التلال الخضراء', pieces: 14, basePrice: 1200000 },
          { id: 'dbq2', name: 'إطلالة الوادي', pieces: 12, basePrice: 1000000 },
          { id: 'dbq3', name: 'مرتفعات دابوق', pieces: 16, basePrice: 1400000 },
          { id: 'dbq4', name: 'حي الحدائق', pieces: 10, basePrice: 800000 },
          { id: 'dbq5', name: 'شارع الغروب', pieces: 8, basePrice: 700000 }
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