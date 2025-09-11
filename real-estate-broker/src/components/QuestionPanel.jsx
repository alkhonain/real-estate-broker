import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import { QUESTION_CATEGORIES } from '../data/arabicQuestions.js';
import { formatNumber } from '../utils/formatters.js';

function QuestionPanel({ question, onAnswer, team }) {
  const { dispatch } = useGame();
  const [showAnswer, setShowAnswer] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [timer, setTimer] = useState(60);
  const [selectedOption, setSelectedOption] = useState('');
  
  // Generate fake options for the question
  const generateOptions = () => {
    // If the question has predefined options, use them
    if (question.options && question.options.length >= 4) {
      // Fisher-Yates shuffle for more stable randomization
      const shuffled = [...question.options];
      for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
      }
      return shuffled;
    }
    
    const options = [question.answer];
    const categoryFakeAnswers = {
      geography: ['باريس', 'لندن', 'برلين', 'مدريد', 'روما', 'أثينا', 'موسكو', 'واشنطن'],
      history: ['1920', '1935', '1940', '1945', '1950', '1960', '1970', '1980'],
      science: ['الهيدروجين', 'الأكسجين', 'النيتروجين', 'الكربون', 'الحديد', 'النحاس'],
      sports: ['10', '12', '9', '7', '6', '8', '15', '20'],
      culture: ['شكسبير', 'دانتي', 'هوميروس', 'المتنبي', 'أبو تمام', 'جرير'],
      religion: ['3', '4', '6', '7', '8', '10', '12', '15'],
      technology: ['2010', '2005', '2008', '2012', '2015', '2018', '2020', '2022'],
      arabic: ['فعل', 'اسم', 'حرف', 'ظرف', 'أداة', 'ضمير', 'صفة', 'مصدر'],
      math: ['100', '200', '250', '150', '75', '125', '175', '225'],
      saudi: ['جدة', 'مكة', 'المدينة', 'الدمام', 'الخبر', 'تبوك', 'أبها', 'الطائف']
    };
    
    const fakeAnswers = categoryFakeAnswers[question.categoryId] || 
      ['إجابة 1', 'إجابة 2', 'إجابة 3', 'إجابة 4', 'إجابة 5'];
    
    while (options.length < 4) {
      const randomFake = fakeAnswers[Math.floor(Math.random() * fakeAnswers.length)];
      if (!options.includes(randomFake)) {
        options.push(randomFake);
      }
    }
    
    // Fisher-Yates shuffle for more stable randomization
    const shuffled = [...options];
    for (let i = shuffled.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
  };
  
  const [options] = useState(() => generateOptions());
  
  useEffect(() => {
    if (!showAnswer) {
      const interval = setInterval(() => {
        setTimer(prev => {
          if (prev <= 1) {
            clearInterval(interval);
            // Don't auto-show answer anymore
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [showAnswer]);
  
  const handleShowAnswer = () => {
    setShowAnswer(true);
  };
  
  const handleAnswerResult = (isCorrect) => {
    onAnswer(isCorrect, question.id);
  };
  
  const handleShowOptions = () => {
    if (!team.powerCards.showOptions || team.powerCards.showOptions <= 0) return;
    
    dispatch({
      type: 'USE_POWER_CARD',
      payload: {
        teamId: team.id,
        cardType: 'showOptions'
      }
    });
    
    setShowOptions(true);
    // Add 20 seconds when showing options
    setTimer(prev => prev + 20);
  };
  
  
  const categoryInfo = QUESTION_CATEGORIES[question.categoryId];
  
  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-white via-purple-50 to-indigo-100 rounded-3xl shadow-2xl p-8 border border-purple-200/50">
      {/* Animated background elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-100/20 via-transparent to-indigo-100/20 pointer-events-none"></div>
      <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-purple-300/20 to-transparent rounded-full blur-xl animate-pulse"></div>
      <div className="absolute bottom-0 right-0 w-32 h-32 bg-gradient-to-tr from-indigo-300/20 to-transparent rounded-full blur-xl animate-pulse delay-700"></div>
      <div className="absolute -top-6 -left-6 w-24 h-24 bg-yellow-300/20 rounded-full blur-2xl animate-float"></div>
      
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div>
          <h3 className="text-3xl font-montserrat font-bold text-gray-800 mb-2">
            سؤال لـ {team.name} {team.icon}
          </h3>
          <div className={`inline-flex items-center gap-2 px-4 py-2 rounded-full ${categoryInfo.color} text-white text-sm font-medium shadow-md`}>
            <span className="text-xl">{categoryInfo.icon}</span>
            <span>{categoryInfo.name}</span>
          </div>
        </div>
        <div className={`text-5xl font-roboto-mono font-bold ${
          timer <= 10 ? 'text-red-500 animate-pulse' : 'text-gray-700'
        }`}>
          {formatNumber(timer)}
        </div>
      </div>
      
      {/* Question */}
      <div className="bg-gradient-to-r from-luxury-gold to-yellow-400 rounded-xl p-6 mb-6 shadow-lg">
        <div className="text-2xl font-montserrat font-medium text-gray-900">
          {question.question}
        </div>
      </div>
      
      {/* If answer not shown yet */}
      {!showAnswer && timer > 0 && (
        <>
          {/* Power Cards */}
          <div className="flex gap-4 mb-6 justify-center">
            <button
              onClick={handleShowOptions}
              disabled={team.powerCards.showOptions <= 0 || showOptions}
              className={`
                px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center gap-2
                ${team.powerCards.showOptions > 0 && !showOptions
                  ? 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-lg transform hover:scale-105'
                  : 'bg-gray-200 text-gray-500 cursor-not-allowed opacity-50'
                }
              `}
            >
              <span className="text-xl">🎯</span>
              <span>إظهار خيارات ({formatNumber(team.powerCards.showOptions)})</span>
            </button>
          </div>
          
          {/* Options if power card used */}
          {showOptions && (
            <div className="space-y-3 mb-6">
              <div className="text-lg font-medium text-gray-700 text-center mb-4">اختر الإجابة:</div>
              <div className="grid grid-cols-2 gap-4">
                {options.map((option, index) => (
                  <button
                    key={`${question.id}-option-${index}`}
                    onClick={() => {
                      setSelectedOption(option);
                      // Auto-check answer when multiple choice option is selected
                      setShowAnswer(true);
                    }}
                    className={`
                      p-4 rounded-lg border-2 transition-all duration-200 text-right font-medium
                      ${selectedOption === option
                        ? 'bg-gradient-to-r from-property-blue to-blue-600 text-white border-property-blue shadow-lg transform scale-105'
                        : 'bg-white border-gray-300 hover:border-property-blue hover:shadow-md'
                      }
                    `}
                  >
                    <span className="inline-block w-8 h-8 rounded-full bg-gray-200 text-gray-700 text-center leading-8 ml-2">
                      {String.fromCharCode(1571 + index)}
                    </span>
                    {option}
                  </button>
                ))}
              </div>
            </div>
          )}
          
          {/* Show Answer Button */}
          <button
            onClick={handleShowAnswer}
            className="w-full py-4 bg-gradient-to-r from-accent to-red-600 text-white font-bold text-xl rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transform transition-all duration-200 hover:scale-105"
          >
            إظهار الإجابة
          </button>
        </>
      )}
      
      {/* Show answer button when timer ends */}
      {!showAnswer && timer === 0 && (
        <div className="text-center">
          <div className="text-2xl font-bold text-red-600 mb-4">انتهى الوقت!</div>
          <button
            onClick={handleShowAnswer}
            className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white font-bold text-xl rounded-lg shadow-lg hover:from-red-600 hover:to-red-700 transform transition-all duration-200 hover:scale-105 animate-pulse"
          >
            عرض الإجابة
          </button>
        </div>
      )}
      
      {/* If answer is shown */}
      {showAnswer && (
        <div className="space-y-6">
          {/* Correct Answer Display */}
          <div className="bg-gradient-to-r from-green-50 to-green-100 rounded-xl p-6 border-2 border-green-400 shadow-lg">
            <div className="text-lg font-medium text-gray-700 mb-2">الإجابة الصحيحة:</div>
            <div className="text-3xl font-montserrat font-bold text-green-700">
              {question.answer}
            </div>
          </div>
          
          {/* Player's Selected Option (if they used the power card) */}
          {showOptions && selectedOption && (
            <div className={`rounded-lg p-4 text-center ${selectedOption === question.answer ? 'bg-green-100 border-2 border-green-400' : 'bg-red-100 border-2 border-red-400'}`}>
              <span className="text-gray-600">اختار الفريق: </span>
              <span className="font-bold text-lg">{selectedOption}</span>
              <span className="ml-2 text-2xl">
                {selectedOption === question.answer ? '✓' : '✗'}
              </span>
            </div>
          )}
          
          {/* Manual Decision Buttons - or Auto Result if Multiple Choice Used */}
          {(!showOptions || !selectedOption) ? (
            <div className="bg-white rounded-xl p-6 shadow-lg">
              <div className="text-xl font-medium mb-4 text-center text-gray-800">
                هل كانت الإجابة صحيحة؟
              </div>
              <div className="grid grid-cols-2 gap-6">
                <button
                  onClick={() => handleAnswerResult(true)}
                  className="px-8 py-4 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-lg hover:from-green-600 hover:to-green-700 transition-all duration-200 text-xl font-bold shadow-lg transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">✓</span>
                  <span>إجابة صحيحة</span>
                </button>
                <button
                  onClick={() => handleAnswerResult(false)}
                  className="px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-lg hover:from-red-600 hover:to-red-700 transition-all duration-200 text-xl font-bold shadow-lg transform hover:scale-105 flex items-center justify-center gap-3"
                >
                  <span className="text-2xl">✗</span>
                  <span>إجابة خاطئة</span>
                </button>
              </div>
            </div>
          ) : (
            <div className="text-center">
              <button
                onClick={() => handleAnswerResult(selectedOption === question.answer)}
                className={`px-8 py-4 text-white rounded-lg transition-all duration-200 text-xl font-bold shadow-lg transform hover:scale-105 ${
                  selectedOption === question.answer 
                    ? 'bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700'
                    : 'bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700'
                }`}
              >
                متابعة
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionPanel;