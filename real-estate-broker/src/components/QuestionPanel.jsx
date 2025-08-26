import React, { useState, useEffect } from 'react';
import { useGame } from '../contexts/GameContext.jsx';
import { QUESTION_CATEGORIES } from '../data/arabicQuestions.js';

function QuestionPanel({ question, onAnswer, team }) {
  const { dispatch } = useGame();
  const [userAnswer, setUserAnswer] = useState('');
  const [showHint, setShowHint] = useState(false);
  const [showOptions, setShowOptions] = useState(false);
  const [timer, setTimer] = useState(30);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  
  // Generate fake options for the question
  const generateOptions = () => {
    const options = [question.answer];
    const fakeAnswers = [
      'باريس', 'لندن', 'برلين', 'مدريد', 'روما', 'أثينا', 'فيينا', 'براغ',
      '100', '200', '300', '400', '500', '1000', '2000', '5000',
      'الأحمر', 'الأزرق', 'الأخضر', 'الأصفر', 'البرتقالي', 'البنفسجي',
      '2020', '2021', '2022', '2023', '2024', '2025',
      'محمد', 'أحمد', 'علي', 'حسن', 'خالد', 'عبدالله'
    ];
    
    while (options.length < 4) {
      const randomFake = fakeAnswers[Math.floor(Math.random() * fakeAnswers.length)];
      if (!options.includes(randomFake)) {
        options.push(randomFake);
      }
    }
    
    return options.sort(() => Math.random() - 0.5);
  };
  
  const [options] = useState(generateOptions());
  
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer(prev => {
        if (prev <= 1) {
          clearInterval(interval);
          if (!isAnswered) {
            handleSubmit();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    
    return () => clearInterval(interval);
  }, [isAnswered]);
  
  const handleSubmit = () => {
    if (isAnswered) return;
    
    const correct = userAnswer.trim().toLowerCase() === question.answer.toLowerCase();
    setIsCorrect(correct);
    setIsAnswered(true);
    
    setTimeout(() => {
      onAnswer(correct, question.id);
    }, correct ? 1000 : 2000);
  };
  
  const handlePowerCard = (cardType) => {
    if (!team.powerCards[cardType] || team.powerCards[cardType] <= 0) return;
    
    dispatch({
      type: 'USE_POWER_CARD',
      payload: {
        teamId: team.id,
        cardType
      }
    });
    
    if (cardType === 'showOptions') {
      setShowOptions(true);
    }
  };
  
  const categoryInfo = QUESTION_CATEGORIES[question.category];
  
  return (
    <div className="bg-card-bg rounded-lg shadow-lg p-6">
      <div className="flex justify-between items-center mb-4">
        <div>
          <h3 className="text-2xl font-montserrat font-bold">
            سؤال لـ {team.name}
          </h3>
          <div className={`inline-flex items-center gap-2 mt-2 px-3 py-1 rounded-full ${categoryInfo.color} text-white text-sm`}>
            <span>{categoryInfo.icon}</span>
            <span>{categoryInfo.name}</span>
          </div>
        </div>
        <div className={`text-3xl font-roboto-mono font-bold ${
          timer <= 10 ? 'text-error animate-pulse' : 'text-text-dark'
        }`}>
          {timer} ث
        </div>
      </div>
      
      {/* Question */}
      <div className="bg-premium-bg rounded-lg p-4 mb-4">
        <div className="text-xl font-montserrat font-medium">
          {question.question}
        </div>
        
        {showHint && (
          <div className="mt-2 text-sm text-gray-600 italic">
            تلميح: {question.hint}
          </div>
        )}
      </div>
      
      {/* Power Cards */}
      {!isAnswered && (
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => handlePowerCard('showOptions')}
            disabled={team.powerCards.showOptions <= 0 || showOptions}
            className="text-sm px-3 py-1 bg-blue-100 rounded hover:bg-blue-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            إظهار خيارات ({team.powerCards.showOptions})
          </button>
          <button
            onClick={() => setShowHint(true)}
            disabled={showHint}
            className="text-sm px-3 py-1 bg-yellow-100 rounded hover:bg-yellow-200 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            إظهار تلميح
          </button>
        </div>
      )}
      
      {/* Answer Input or Options */}
      {showOptions ? (
        <div className="space-y-2 mb-6">
          {options.map((option, index) => (
            <button
              key={index}
              onClick={() => !isAnswered && setUserAnswer(option)}
              disabled={isAnswered}
              className={`w-full p-3 rounded-lg border-2 transition-all text-right ${
                isAnswered && option === question.answer
                  ? 'bg-success text-white'
                  : isAnswered && option === userAnswer && option !== question.answer
                  ? 'bg-error text-white'
                  : userAnswer === option
                  ? 'bg-property-blue text-white'
                  : 'hover:bg-gray-100'
              }`}
            >
              {String.fromCharCode(65 + index)}. {option}
            </button>
          ))}
        </div>
      ) : (
        <div className="mb-6">
          <input
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSubmit()}
            disabled={isAnswered}
            placeholder="اكتب إجابتك هنا..."
            className="w-full p-3 text-lg border-2 border-gray-300 rounded-lg focus:border-luxury-gold focus:outline-none disabled:opacity-50 text-right"
            dir="rtl"
          />
        </div>
      )}
      
      {/* Submit Button */}
      {!isAnswered && (
        <button
          onClick={handleSubmit}
          disabled={!userAnswer.trim()}
          className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
        >
          تأكيد الإجابة
        </button>
      )}
      
      {/* Result Message */}
      {isAnswered && (
        <div className="text-center">
          <div className={`text-xl font-montserrat font-bold ${
            isCorrect ? 'text-success' : 'text-error'
          }`}>
            {isCorrect ? 'إجابة صحيحة! تم تأمين العقار!' : 'إجابة خاطئة! خسرت العقار!'}
          </div>
          {!isCorrect && (
            <div className="mt-2 text-gray-600">
              الإجابة الصحيحة: {question.answer}
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default QuestionPanel;