# Product Requirements Document: Real Estate Broker Game

## 1. Executive Summary
Real Estate Broker is an interactive educational board game designed for 2-4 teams. Players compete to acquire real estate blocks through auctions and trivia questions, managing resources strategically to maximize their score.

## 2. Game Overview

### 2.1 Core Concept
- **Genre**: Educational Strategy Board Game
- **Players**: 2-4 teams
- **Duration**: Approximately 45 minutes
- **Platform**: Web-based offline application
- **Target Audience**: Educational institutions, corporate training, family entertainment

### 2.2 Objectives
- Acquire valuable real estate blocks through strategic bidding
- Answer trivia questions correctly to secure properties
- Manage resources effectively with a limited budget
- Score the highest points to win the game

## 3. Game Mechanics

### 3.1 Map System
- **Available Cities**: Riyadh, Doha, Amman
- **Districts per Map**: Maximum 5
- **Blocks per District**: Maximum 5
- **Pieces per Block**: 6-24 pieces
- **Points System**: Based on the number of pieces in each block

### 3.2 Team Setup
- **Number of Teams**: 2-4
- **Starting Budget**: 10 million per team
- **Team Colors**: Distinct colors for each team

### 3.3 Auction System
- **Initial Block Selection**: Random
- **Minimum Bid Increment**: 50,000
- **Auction Flow**:
  1. Random block is selected for auction
  2. Teams bid in increments of 50K
  3. Highest bidder gets a trivia question
  4. Correct answer within 30 seconds = block acquisition
  5. Block is colored with team's color
  6. Team score increases based on block value

### 3.4 Power Cards
Each team receives 3 power cards (single-use):
1. **Replace Question**: Get a different question
2. **Loan**: Receive 500K additional funds
3. **Delete Option**: Remove one incorrect answer from multiple choice

### 3.5 Scoring System
- **Base Points**: Based on block's piece count
- **District Bonus**: Score doubles for owning 3 blocks in the same district
- **Victory Condition**: Team with highest score wins (not based on money or land count)

## 4. Game Flow

### 4.1 Pre-Game Setup
1. Game master selects city map
2. Game master creates teams (2-4)
3. Question difficulty level selection
4. Game configuration confirmation

### 4.2 Main Game Loop
1. Random block selection for auction
2. Bidding phase
3. Question phase for winning bidder
4. Block assignment and scoring
5. Repeat until game end conditions met

### 4.3 End Game
- Game ends after 45 minutes OR when all blocks are sold
- Final scores calculated
- Winner announced

## 5. Technical Requirements

### 5.1 Application Type
- Single-page web application
- Offline functionality (no database required)
- Single screen controlled by game master

### 5.2 Core Features
- **Configuration Screen**: Team setup, map selection, difficulty setting
- **Game Board**: Visual representation of city map with districts and blocks
- **Auction Interface**: Real-time bidding display
- **Question System**: Timer, multiple choice display, answer validation
- **Score Dashboard**: Live team scores and owned properties
- **Power Card Management**: Visual indicators for available/used cards

### 5.3 Question Bank
- JSON format structure:
```json
{
  "question1": {
    "title": "Question Title",
    "question": "The actual question text",
    "options": ["Option A", "Option B", "Option C", "Option D"],
    "hint": "Optional hint text",
    "correctAnswer": "Option A",
    "difficulty": "easy/medium/hard"
  }
}
```

### 5.4 User Interface Requirements
- Game master controls all actions
- Large, clear display suitable for projection
- Intuitive controls for quick game management
- Visual feedback for all actions
- Timer display for questions
- Live score tracking

## 6. Design Requirements
- Follow provided design system (@design_system)
- Clean, modern interface
- High contrast for visibility
- Responsive layout for different screen sizes
- Smooth animations for game events
- Color-coded team identification

## 7. Technology Recommendations
- **Frontend Framework**: React or Vue.js for reactive UI
- **Styling**: Tailwind CSS or styled-components
- **State Management**: Context API or Vuex
- **Build Tool**: Vite for fast development
- **Graphics**: SVG for map rendering
- **Storage**: LocalStorage for game state persistence

## 8. MVP Features
1. Basic game setup with 2 teams
2. One city map (Riyadh)
3. Auction and question system
4. Basic scoring without bonuses
5. Simple UI without animations

## 9. Future Enhancements
- Additional city maps
- Advanced scoring bonuses
- Game statistics and history
- Sound effects and music
- Tournament mode
- Custom question categories