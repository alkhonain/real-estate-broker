import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import { MAPS } from '../data/arabicMaps.js';

function GameSetup() {
  const { dispatch, QUESTION_CATEGORIES } = useGame();
  const [selectedMap, setSelectedMap] = useState('riyadh');
  const [teamCount, setTeamCount] = useState(2);
  const [difficulty, setDifficulty] = useState('medium');
  const [selectedCategories, setSelectedCategories] = useState([]);
  
  const handleCategoryToggle = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else if (selectedCategories.length < 6) {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  
  const handleStartGame = () => {
    if (selectedCategories.length === 0) {
      alert('يرجى اختيار فئة واحدة على الأقل');
      return;
    }
    
    dispatch({
      type: 'SETUP_GAME',
      payload: {
        mapId: selectedMap,
        teamCount,
        difficulty,
        selectedCategories
      }
    });
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-card-bg rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-montserrat font-bold text-center mb-8 text-luxury-gold">
          سمسار العقارات
        </h1>
        
        <div className="space-y-6">
          {/* Map Selection */}
          <div>
            <label className="block text-lg font-montserrat font-semibold mb-3">
              اختر خريطة المدينة
            </label>
            <div className="grid grid-cols-3 gap-4">
              {Object.entries(MAPS).map(([id, map]) => (
                <button
                  key={id}
                  onClick={() => setSelectedMap(id)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    selectedMap === id
                      ? 'border-luxury-gold bg-premium-bg'
                      : 'border-gray-300 hover:border-luxury-gold'
                  }`}
                >
                  <div className="text-lg font-montserrat font-medium">{map.name}</div>
                  <div className="text-sm text-gray-600 mt-1">
                    {map.districts.length} أحياء
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Team Count */}
          <div>
            <label className="block text-lg font-montserrat font-semibold mb-3">
              عدد الفرق
            </label>
            <div className="grid grid-cols-3 gap-4">
              {[2, 3, 4].map(count => (
                <button
                  key={count}
                  onClick={() => setTeamCount(count)}
                  className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                    teamCount === count
                      ? 'border-luxury-gold bg-premium-bg'
                      : 'border-gray-300 hover:border-luxury-gold'
                  }`}
                >
                  <div className="text-lg font-montserrat font-medium">{count} فرق</div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Categories Selection */}
          <div>
            <label className="block text-lg font-montserrat font-semibold mb-3">
              اختر فئات الأسئلة (حد أقصى 6)
            </label>
            <div className="grid grid-cols-3 gap-3">
              {Object.entries(QUESTION_CATEGORIES).map(([id, category]) => (
                <button
                  key={id}
                  onClick={() => handleCategoryToggle(id)}
                  disabled={!selectedCategories.includes(id) && selectedCategories.length >= 6}
                  className={`p-3 rounded-lg border-2 transition-all duration-200 flex items-center gap-2 ${
                    selectedCategories.includes(id)
                      ? `border-luxury-gold ${category.color} text-white`
                      : 'border-gray-300 hover:border-luxury-gold disabled:opacity-50 disabled:cursor-not-allowed'
                  }`}
                >
                  <span className="text-2xl">{category.icon}</span>
                  <span className="font-medium">{category.name}</span>
                </button>
              ))}
            </div>
            <div className="mt-2 text-sm text-gray-600">
              الفئات المختارة: {selectedCategories.length} من 6
            </div>
          </div>
          
          {/* Game Rules Summary */}
          <div className="bg-map-bg rounded-lg p-4 mt-6">
            <h3 className="font-montserrat font-semibold text-lg mb-2">قوانين اللعبة</h3>
            <ul className="space-y-1 text-sm">
              <li>• كل فريق يبدأ بـ 10 مليون ريال</li>
              <li>• المزايدة بزيادات 50,000 ريال</li>
              <li>• أجب على السؤال بشكل صحيح لتأمين العقار</li>
              <li>• اجمع 3 عقارات في نفس الحي لمضاعفة النقاط</li>
              <li>• استخدم البطاقات الخاصة بشكل استراتيجي</li>
              <li>• مدة اللعبة: 45 دقيقة</li>
              <li>• الأسئلة المستخدمة لن تتكرر في الألعاب المستقبلية</li>
            </ul>
          </div>
          
          {/* Start Button */}
          <button
            onClick={handleStartGame}
            disabled={selectedCategories.length === 0}
            className="w-full btn-primary text-xl py-4 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            ابدأ اللعبة
          </button>
          
          {/* Reset Questions Button */}
          <button
            onClick={() => {
              dispatch({ type: 'RESET_USED_QUESTIONS' });
              alert('تم إعادة تعيين الأسئلة المستخدمة');
            }}
            className="w-full btn-secondary text-sm py-2"
          >
            إعادة تعيين الأسئلة المستخدمة
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameSetup;