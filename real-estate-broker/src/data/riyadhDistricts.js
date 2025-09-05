// Based on the actual Riyadh districts map
export const RIYADH_DISTRICTS = {
  // North Districts
  'north': [
    { id: 'hittin', name: 'حطين', color: '#FFB366' },
    { id: 'narjis', name: 'النرجس', color: '#FFB366' },
    { id: 'wadi', name: 'الوادي', color: '#FFB366' }
  ],
  // Central Districts
  'central': [
    { id: 'olaya', name: 'العليا', color: '#FFD700' },
    { id: 'malaz', name: 'الملز', color: '#98FB98' },
    { id: 'sulaymaniyah', name: 'السليمانية', color: '#DDA0DD' },
    { id: 'muruj', name: 'المروج', color: '#F0E68C' },
    { id: 'rabwah', name: 'الربوة', color: '#FFE4B5' }
  ],
  // East Districts
  'east': [
    { id: 'rowdah', name: 'الروضة', color: '#87CEEB' },
    { id: 'naseem', name: 'النسيم', color: '#87CEEB' },
    { id: 'khaleej', name: 'الخليج', color: '#87CEEB' }
  ],
  // West Districts
  'west': [
    { id: 'diriyah', name: 'الدرعية', color: '#DEB887' },
    { id: 'irqah', name: 'العرقة', color: '#DEB887' }
  ],
  // South Districts
  'south': [
    { id: 'aziziyah', name: 'العزيزية', color: '#FFA07A' },
    { id: 'manfouhah', name: 'المنفوحة', color: '#FFA07A' },
    { id: 'shifa', name: 'الشفا', color: '#FFA07A' }
  ]
};

// Map districts with their blocks for the game
export const GAME_DISTRICTS = [
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
    id: 'rowdah',
    name: 'الروضة',
    blocks: [
      { id: 'rowdah1', name: 'قصر الحكم', pieces: 18, basePrice: 1600000 },
      { id: 'rowdah2', name: 'شارع الضباب', pieces: 16, basePrice: 1400000 },
      { id: 'rowdah3', name: 'الروضة الشرقية', pieces: 14, basePrice: 1200000 },
      { id: 'rowdah4', name: 'النخيل مول', pieces: 20, basePrice: 1800000 },
      { id: 'rowdah5', name: 'حي السفارات', pieces: 24, basePrice: 2200000 }
    ]
  },
  {
    id: 'shifa',
    name: 'الشفا',
    blocks: [
      { id: 'shifa1', name: 'شارع الأمير سلطان', pieces: 12, basePrice: 1100000 },
      { id: 'shifa2', name: 'الشفا الجنوبي', pieces: 10, basePrice: 950000 },
      { id: 'shifa3', name: 'مركز الشفا', pieces: 14, basePrice: 1250000 },
      { id: 'shifa4', name: 'الحي السكني', pieces: 8, basePrice: 850000 },
      { id: 'shifa5', name: 'حديقة الشفا', pieces: 6, basePrice: 700000 }
    ]
  }
];