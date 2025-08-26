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
    <div className="bg-card-bg rounded-lg shadow-lg p-6">
      <h3 className="text-2xl font-montserrat font-bold mb-4 text-center">
        اختر فئة السؤال
      </h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {state.availableCategories.map(categoryId => {
          const category = QUESTION_CATEGORIES[categoryId];
          return (
            <button
              key={categoryId}
              onClick={() => handleCategorySelect(categoryId)}
              className={`p-4 rounded-lg border-2 transition-all duration-200 ${category.color} text-white hover:opacity-90 transform hover:scale-105`}
            >
              <div className="text-4xl mb-2">{category.icon}</div>
              <div className="font-montserrat font-semibold">{category.name}</div>
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