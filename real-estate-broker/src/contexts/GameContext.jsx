import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { MAPS, calculateBlockPoints } from '../data/arabicMaps.js';
import { QUESTION_CATEGORIES, getQuestionsByCategories, getRandomQuestionFromCategory } from '../data/arabicQuestions.js';

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
  gameTimer: 45 * 60, // 45 minutes in seconds
  difficulty: 'medium',
  powerCards: {
    showOptions: 3, // New power card for showing multiple choice options
    loan: 1,
    deleteOption: 1
  }
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
      const { mapId, teamCount, difficulty, selectedCategories } = action.payload;
      const selectedMap = MAPS[mapId];
      const teams = Array.from({ length: teamCount }, (_, i) => ({
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
        questions
      };
      
    case 'START_AUCTION':
      const availableBlocks = state.blocks.filter(b => !b.owner);
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
      
      const question = getRandomQuestionFromCategory(categoryId, state.usedQuestions);
      
      if (!question) return state;
      
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
      
      if (!isCorrect || !state.currentAuction) {
        return {
          ...state,
          currentAuction: null,
          currentQuestion: null,
          usedQuestions: newUsedQuestions
        };
      }
      
      const updatedBlocks = state.blocks.map(block =>
        block.id === state.currentAuction.block.id
          ? { ...block, owner: answeringTeamId }
          : block
      );
      
      const updatedTeams = state.teams.map(team => {
        if (team.id === answeringTeamId) {
          const newOwnedBlocks = [...team.ownedBlocks, state.currentAuction.block.id];
          const bidAmount = state.currentAuction.currentBid;
          const blockPoints = state.currentAuction.block.points;
          
          // Check for district bonus
          const blocksInDistrict = updatedBlocks.filter(
            b => b.districtId === state.currentAuction.block.districtId && 
                 b.owner === answeringTeamId
          ).length;
          
          const bonusMultiplier = blocksInDistrict >= 3 ? 2 : 1;
          const totalPoints = blockPoints * bonusMultiplier;
          
          return {
            ...team,
            money: team.money - bidAmount,
            score: team.score + totalPoints,
            ownedBlocks: newOwnedBlocks
          };
        }
        return team;
      });
      
      return {
        ...state,
        teams: updatedTeams,
        blocks: updatedBlocks,
        currentAuction: null,
        currentQuestion: null,
        usedQuestions: newUsedQuestions
      };
      
    case 'USE_POWER_CARD':
      const { teamId: cardTeamId, cardType } = action.payload;
      
      const teamsWithCard = state.teams.map(team => {
        if (team.id === cardTeamId && team.powerCards[cardType] > 0) {
          const updatedTeam = {
            ...team,
            powerCards: {
              ...team.powerCards,
              [cardType]: team.powerCards[cardType] - 1
            }
          };
          
          if (cardType === 'loan') {
            updatedTeam.money += 500000;
          }
          
          return updatedTeam;
        }
        return team;
      });
      
      return { ...state, teams: teamsWithCard };
      
    case 'UPDATE_TIMER':
      const newTime = state.gameTimer - 1;
      if (newTime <= 0) {
        return { ...state, gameTimer: 0, gamePhase: 'ended' };
      }
      return { ...state, gameTimer: newTime };
      
    case 'END_GAME':
      return { ...state, gamePhase: 'ended' };
      
    case 'RESET_USED_QUESTIONS':
      localStorage.removeItem('usedQuestions');
      return { ...state, usedQuestions: [] };
      
    default:
      return state;
  }
};

export const GameProvider = ({ children }) => {
  const [state, dispatch] = useReducer(gameReducer, INITIAL_STATE);
  
  useEffect(() => {
    if (state.gamePhase === 'playing' && state.gameTimer > 0) {
      const timer = setInterval(() => {
        dispatch({ type: 'UPDATE_TIMER' });
      }, 1000);
      
      return () => clearInterval(timer);
    }
  }, [state.gamePhase, state.gameTimer]);
  
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