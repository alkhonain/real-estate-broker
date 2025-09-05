import React from 'react';
import { useGame } from '../contexts/GameContext.jsx';

function GameEnd() {
  const { state, dispatch } = useGame();
  
  // Sort teams by score
  const sortedTeams = [...state.teams].sort((a, b) => b.score - a.score);
  const winner = sortedTeams[0];
  
  const formatMoney = (amount) => {
    return new Intl.NumberFormat('ar-SA', {
      style: 'currency',
      currency: 'SAR',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0
    }).format(amount);
  };
  
  const getMedalEmoji = (position) => {
    switch (position) {
      case 0: return '🥇';
      case 1: return '🥈';
      case 2: return '🥉';
      default: return '';
    }
  };
  
  return (
    <div className="min-h-screen flex items-center justify-center p-8 relative overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-200/20 rounded-full blur-3xl animate-float"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-purple-200/20 rounded-full blur-3xl animate-float-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-200/10 rounded-full blur-3xl"></div>
      
      <div className="relative z-10 bg-white/80 backdrop-blur-xl rounded-2xl shadow-2xl p-8 max-w-4xl w-full border border-white/50">
        <h1 className="text-5xl font-montserrat font-bold text-center mb-8 bg-gradient-to-r from-yellow-500 to-amber-600 bg-clip-text text-transparent drop-shadow-lg animate-pulse">
          انتهت اللعبة!
        </h1>
        
        {/* Winner Announcement */}
        <div className="relative bg-gradient-to-br from-yellow-100 to-amber-100 rounded-2xl p-8 mb-8 text-center shadow-xl border border-yellow-200 overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-br from-transparent via-yellow-200/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="absolute -top-10 -right-10 w-32 h-32 bg-yellow-300/30 rounded-full blur-2xl animate-float"></div>
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-amber-300/30 rounded-full blur-2xl animate-float-delayed"></div>
          <div className="relative z-10">
          <div className="text-2xl font-montserrat font-semibold mb-2">
            🎉 تهانينا! 🎉
          </div>
          <div className="flex items-center justify-center gap-3 my-4">
            <span className="text-4xl">{winner.icon}</span>
            <span className={`text-4xl font-montserrat font-bold ${winner.bgColor} px-6 py-3 rounded-xl text-white shadow-lg`}>
              {winner.name} فائز!
            </span>
          </div>
          <div className="text-5xl font-roboto-mono font-bold bg-gradient-to-r from-yellow-600 to-amber-600 bg-clip-text text-transparent mt-4 drop-shadow-md">
            {winner.score.toLocaleString()} نقطة
          </div>
          </div>
        </div>
        
        {/* Final Standings */}
        <div className="mb-8">
          <h2 className="text-2xl font-montserrat font-semibold mb-4">الترتيب النهائي</h2>
          <div className="space-y-4">
            {sortedTeams.map((team, index) => {
              const teamBlocks = state.blocks.filter(b => b.owner === team.id);
              const districtCounts = teamBlocks.reduce((acc, block) => {
                acc[block.districtId] = (acc[block.districtId] || 0) + 1;
                return acc;
              }, {});
              const bonusDistricts = Object.values(districtCounts).filter(count => count >= 3).length;
              
              return (
                <div key={team.id} className={`relative bg-gradient-to-br from-white via-gray-50 to-indigo-50 rounded-xl p-6 shadow-lg border-2 ${index === 0 ? 'border-yellow-400 shadow-yellow-200' : index === 1 ? 'border-gray-400 shadow-gray-200' : index === 2 ? 'border-amber-600 shadow-amber-200' : 'border-gray-300'} hover:shadow-xl transition-all duration-300 overflow-hidden`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{getMedalEmoji(index)}</div>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-2xl">{team.icon}</span>
                          <span className={`text-xl font-montserrat font-bold ${team.bgColor} px-3 py-1 rounded-lg text-white`}>
                            {team.name}
                          </span>
                        </div>
                        <div className="text-sm text-gray-600">
                          {teamBlocks.length} عقار • {bonusDistricts} مكافآت المناطق
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-roboto-mono font-bold text-luxury-gold">
                        {team.score.toLocaleString()} نقطة
                      </div>
                      <div className="text-sm text-gray-600">
                        {formatMoney(team.money)} متبقي
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        
        {/* Game Statistics */}
        <div className="bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl p-6 mb-8 shadow-lg border border-indigo-200/30">
          <h3 className="text-xl font-montserrat font-semibold mb-4">إحصائيات اللعبة</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <div>
              <div className="text-2xl font-roboto-mono font-bold text-property-blue">
                {state.blocks.filter(b => b.owner).length}
              </div>
              <div className="text-sm text-gray-600">عقارات مباعة</div>
            </div>
            <div>
              <div className="text-2xl font-roboto-mono font-bold text-estate-green">
                {state.blocks.filter(b => !b.owner).length}
              </div>
              <div className="text-sm text-gray-600">عقارات متوفرة</div>
            </div>
            <div>
              <div className="text-2xl font-roboto-mono font-bold text-luxury-gold">
                {state.usedQuestions.length}
              </div>
              <div className="text-sm text-gray-600">أسئلة مطروحة</div>
            </div>
            <div>
              <div className="text-2xl font-roboto-mono font-bold text-property-red">
                {state.blockedBlocks?.length || 0}
              </div>
              <div className="text-sm text-gray-600">عقارات محظورة</div>
            </div>
          </div>
        </div>
        
        {/* New Game Buttons */}
        <div className="space-y-4">
          <button
            onClick={() => {
              dispatch({ type: 'RESET_USED_QUESTIONS' });
              dispatch({ type: 'RESTART_GAME' });
            }}
            className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-montserrat font-bold text-xl py-5 px-8 rounded-2xl shadow-xl hover:shadow-2xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200 group overflow-hidden"
          >
            <span className="relative z-10">بدء لعبة جديدة (أسئلة جديدة)</span>
          </button>
          
          <button
            onClick={() => dispatch({ type: 'RESTART_GAME' })}
            className="w-full bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-montserrat font-bold text-lg py-4 px-6 rounded-xl shadow-lg hover:shadow-xl transform hover:scale-[1.02] active:scale-[0.98] transition-all duration-200"
          >
            <span className="relative z-10">بدء لعبة جديدة (نفس الأسئلة)</span>
          </button>
        </div>
      </div>
    </div>
  );
}

export default GameEnd;