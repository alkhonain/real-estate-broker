import React, { useState } from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import { formatMoney, formatNumber } from '../utils/formatters.js';

function BlockDetailsAndCategory({ onContinue }) {
  const { state, dispatch, QUESTION_CATEGORIES } = useGame();
  const { currentAuction, teams } = state;
  const [showCategorySelection, setShowCategorySelection] = useState(false);
  
  if (!currentAuction || !currentAuction.currentBidder) {
    return null;
  }
  
  const winningTeam = teams.find(t => t.id === currentAuction.currentBidder);
  const { block } = currentAuction;
  const winningBid = currentAuction.currentBid;
  
  const handleCategorySelect = (categoryId) => {
    dispatch({
      type: 'SELECT_QUESTION_CATEGORY',
      payload: { categoryId }
    });
    onContinue();
  };
  
  const handleShowCategories = () => {
    setShowCategorySelection(true);
  };
  
  if (!showCategorySelection) {
    return (
      <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
        <div className="relative overflow-hidden bg-gradient-to-br from-white via-blue-50 to-indigo-100 rounded-3xl shadow-2xl max-w-4xl w-full max-h-[90vh] p-8 border border-blue-200/50">
          {/* Animated background elements */}
          <div className="absolute inset-0 bg-gradient-to-br from-blue-100/20 via-transparent to-indigo-100/20 pointer-events-none"></div>
          <div className="absolute top-0 left-0 w-48 h-48 bg-gradient-to-br from-blue-300/20 to-transparent rounded-full blur-xl animate-pulse"></div>
          <div className="absolute bottom-0 right-0 w-40 h-40 bg-gradient-to-tr from-indigo-300/20 to-transparent rounded-full blur-xl animate-pulse delay-700"></div>
          
          <div className="relative z-10">
            {/* Winner Announcement */}
            <div className="text-center mb-8">
              <h2 className="text-4xl font-montserrat font-bold bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent mb-4">
                🎉 مبروك الفوز بالمزاد! 🎉
              </h2>
              <div className="flex items-center justify-center gap-3">
                {winningTeam.icon && <span className="text-5xl">{winningTeam.icon}</span>}
                <span className="text-3xl font-bold text-gray-800">{winningTeam.name}</span>
              </div>
            </div>
            
            {/* Block Details */}
            <div className="bg-gradient-to-r from-white/80 to-blue-50/80 backdrop-blur-sm rounded-2xl p-6 mb-8 shadow-xl border border-white/50">
              <h3 className="text-2xl font-montserrat font-bold mb-6 text-center text-gray-800">
                تفاصيل العقار المكتسب
              </h3>
              
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🏢</span>
                    <div>
                      <div className="text-sm text-gray-600">اسم العقار</div>
                      <div className="text-xl font-bold text-gray-800">{block.name}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">📍</span>
                    <div>
                      <div className="text-sm text-gray-600">الحي</div>
                      <div className="text-xl font-bold text-gray-800">{block.districtName}</div>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">🧱</span>
                    <div>
                      <div className="text-sm text-gray-600">عدد القطع</div>
                      <div className="text-xl font-bold text-gray-800">{formatNumber(block.pieces)}</div>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-3">
                    <span className="text-3xl">⭐</span>
                    <div>
                      <div className="text-sm text-gray-600">النقاط</div>
                      <div className="text-xl font-bold text-yellow-600">{formatNumber(block.points)} نقطة</div>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Winning Bid Amount */}
              <div className="mt-6 p-4 bg-gradient-to-r from-green-50/80 to-emerald-50/80 backdrop-blur-sm rounded-xl shadow-lg border border-green-200/50">
                <div className="text-center">
                  <div className="text-sm text-green-700 mb-1">قيمة المزايدة الفائزة</div>
                  <div className="text-3xl font-roboto-mono font-bold text-green-700">
                    {formatMoney(winningBid)}
                  </div>
                </div>
              </div>
            </div>
            
            {/* Action Button */}
            <button
              onClick={handleShowCategories}
              className="w-full py-5 bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-600 hover:to-indigo-700 text-white rounded-2xl font-bold text-2xl shadow-xl transition-all duration-300 transform hover:scale-[1.02] hover:shadow-2xl active:scale-[0.98] animate-pulse"
            >
              <span className="flex items-center justify-center gap-3">
                <span className="text-3xl">❓</span>
                متابعة لاختيار فئة السؤال
              </span>
            </button>
          </div>
        </div>
      </div>
    );
  }
  
  // Category Selection Screen
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-8">
      <div className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-3xl shadow-2xl max-w-5xl w-full max-h-[90vh] p-8 border border-indigo-200/50">
        {/* Animated background elements */}
        <div className="absolute -top-6 -right-6 w-32 h-32 bg-gradient-to-br from-purple-300/20 to-transparent rounded-full blur-xl animate-float"></div>
        <div className="absolute -bottom-6 -left-6 w-36 h-36 bg-gradient-to-tr from-indigo-300/20 to-transparent rounded-full blur-xl animate-float-delayed"></div>
        
        <div className="relative z-10">
          <h3 className="text-3xl font-montserrat font-bold mb-8 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
            اختر فئة السؤال
          </h3>
          
          <div className="grid grid-cols-2 md:grid-cols-5 gap-3 max-h-[60vh] overflow-y-auto p-2">
            {state.availableCategories.map(categoryId => {
              const category = QUESTION_CATEGORIES[categoryId];
              return (
                <button
                  key={categoryId}
                  onClick={() => handleCategorySelect(categoryId)}
                  className={`group relative p-6 rounded-xl border-2 transition-all duration-200 ${category.color} text-white hover:opacity-90 transform hover:scale-110 hover:shadow-xl hover:-translate-y-2 active:scale-100 overflow-hidden`}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="relative z-10 text-5xl mb-3 group-hover:animate-bounce">{category.icon}</div>
                  <div className="relative z-10 text-lg font-montserrat font-semibold">{category.name}</div>
                  {/* Shine effect */}
                  <div className="absolute -inset-full top-0 h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
                </button>
              );
            })}
          </div>
          
          {state.availableCategories.length === 0 && (
            <div className="text-center text-gray-600 mt-4 text-lg">
              جميع الفئات مستخدمة، سيتم إعادة تعيينها
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default BlockDetailsAndCategory;