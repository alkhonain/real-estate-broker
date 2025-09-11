import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import { MAPS } from '../data/arabicMaps.js';
import TeamSetup from './TeamSetup.jsx';

function GameSetup() {
  const { dispatch, QUESTION_CATEGORIES } = useGame();
  const [selectedMap, setSelectedMap] = useState('riyadh');
  const [teamCount, setTeamCount] = useState(2);
  const [difficulty, setDifficulty] = useState('medium');
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showTeamSetup, setShowTeamSetup] = useState(false);
  const [configuredTeams, setConfiguredTeams] = useState(null);
  
  const handleCategoryToggle = (categoryId) => {
    if (selectedCategories.includes(categoryId)) {
      setSelectedCategories(selectedCategories.filter(id => id !== categoryId));
    } else if (selectedCategories.length < 6) {
      setSelectedCategories([...selectedCategories, categoryId]);
    }
  };
  
  const handleTeamsConfigured = (teams) => {
    setConfiguredTeams(teams);
    setShowTeamSetup(false);
  };
  
  const handleStartGame = () => {
    if (selectedCategories.length === 0) {
      alert('يرجى اختيار فئة واحدة على الأقل');
      return;
    }
    
    if (!configuredTeams) {
      setShowTeamSetup(true);
      return;
    }
    
    dispatch({
      type: 'SETUP_GAME',
      payload: {
        mapId: selectedMap,
        teamCount,
        difficulty,
        selectedCategories,
        customTeams: configuredTeams
      }
    });
  };
  
  if (showTeamSetup) {
    return (
      <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float-delayed"></div>
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/10 rounded-full blur-3xl"></div>
        
        <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-4xl w-full border border-white/50">
          <TeamSetup 
            teamCount={teamCount} 
            onTeamsConfigured={handleTeamsConfigured}
          />
          <button
            onClick={() => setShowTeamSetup(false)}
            className="w-full mt-6 bg-gradient-to-r from-gray-500 to-gray-600 hover:from-gray-600 hover:to-gray-700 text-white font-montserrat font-medium text-sm py-3 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            رجوع
          </button>
        </div>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-4xl w-full border border-white/50">
        <h1 className="text-4xl font-montserrat font-bold text-center mb-8 text-luxury-gold">
          سمسار العقارات
        </h1>
        
        <div className="space-y-6">
          {/* City Info */}
          <div className="text-center bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-lg border border-indigo-200/30">
            <h2 className="text-2xl font-montserrat font-bold bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent mb-2">
              مدينة الرياض
            </h2>
            <p className="text-gray-600 font-medium">
              7 مجموعات • 3 أحياء في كل مجموعة
            </p>
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
                  onClick={() => {
                    setTeamCount(count);
                    setConfiguredTeams(null); // Reset team configuration when count changes
                  }}
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
          
          {/* Show configured teams if any */}
          {configuredTeams && (
            <div className="relative bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 shadow-lg border border-indigo-200/30 overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <div className="relative z-10">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="font-montserrat font-bold text-lg bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">الفرق المكونة:</h3>
                  <button
                    onClick={() => setShowTeamSetup(true)}
                    className="text-sm font-medium text-indigo-600 hover:text-purple-600 transition-colors duration-200 flex items-center gap-1"
                  >
                    <span>تعديل</span>
                    <span className="text-lg">✏️</span>
                  </button>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {configuredTeams.map(team => (
                    <div key={team.id} className={`relative px-4 py-3 rounded-xl ${team.bgColor} text-white shadow-md hover:shadow-xl transform hover:scale-105 transition-all duration-200 group overflow-hidden`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative z-10 flex items-center gap-3">
                        <span className="text-2xl filter drop-shadow-md">{team.icon}</span>
                        <span className="font-montserrat font-semibold">{team.name}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}
          
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
          <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mt-6 shadow-lg border border-indigo-200/30">
            <h3 className="font-montserrat font-semibold text-lg mb-3 text-gray-800">قوانين اللعبة</h3>
            <ul className="space-y-1 text-sm">
              <li>• كل فريق يبدأ بـ 10 مليون ريال</li>
              <li>• المزايدة بزيادات 50,000 ريال</li>
              <li>• المبلغ المدفوع في المزاد يُخصم حتى لو كانت الإجابة خاطئة</li>
              <li>• أجب على السؤال بشكل صحيح لتأمين المنطقة</li>
              <li>• كل مجموعة تحتوي على 3 أحياء حقيقية في الرياض</li>
              <li>• المجموعات الأولى تحتوي على نقاط أكثر</li>
              <li>• استخدم البطاقات الخاصة بشكل استراتيجي</li>
              <li>• الأسئلة المستخدمة لن تتكرر في الألعاب المستقبلية</li>
            </ul>
          </div>
          
          {/* Start Button */}
          <button
            onClick={handleStartGame}
            disabled={selectedCategories.length === 0}
            className="w-full btn-primary text-xl py-4 mt-6 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {!configuredTeams ? 'تخصيص الفرق والبدء' : 'ابدأ اللعبة'}
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