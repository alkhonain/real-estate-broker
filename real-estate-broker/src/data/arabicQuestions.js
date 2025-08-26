export const QUESTION_CATEGORIES = {
  geography: {
    id: 'geography',
    name: 'جغرافيا',
    icon: '🌍',
    color: 'bg-blue-500'
  },
  history: {
    id: 'history',
    name: 'تاريخ',
    icon: '📜',
    color: 'bg-amber-600'
  },
  science: {
    id: 'science',
    name: 'علوم',
    icon: '🔬',
    color: 'bg-green-500'
  },
  sports: {
    id: 'sports',
    name: 'رياضة',
    icon: '⚽',
    color: 'bg-red-500'
  },
  culture: {
    id: 'culture',
    name: 'ثقافة عامة',
    icon: '🎭',
    color: 'bg-purple-500'
  },
  religion: {
    id: 'religion',
    name: 'دين',
    icon: '🕌',
    color: 'bg-teal-500'
  },
  technology: {
    id: 'technology',
    name: 'تكنولوجيا',
    icon: '💻',
    color: 'bg-indigo-500'
  },
  arabic: {
    id: 'arabic',
    name: 'لغة عربية',
    icon: '📖',
    color: 'bg-yellow-600'
  },
  math: {
    id: 'math',
    name: 'رياضيات',
    icon: '🔢',
    color: 'bg-pink-500'
  },
  saudi: {
    id: 'saudi',
    name: 'السعودية',
    icon: '🇸🇦',
    color: 'bg-green-600'
  }
};

