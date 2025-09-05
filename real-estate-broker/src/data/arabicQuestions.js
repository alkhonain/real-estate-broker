import questionsData from '../../../tahdani-data-extraction/sho6sho6-data-extraction/output/sho6sho6_extracted_data.json';

// Question Categories loaded from source
export const QUESTION_CATEGORIES = {};

// Load categories from the JSON data
questionsData.categories.forEach(category => {
  QUESTION_CATEGORIES[category.id] = {
    id: category.id,
    name: category.name,
    icon: category.icon,
    color: getCategoryColor(category.id)
  };
});

// Map category IDs to colors
function getCategoryColor(categoryId) {
  const colorMap = {
    history: 'bg-amber-600',
    geography: 'bg-blue-500',
    science: 'bg-green-500',
    sports: 'bg-red-500',
    literature: 'bg-purple-500',
    religion: 'bg-indigo-500',
    general: 'bg-gray-600',
    entertainment: 'bg-pink-500',
    technology: 'bg-cyan-500',
    arabic_culture: 'bg-emerald-600'
  };
  return colorMap[categoryId] || 'bg-gray-500';
}

// Difficulty levels based on block points
export const DIFFICULTY_LEVELS = {
  EASY: 'easy',        // points < 800 (سهل)
  MEDIUM: 'medium',    // 1000 <= points <= 1500 (متوسط)  
  HARD: 'hard'         // 1800 <= points <= 2500 (صعب)
};

// Map Arabic difficulty names to our system
const difficultyMap = {
  'سهل': DIFFICULTY_LEVELS.EASY,
  'متوسط': DIFFICULTY_LEVELS.MEDIUM,
  'صعب': DIFFICULTY_LEVELS.HARD
};

// Get difficulty based on block points
export const getDifficultyByBlockPoints = (blockPoints) => {
  if (blockPoints >= 1800) return DIFFICULTY_LEVELS.HARD;
  if (blockPoints >= 1000) return DIFFICULTY_LEVELS.MEDIUM;
  return DIFFICULTY_LEVELS.EASY;
};

// Questions organized by category and difficulty
export const QUESTIONS = {};

// Initialize empty question arrays for each category and difficulty
Object.keys(QUESTION_CATEGORIES).forEach(category => {
  QUESTIONS[category] = {
    [DIFFICULTY_LEVELS.EASY]: [],
    [DIFFICULTY_LEVELS.MEDIUM]: [],
    [DIFFICULTY_LEVELS.HARD]: []
  };
});

// Load questions from JSON data
questionsData.questions.forEach(q => {
  const mappedDifficulty = difficultyMap[q.difficulty] || DIFFICULTY_LEVELS.MEDIUM;
  
  if (QUESTIONS[q.category_id] && QUESTIONS[q.category_id][mappedDifficulty]) {
    QUESTIONS[q.category_id][mappedDifficulty].push({
      id: q.id,
      categoryId: q.category_id,
      difficulty: mappedDifficulty,
      question: q.question,
      answer: q.answer,
      hint: generateHint(q), // Generate hint based on question/answer
      options: q.options || []
    });
  }
});

// Generate hint for questions that don't have one
function generateHint(question) {
  // Simple hint generation - can be improved
  if (question.answer.length <= 4) {
    return `الإجابة تتكون من ${question.answer.length} أحرف/أرقام`;
  }
  return `يبدأ بحرف "${question.answer.charAt(0)}"`;
}

// Function to get questions by categories
export const getQuestionsByCategories = (categoryIds) => {
  const questions = [];
  categoryIds.forEach(categoryId => {
    Object.values(DIFFICULTY_LEVELS).forEach(difficulty => {
      if (QUESTIONS[categoryId] && QUESTIONS[categoryId][difficulty]) {
        questions.push(...QUESTIONS[categoryId][difficulty]);
      }
    });
  });
  return questions;
};

// Function to get random question from category
export const getRandomQuestionFromCategory = (categoryId, usedQuestionIds = [], difficulty = DIFFICULTY_LEVELS.MEDIUM) => {
  if (!QUESTIONS[categoryId] || !QUESTIONS[categoryId][difficulty]) {
    // Try other difficulties if specified difficulty has no questions
    const difficulties = [difficulty, DIFFICULTY_LEVELS.MEDIUM, DIFFICULTY_LEVELS.EASY, DIFFICULTY_LEVELS.HARD];
    for (const diff of difficulties) {
      if (QUESTIONS[categoryId] && QUESTIONS[categoryId][diff] && QUESTIONS[categoryId][diff].length > 0) {
        const availableQuestions = QUESTIONS[categoryId][diff].filter(
          q => !usedQuestionIds.includes(q.id)
        );
        
        if (availableQuestions.length > 0) {
          const randomIndex = Math.floor(Math.random() * availableQuestions.length);
          return availableQuestions[randomIndex];
        }
      }
    }
    return null;
  }
  
  const availableQuestions = QUESTIONS[categoryId][difficulty].filter(
    q => !usedQuestionIds.includes(q.id)
  );
  
  // If no available questions, reset and use all questions again
  if (availableQuestions.length === 0) {
    const allQuestions = QUESTIONS[categoryId][difficulty];
    if (allQuestions.length > 0) {
      const randomIndex = Math.floor(Math.random() * allQuestions.length);
      return allQuestions[randomIndex];
    }
  }
  
  const randomIndex = Math.floor(Math.random() * availableQuestions.length);
  return availableQuestions[randomIndex];
};