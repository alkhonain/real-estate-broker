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
    showOptions: 3 // Show multiple choice options (3 times)
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
  try {
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
          districtId: block.districtId || district.id,
          districtName: block.name || district.name,
          areaId: block.areaId,
          areaName: block.areaName,
          owner: null,
          points: block.points || calculateBlockPoints(block.pieces)
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
      console.log('ANSWER_QUESTION - Starting with state:', {
        hasBlocks: !!state.blocks,
        blocksLength: state.blocks?.length,
        hasTeams: !!state.teams,
        teamsLength: state.teams?.length,
        isCorrect: action.payload.isCorrect
      });
      
      const { isCorrect, teamId: answeringTeamId, questionId } = action.payload;
      
      // Ensure we have valid state before proceeding
      if (!state || !state.blocks || !state.teams) {
        console.error('ANSWER_QUESTION - Invalid state:', state);
        return state;
      }
      
      // Save used question to localStorage
      const newUsedQuestions = [...state.usedQuestions, questionId];
      localStorage.setItem('usedQuestions', JSON.stringify(newUsedQuestions));
      
      // Get bidding team and amount
      const biddingTeam = state.teams.find(t => t.id === answeringTeamId);
      const bidAmount = state.currentAuction?.currentBid || 0;
      
      // Create a completely new state object to avoid mutations
      let newState = {
        ...state,
        blocks: [...state.blocks], // Deep copy blocks array
        teams: [...state.teams], // Deep copy teams array
        blockedBlocks: [...state.blockedBlocks], // Deep copy blocked blocks
        usedQuestions: newUsedQuestions,
        currentAuction: null,
        currentQuestion: null,
        currentTeamIndex: (state.currentTeamIndex + 1) % state.teams.length
      };
      
      if (isCorrect && state.currentAuction) {
        console.log('ANSWER_QUESTION - Processing correct answer');
        
        // Update block ownership
        newState.blocks = newState.blocks.map(block => {
          if (block.id === state.currentAuction.block.id) {
            return { ...block, owner: answeringTeamId };
          }
          return { ...block }; // Return a copy of each block
        });
        
        // Update teams - deduct money and add the block
        newState.teams = newState.teams.map(team => {
          const teamCopy = { ...team };
          
          if (team.id === answeringTeamId) {
            teamCopy.money = team.money - bidAmount;
            teamCopy.ownedBlocks = [...team.ownedBlocks, state.currentAuction.block.id];
          }
          
          // Recalculate score for all teams
          let totalScore = 0;
          const teamOwnedBlocks = newState.blocks.filter(b => b.owner === teamCopy.id);
          totalScore = teamOwnedBlocks.reduce((sum, block) => sum + (block.points || 0), 0);
          
          // Check for complete area bonuses
          const areas = {};
          teamOwnedBlocks.forEach(block => {
            if (block.areaId) {
              if (!areas[block.areaId]) {
                areas[block.areaId] = {
                  owned: 0,
                  total: 0,
                  points: 0
                };
              }
              areas[block.areaId].owned++;
              areas[block.areaId].points += (block.points || 0);
            }
          });
          
          // Count total districts in each area
          newState.blocks.forEach(block => {
            if (block.areaId && areas[block.areaId]) {
              areas[block.areaId].total++;
            }
          });
          
          // Apply 2x bonus for owning all districts in an area
          Object.values(areas).forEach(area => {
            if (area.owned === area.total && area.total > 0) {
              totalScore += area.points; // Add the same points again to double them
            }
          });
          
          // Check if team has at least one property in each area
          const allAreas = new Set(newState.blocks.filter(b => b.areaId).map(b => b.areaId));
          const areasWithProperty = Object.keys(areas).length;
          
          // Apply 10% bonus if team has property in all areas
          if (areasWithProperty === allAreas.size && allAreas.size > 0) {
            totalScore = Math.floor(totalScore * 1.1);
          }
          
          teamCopy.score = totalScore;
          return teamCopy;
        });
      } else {
        console.log('ANSWER_QUESTION - Processing incorrect answer');
        
        // If answer is incorrect, only deduct money
        newState.teams = newState.teams.map(team => {
          if (team.id === answeringTeamId) {
            return {
              ...team,
              money: team.money - bidAmount
            };
          }
          return { ...team };
        });
        
        // Add the block to blockedBlocks if answer was wrong
        if (state.currentAuction?.block?.id) {
          newState.blockedBlocks = [...newState.blockedBlocks, state.currentAuction.block.id];
        }
      }
      
      console.log('ANSWER_QUESTION - Final newState:', {
        hasBlocks: !!newState.blocks,
        blocksLength: newState.blocks?.length,
        hasTeams: !!newState.teams,
        teamsLength: newState.teams?.length,
        firstBlock: newState.blocks?.[0],
        firstTeam: newState.teams?.[0]
      });
      
      return newState;
      
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
  } catch (error) {
    console.error('Error in gameReducer:', action.type, error);
    return state; // Return current state on error
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  
  // Log state changes
  useEffect(() => {
    console.log('GameProvider - State updated:', {
      hasState: !!state,
      hasBlocks: !!state?.blocks,
      blocksLength: state?.blocks?.length,
      hasTeams: !!state?.teams,
      teamsLength: state?.teams?.length,
      gamePhase: state?.gamePhase
    });
  }, [state]);
  
  // Wrap dispatch to log actions
  const wrappedDispatch = (action) => {
    console.log('GameProvider - Dispatching action:', action.type);
    return dispatch(action);
  };
  
  // Ensure state always has required properties
  const safeState = state ? {
    ...state,
    blocks: Array.isArray(state.blocks) ? state.blocks : [],
    teams: Array.isArray(state.teams) ? state.teams : [],
    blockedBlocks: Array.isArray(state.blockedBlocks) ? state.blockedBlocks : [],
    gamePhase: state.gamePhase || 'setup',
    selectedMap: state.selectedMap || null,
    currentAuction: state.currentAuction || null,
    currentQuestion: state.currentQuestion || null,
    currentTeamIndex: state.currentTeamIndex || 0,
    selectedCategories: state.selectedCategories || [],
    availableCategories: state.availableCategories || [],
    usedCategoriesInRound: state.usedCategoriesInRound || [],
    questions: state.questions || [],
    usedQuestions: state.usedQuestions || [],
    difficulty: state.difficulty || 'medium',
    powerCards: state.powerCards || INITIAL_STATE.powerCards
  } : INITIAL_STATE;
  
  const value = {
    state: safeState,
    dispatch: wrappedDispatch,
    QUESTION_CATEGORIES
  };
  
  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  
  // Ensure we always return a valid state
  return {
    ...context,
    state: context.state || {
      blocks: [],
      teams: [],
      gamePhase: 'setup',
      blockedBlocks: []
    }
  };
};