export const QUESTIONS_BY_CATEGORY = {
  geography: [
    {
      id: 'geo1',
      question: 'ما هي عاصمة اليابان؟',
      answer: 'طوكيو',
      hint: 'تبدأ بحرف الطاء',
      difficulty: 'easy'
    },
    {
      id: 'geo2',
      question: 'كم عدد القارات في العالم؟',
      answer: '7',
      hint: 'عدد فردي',
      difficulty: 'easy'
    },
    {
      id: 'geo3',
      question: 'ما هو أطول نهر في العالم؟',
      answer: 'نهر النيل',
      hint: 'يمر بمصر',
      difficulty: 'medium'
    },
    {
      id: 'geo4',
      question: 'ما هي أكبر صحراء في العالم؟',
      answer: 'الصحراء الكبرى',
      hint: 'في أفريقيا',
      difficulty: 'medium'
    },
    {
      id: 'geo5',
      question: 'ما هو أعمق محيط في العالم؟',
      answer: 'المحيط الهادئ',
      hint: 'أكبر محيط أيضاً',
      difficulty: 'hard'
    }
  ],
  history: [
    {
      id: 'his1',
      question: 'في أي عام تأسست المملكة العربية السعودية؟',
      answer: '1932',
      hint: 'في الثلاثينات',
      difficulty: 'medium'
    },
    {
      id: 'his2',
      question: 'من هو مؤسس الدولة الأموية؟',
      answer: 'معاوية بن أبي سفيان',
      hint: 'صحابي جليل',
      difficulty: 'medium'
    },
    {
      id: 'his3',
      question: 'متى كانت غزوة بدر؟',
      answer: 'السنة الثانية للهجرة',
      hint: 'في رمضان',
      difficulty: 'medium'
    },
    {
      id: 'his4',
      question: 'من هو أول خليفة راشد؟',
      answer: 'أبو بكر الصديق',
      hint: 'صاحب رسول الله',
      difficulty: 'easy'
    },
    {
      id: 'his5',
      question: 'كم سنة استمرت الحرب العالمية الثانية؟',
      answer: '6 سنوات',
      hint: 'من 1939 إلى 1945',
      difficulty: 'medium'
    }
  ],
  science: [
    {
      id: 'sci1',
      question: 'ما هو الرمز الكيميائي للذهب؟',
      answer: 'Au',
      hint: 'من الكلمة اللاتينية Aurum',
      difficulty: 'medium'
    },
    {
      id: 'sci2',
      question: 'كم عدد الكواكب في المجموعة الشمسية؟',
      answer: '8',
      hint: 'بلوتو لم يعد كوكباً',
      difficulty: 'easy'
    },
    {
      id: 'sci3',
      question: 'ما هي سرعة الضوء؟',
      answer: '300000 كم/ث',
      hint: 'ثلاثمائة ألف',
      difficulty: 'hard'
    },
    {
      id: 'sci4',
      question: 'ما هو أصغر عضو في جسم الإنسان؟',
      answer: 'الركاب',
      hint: 'في الأذن',
      difficulty: 'hard'
    },
    {
      id: 'sci5',
      question: 'كم عدد العظام في جسم الإنسان البالغ؟',
      answer: '206',
      hint: 'أكثر من 200',
      difficulty: 'medium'
    }
  ],
  sports: [
    {
      id: 'spo1',
      question: 'كم لاعباً في فريق كرة القدم؟',
      answer: '11',
      hint: 'عدد فردي',
      difficulty: 'easy'
    },
    {
      id: 'spo2',
      question: 'من فاز بكأس العالم 2022؟',
      answer: 'الأرجنتين',
      hint: 'فريق ميسي',
      difficulty: 'easy'
    },
    {
      id: 'spo3',
      question: 'كم دقيقة في شوط كرة القدم؟',
      answer: '45',
      hint: 'نصف 90',
      difficulty: 'easy'
    },
    {
      id: 'spo4',
      question: 'في أي رياضة يستخدم مصطلح "الإيس"؟',
      answer: 'التنس',
      hint: 'رياضة المضرب',
      difficulty: 'medium'
    },
    {
      id: 'spo5',
      question: 'كم عدد اللاعبين في فريق كرة السلة؟',
      answer: '5',
      hint: 'نصف عدد لاعبي كرة القدم تقريباً',
      difficulty: 'easy'
    }
  ],
  culture: [
    {
      id: 'cul1',
      question: 'من مؤلف رواية "ألف ليلة وليلة"؟',
      answer: 'مؤلف مجهول',
      hint: 'ليس شخصاً واحداً',
      difficulty: 'hard'
    },
    {
      id: 'cul2',
      question: 'ما هي أكبر مكتبة في العالم؟',
      answer: 'مكتبة الكونجرس',
      hint: 'في أمريكا',
      difficulty: 'medium'
    },
    {
      id: 'cul3',
      question: 'كم حرفاً في الأبجدية العربية؟',
      answer: '28',
      hint: 'أكثر من 25',
      difficulty: 'easy'
    },
    {
      id: 'cul4',
      question: 'من رسم لوحة الموناليزا؟',
      answer: 'ليوناردو دافنشي',
      hint: 'فنان إيطالي',
      difficulty: 'medium'
    },
    {
      id: 'cul5',
      question: 'ما هي أقدم جامعة في العالم؟',
      answer: 'جامعة القرويين',
      hint: 'في المغرب',
      difficulty: 'hard'
    }
  ],
  religion: [
    {
      id: 'rel1',
      question: 'كم عدد أركان الإسلام؟',
      answer: '5',
      hint: 'عدد أصابع اليد',
      difficulty: 'easy'
    },
    {
      id: 'rel2',
      question: 'في أي شهر يصوم المسلمون؟',
      answer: 'رمضان',
      hint: 'الشهر التاسع',
      difficulty: 'easy'
    },
    {
      id: 'rel3',
      question: 'كم عدد السور في القرآن الكريم؟',
      answer: '114',
      hint: 'أكثر من 100',
      difficulty: 'medium'
    },
    {
      id: 'rel4',
      question: 'ما هي أطول سورة في القرآن؟',
      answer: 'البقرة',
      hint: 'اسم حيوان',
      difficulty: 'easy'
    },
    {
      id: 'rel5',
      question: 'كم عدد الأنبياء المذكورين في القرآن؟',
      answer: '25',
      hint: 'ربع مائة',
      difficulty: 'medium'
    }
  ],
  technology: [
    {
      id: 'tec1',
      question: 'من مؤسس شركة آبل؟',
      answer: 'ستيف جوبز',
      hint: 'اسمه ستيف',
      difficulty: 'easy'
    },
    {
      id: 'tec2',
      question: 'ما معنى AI؟',
      answer: 'الذكاء الاصطناعي',
      hint: 'Artificial Intelligence',
      difficulty: 'easy'
    },
    {
      id: 'tec3',
      question: 'في أي عام أطلق أول آيفون؟',
      answer: '2007',
      hint: 'في الألفية الثالثة',
      difficulty: 'medium'
    },
    {
      id: 'tec4',
      question: 'ما هي أكبر شبكة تواصل اجتماعي؟',
      answer: 'فيسبوك',
      hint: 'أسسها مارك',
      difficulty: 'easy'
    },
    {
      id: 'tec5',
      question: 'ما هو نظام التشغيل الأكثر استخداماً للهواتف؟',
      answer: 'أندرويد',
      hint: 'روبوت أخضر',
      difficulty: 'easy'
    }
  ],
  arabic: [
    {
      id: 'ara1',
      question: 'ما هو جمع كلمة "صحراء"؟',
      answer: 'صحارى',
      hint: 'ينتهي بألف مقصورة',
      difficulty: 'medium'
    },
    {
      id: 'ara2',
      question: 'من هو شاعر النيل؟',
      answer: 'حافظ إبراهيم',
      hint: 'اسمه حافظ',
      difficulty: 'medium'
    },
    {
      id: 'ara3',
      question: 'ما هو نوع كلمة "جميل"؟',
      answer: 'صفة',
      hint: 'تصف الشيء',
      difficulty: 'easy'
    },
    {
      id: 'ara4',
      question: 'من هو أمير الشعراء؟',
      answer: 'أحمد شوقي',
      hint: 'مصري',
      difficulty: 'medium'
    },
    {
      id: 'ara5',
      question: 'كم حرف جر في اللغة العربية؟',
      answer: '20',
      hint: 'عشرون',
      difficulty: 'hard'
    }
  ],
  math: [
    {
      id: 'mat1',
      question: 'ما هو ناتج 15 × 20؟',
      answer: '300',
      hint: 'ثلاث مئات',
      difficulty: 'easy'
    },
    {
      id: 'mat2',
      question: 'كم ضلعاً في المثلث؟',
      answer: '3',
      hint: 'أقل من المربع',
      difficulty: 'easy'
    },
    {
      id: 'mat3',
      question: 'ما هو جذر 144؟',
      answer: '12',
      hint: 'دزينة',
      difficulty: 'medium'
    },
    {
      id: 'mat4',
      question: 'كم درجة في الدائرة الكاملة؟',
      answer: '360',
      hint: 'أيام السنة تقريباً',
      difficulty: 'medium'
    },
    {
      id: 'mat5',
      question: 'ما هو 25% من 200؟',
      answer: '50',
      hint: 'نصف المئة',
      difficulty: 'easy'
    }
  ],
  saudi: [
    {
      id: 'sau1',
      question: 'ما هي عاصمة المملكة العربية السعودية؟',
      answer: 'الرياض',
      hint: 'مدينة الحدائق',
      difficulty: 'easy'
    },
    {
      id: 'sau2',
      question: 'كم منطقة إدارية في السعودية؟',
      answer: '13',
      hint: 'أكثر من 10',
      difficulty: 'medium'
    },
    {
      id: 'sau3',
      question: 'ما هو اليوم الوطني السعودي؟',
      answer: '23 سبتمبر',
      hint: 'في الشهر التاسع',
      difficulty: 'easy'
    },
    {
      id: 'sau4',
      question: 'ما هي عملة السعودية؟',
      answer: 'الريال',
      hint: 'يبدأ بحرف الراء',
      difficulty: 'easy'
    },
    {
      id: 'sau5',
      question: 'ما هو أطول برج في السعودية؟',
      answer: 'برج المملكة',
      hint: 'في الرياض',
      difficulty: 'medium'
    }
  ]
};

// Function to get all questions from selected categories
export const getQuestionsByCategories = (selectedCategories) => {
  let allQuestions = [];
  
  selectedCategories.forEach(categoryId => {
    if (QUESTIONS_BY_CATEGORY[categoryId]) {
      allQuestions = [...allQuestions, ...QUESTIONS_BY_CATEGORY[categoryId].map(q => ({
        ...q,
        category: categoryId
      }))];
    }
  });
  
  return allQuestions;
};

// Function to get random question from specific category
export const getRandomQuestionFromCategory = (categoryId, usedQuestions = []) => {
  const categoryQuestions = QUESTIONS_BY_CATEGORY[categoryId] || [];
  const availableQuestions = categoryQuestions.filter(q => !usedQuestions.includes(q.id));
  
  if (availableQuestions.length === 0) return null;
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return {
    ...availableQuestions[randomIndex],
    category: categoryId
  };
};