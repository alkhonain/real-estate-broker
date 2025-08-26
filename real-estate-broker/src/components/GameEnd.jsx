import React from 'react';
import { useGame } from '../contexts/GameContext.jsx';

function GameEnd() {
  const { state } = useGame();
  
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
    <div className="min-h-screen flex items-center justify-center p-8">
      <div className="bg-card-bg rounded-2xl shadow-2xl p-8 max-w-4xl w-full">
        <h1 className="text-4xl font-montserrat font-bold text-center mb-8 text-luxury-gold">
          انتهت اللعبة!
        </h1>
        
        {/* Winner Announcement */}
        <div className="bg-premium-bg rounded-lg p-6 mb-8 text-center">
          <div className="text-2xl font-montserrat font-semibold mb-2">
            🎉 تهانينا! 🎉
          </div>
          <div className={`text-3xl font-montserrat font-bold text-${winner.color}`}>
            {winner.name} فائز!
          </div>
          <div className="text-4xl font-roboto-mono font-bold text-luxury-gold mt-2">
            {winner.score.toLocaleString()} نقطة
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
                <div key={team.id} className={`bg-map-bg rounded-lg p-4 border-2 border-${team.color}`}>
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <div className="text-3xl">{getMedalEmoji(index)}</div>
                      <div>
                        <div className={`text-xl font-montserrat font-bold text-${team.color}`}>
                          {team.name}
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
        <div className="bg-map-bg rounded-lg p-6 mb-8">
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
                {Math.floor((45 * 60 - state.gameTimer) / 60)}m
              </div>
              <div className="text-sm text-gray-600">مدة اللعبة</div>
            </div>
          </div>
        </div>
        
        {/* New Game Button */}
        <button
          onClick={() => window.location.reload()}
          className="w-full btn-primary text-xl py-4"
        >
          بدء لعبة جديدة
        </button>
      </div>
    </div>
  );
}

export default GameEnd;