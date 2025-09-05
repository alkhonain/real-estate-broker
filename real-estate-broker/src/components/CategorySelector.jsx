import React from 'react';
import { useGame } from '../contexts/GameContext.jsx';

function CategorySelector({ onCategorySelected }) {
  const { state, dispatch, QUESTION_CATEGORIES } = useGame();
  
  const handleCategorySelect = (categoryId) => {
    dispatch({
      type: 'SELECT_QUESTION_CATEGORY',
      payload: { categoryId }
    });
    onCategorySelected();
  };
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl shadow-2xl p-6 border border-indigo-200/50">
      {/* Animated background elements */}
      <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-br from-purple-300/20 to-transparent rounded-full blur-xl animate-float"></div>
      <div className="absolute -bottom-6 -left-6 w-28 h-28 bg-gradient-to-tr from-indigo-300/20 to-transparent rounded-full blur-xl animate-float-delayed"></div>
      
      <h3 className="relative z-10 text-2xl font-montserrat font-bold mb-6 text-center bg-gradient-to-r from-purple-600 to-indigo-600 bg-clip-text text-transparent">
        اختر فئة السؤال
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {state.availableCategories.map(categoryId => {
          const category = QUESTION_CATEGORIES[categoryId];
          return (
            <button
              key={categoryId}
              onClick={() => handleCategorySelect(categoryId)}
              className={`group relative p-4 rounded-xl border-2 transition-all duration-200 ${category.color} text-white hover:opacity-90 transform hover:scale-110 hover:shadow-xl hover:-translate-y-2 active:scale-100 overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div className="relative z-10 text-4xl mb-2 group-hover:animate-bounce">{category.icon}</div>
              <div className="relative z-10 font-montserrat font-semibold">{category.name}</div>
              {/* Shine effect */}
              <div className="absolute -inset-full top-0 h-full w-1/2 transform -skew-x-12 bg-gradient-to-r from-transparent via-white/20 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-shimmer"></div>
            </button>
          );
        })}
      </div>
      
      {state.availableCategories.length === 0 && (
        <div className="text-center text-gray-600 mt-4">
          جميع الفئات مستخدمة، سيتم إعادة تعيينها
        </div>
      )}
    </div>
  );
}

export default CategorySelector;