import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { MAPS, calculateBlockPoints } from '../data/arabicMaps.js';
import { QUESTION_CATEGORIES, getQuestionsByCategories, getRandomQuestionFromCategory, getDifficultyByBlockPoints } from '../data/arabicQuestions.js';

const GameContext = createContext();

const INITIAL_STATE = {
  gamePhase: 'setup', // setup, playing, ended
  selectedMap: null,
  teams: [],
  currentTeamIndex: 0,
  blocks: [],
  currentAuction: null,
  selectedCategories: [],
  availableCategories: [],
  usedCategoriesInRound: [],
  questions: [],
  usedQuestions: JSON.parse(localStorage.getItem('usedQuestions') || '[]'),
  difficulty: 'medium',
  powerCards: {
    showOptions: 3, // Show multiple choice options (3 times)
    showHint: 2 // Show hint (2 times)
  },
  blockedBlocks: [] // Blocks that were not answered correctly
};

const TEAM_COLORS = [
  { name: 'الفريق الأزرق', color: 'property-blue', bgColor: 'bg-property-blue' },
  { name: 'الفريق الأحمر', color: 'property-red', bgColor: 'bg-property-red' },
  { name: 'الفريق الأخضر', color: 'estate-green', bgColor: 'bg-estate-green' },
  { name: 'الفريق البنفسجي', color: 'realtor-purple', bgColor: 'bg-realtor-purple' }
];

const gameReducer = (state, action) => {
  switch (action.type) {
    case 'SETUP_GAME':
      const { mapId, teamCount, difficulty, selectedCategories, customTeams } = action.payload;
      const selectedMap = MAPS[mapId];
      
      // Use custom teams if provided, otherwise use defaults
      const teams = customTeams ? customTeams.map((team, i) => ({
        id: team.id || `team-${i + 1}`,
        name: team.name,
        color: team.color,
        bgColor: team.bgColor,
        hex: team.hex,
        icon: team.icon,
        money: 10000000, // 10 million
        score: 0,
        ownedBlocks: [],
        powerCards: { ...INITIAL_STATE.powerCards }
      })) : Array.from({ length: teamCount }, (_, i) => ({
        id: `team-${i + 1}`,
        name: TEAM_COLORS[i].name,
        color: TEAM_COLORS[i].color,
        bgColor: TEAM_COLORS[i].bgColor,
        money: 10000000, // 10 million
        score: 0,
        ownedBlocks: [],
        powerCards: { ...INITIAL_STATE.powerCards }
      }));
      
      const blocks = selectedMap.districts.flatMap(district =>
        district.blocks.map(block => ({
          ...block,
          districtId: district.id,
          districtName: district.name,
          owner: null,
          points: calculateBlockPoints(block.pieces)
        }))
      );
      
      const questions = getQuestionsByCategories(selectedCategories);
      
      return {
        ...state,
        gamePhase: 'playing',
        selectedMap,
        teams,
        blocks,
        difficulty,
        selectedCategories,
        availableCategories: [...selectedCategories],
        usedCategoriesInRound: [],
        questions,
        blockedBlocks: []
      };
      
    case 'START_AUCTION':
      const availableBlocks = state.blocks.filter(b => !b.owner && !state.blockedBlocks.includes(b.id));
      if (availableBlocks.length === 0) {
        return { ...state, gamePhase: 'ended' };
      }
      
      const randomBlock = availableBlocks[Math.floor(Math.random() * availableBlocks.length)];
      
      // Reset categories when all have been used
      let availableCategories = state.availableCategories;
      if (availableCategories.length === 0) {
        availableCategories = [...state.selectedCategories];
      }
      
      return {
        ...state,
        currentAuction: {
          block: randomBlock,
          currentBid: 0,
          currentBidder: null,
          bids: {}
        },
        availableCategories,
        usedCategoriesInRound: []
      };
      
    case 'PLACE_BID':
      const { teamId, amount } = action.payload;
      const team = state.teams.find(t => t.id === teamId);
      
      if (team.money < amount) return state;
      
      return {
        ...state,
        currentAuction: {
          ...state.currentAuction,
          currentBid: amount,
          currentBidder: teamId,
          bids: {
            ...state.currentAuction.bids,
            [teamId]: amount
          }
        }
      };
      
    case 'SELECT_QUESTION_CATEGORY':
      const { categoryId } = action.payload;
      
      // Get the difficulty based on the current block's points
      const currentBlockPoints = state.currentAuction?.block?.points || 1000;
      const questionDifficulty = getDifficultyByBlockPoints(currentBlockPoints);
      
      const question = getRandomQuestionFromCategory(categoryId, state.usedQuestions, questionDifficulty);
      
      if (!question) {
        // Check if we have questions in other available categories
        let hasQuestionsInAnyCategory = false;
        for (const catId of state.availableCategories) {
          if (catId !== categoryId) {
            const testQuestion = getRandomQuestionFromCategory(catId, state.usedQuestions, questionDifficulty);
            if (testQuestion) {
              hasQuestionsInAnyCategory = true;
              break;
            }
          }
        }
        
        if (!hasQuestionsInAnyCategory) {
          // Reset all used questions if no questions available in any category
          localStorage.removeItem('usedQuestions');
          const resetQuestion = getRandomQuestionFromCategory(categoryId, [], questionDifficulty);
          if (resetQuestion) {
            return {
              ...state,
              currentQuestion: resetQuestion,
              availableCategories: state.availableCategories.filter(c => c !== categoryId),
              usedCategoriesInRound: [...state.usedCategoriesInRound, categoryId],
              usedQuestions: []
            };
          }
        }
        
        // Remove the category that has no questions
        return {
          ...state,
          availableCategories: state.availableCategories.filter(c => c !== categoryId)
        };
      }
      
      // Remove the selected category from available categories
      const newAvailableCategories = state.availableCategories.filter(c => c !== categoryId);
      
      return {
        ...state,
        currentQuestion: question,
        availableCategories: newAvailableCategories,
        usedCategoriesInRound: [...state.usedCategoriesInRound, categoryId]
      };
      
    case 'ANSWER_QUESTION':
      const { isCorrect, teamId: answeringTeamId, questionId } = action.payload;
      
      // Save used question to localStorage
      const newUsedQuestions = [...state.usedQuestions, questionId];
      localStorage.setItem('usedQuestions', JSON.stringify(newUsedQuestions));
      
      // Get bidding team and amount
      const biddingTeam = state.teams.find(t => t.id === answeringTeamId);
      const bidAmount = state.currentAuction?.currentBid || 0;
      
      let updatedBlocks = state.blocks;
      let updatedTeams = state.teams;
      
      if (isCorrect && state.currentAuction) {
        // Update block ownership only if answer is correct
        updatedBlocks = state.blocks.map(block =>
          block.id === state.currentAuction.block.id
            ? { ...block, owner: answeringTeamId }
            : block
        );
        
        // Update teams - deduct money and add points if correct
        updatedTeams = state.teams.map(team => {
          if (team.id === answeringTeamId) {
            const newOwnedBlocks = [...team.ownedBlocks, state.currentAuction.block.id];
            
            return {
              ...team,
              money: team.money - bidAmount, // Deduct money
              ownedBlocks: newOwnedBlocks
            };
          }
          return team;
        });
        
        // Recalculate all teams' scores with new scoring system
        updatedTeams = updatedTeams.map(team => {
          let totalScore = 0;
          
          // Calculate points for each district
          state.selectedMap.districts.forEach(district => {
            const teamBlocksInDistrict = updatedBlocks.filter(
              b => b.districtId === district.id && b.owner === team.id
            );
            
            if (teamBlocksInDistrict.length > 0) {
              const districtPoints = teamBlocksInDistrict.reduce((sum, block) => sum + block.points, 0);
              
              // Double points if team owns entire district (all blocks)
              const ownsEntireDistrict = teamBlocksInDistrict.length === district.blocks.length;
              totalScore += ownsEntireDistrict ? districtPoints * 2 : districtPoints;
            }
          });
          
          // Check if team has at least one property in each district
          const districtsWithProperty = state.selectedMap.districts.filter(district =>
            updatedBlocks.some(b => b.districtId === district.id && b.owner === team.id)
          ).length;
          
          const hasPropertyInAllDistricts = districtsWithProperty === state.selectedMap.districts.length;
          
          // Apply 10% bonus if team has property in all districts
          if (hasPropertyInAllDistricts) {
            totalScore = Math.floor(totalScore * 1.1);
          }
          
          return {
            ...team,
            score: totalScore
          };
        });
      } else {
        // If answer is incorrect, only deduct money, no property or points
        updatedTeams = state.teams.map(team => {
          if (team.id === answeringTeamId) {
            return {
              ...team,
              money: team.money - bidAmount // Deduct money even for wrong answer
            };
          }
          return team;
        });
      }
      
      // Add the block to blockedBlocks if answer was wrong
      const newBlockedBlocks = !isCorrect && state.currentAuction?.block?.id 
        ? [...state.blockedBlocks, state.currentAuction.block.id]
        : state.blockedBlocks;
      
      return {
        ...state,
        teams: updatedTeams,
        blocks: updatedBlocks,
        currentAuction: null,
        currentQuestion: null,
        usedQuestions: newUsedQuestions,
        blockedBlocks: newBlockedBlocks
      };
      
    case 'USE_POWER_CARD':
      const { teamId: cardTeamId, cardType } = action.payload;
      
      const teamsWithCard = state.teams.map(team => {
        if (team.id === cardTeamId && team.powerCards[cardType] > 0) {
          return {
            ...team,
            powerCards: {
              ...team.powerCards,
              [cardType]: team.powerCards[cardType] - 1
            }
          };
        }
        return team;
      });
      
      return { ...state, teams: teamsWithCard };
      
      
    case 'END_GAME':
      return { ...state, gamePhase: 'ended' };
      
    case 'RESET_USED_QUESTIONS':
      localStorage.removeItem('usedQuestions');
      return { ...state, usedQuestions: [] };
      
    case 'RESTART_GAME':
      return {
        ...INITIAL_STATE,
        usedQuestions: state.usedQuestions // Keep used questions unless explicitly reset
      };
      
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  
  
  const value = {
    state,
    dispatch,
    QUESTION_CATEGORIES
  };
  
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};