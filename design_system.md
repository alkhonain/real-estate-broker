# Real Estate Broker Game - Design System

## Color Palette

### Primary Colors
- **Property Blue:** #2389DA - Used for UI elements, buttons, and player team 1
- **Property Red:** #E44D2E - Used for opposing team, highlights, and auction elements
- **Luxury Gold:** #FFCC33 - Used for premium properties, scores, and special elements
- **Estate Green:** #4CAF50 - Used for successful transactions and third team (if applicable)
- **Realtor Purple:** #9C27B0 - Used for fourth team (if applicable)

### Background Colors
- **Map Background:** #F5EEE6 - Light beige for the map base
- **Game Background:** #D8B192 - Warm wood texture (similar to the Codenames board)
- **Card Background:** #FFFFFF - White for property cards
- **Premium Property:** #FFF8E1 - Subtle gold tint for high-value properties

### UI Colors
- **Text Dark:** #333333 - Primary text color
- **Text Light:** #FFFFFF - Text on dark backgrounds
- **Accent:** #FF5722 - For important actions or highlights
- **Success:** #4CAF50 - For successful transactions
- **Warning:** #FFC107 - For alerts and time warnings
- **Error:** #F44336 - For errors and failed actions

## Typography

### Fonts
- **Primary Font:** 'Montserrat' - For headings, scores, and important text
- **Secondary Font:** 'Roboto' - For body text, descriptions, and UI elements
- **Numeric Font:** 'Roboto Mono' - For prices, scores, and other numeric values

### Text Styles
- **Game Title:** Montserrat Bold, 32px+
- **Section Headers:** Montserrat Bold, 24px
- **Button Text:** Montserrat Medium, 16px
- **Property Names:** Montserrat SemiBold, 18px
- **Property Descriptions:** Roboto Regular, 14px
- **Prices/Scores:** Roboto Mono Medium, 18px
- **Timer:** Roboto Mono Bold, 24px

## UI Components

### Buttons
- **Primary Button:** Rounded rectangle with gold accent, dark text
- **Secondary Button:** Outlined rounded rectangle, team color
- **Action Button:** Circular button for quick actions (bidding, using cards)

### Cards
- **Property Card:** Rectangular card with property name, district, value, and image
- **District Card:** Larger card showing district overview and available blocks
- **Special Card:** Special action cards (Replace Question, Loan, Delete Option)

### Game Board Elements
- **Map:** City map divided into districts with color-coded sections
- **Property Grid:** Grid of property cards organized by district
- **Score Panel:** Team scores, money, and owned properties
- **Timer:** Countdown for bidding and question answering
- **Auction Panel:** Current bid, bidding teams, and bid amount

### Navigation
- **Tab Bar:** For switching between map view, properties view, and scores
- **Menu:** Game settings, rules, and player information

## Layout

### Main Views
1. **Lobby/Team Selection:**
   - Similar to the Codenames team selection UI
   - 2-4 team panels with join buttons
   - Game setup options

2. **Game Board:**
   - Map central to the screen
   - Team panels on left and right sides
   - Current auction/question panel at bottom

3. **Property View:**
   - Grid layout of property cards
   - Filterable by district
   - Owned properties highlighted by team colors

4. **Auction Screen:**
   - Property details
   - Bidding interface
   - Team bidding amounts
   - Countdown timer

## Iconography

### Game Icons
- **Money Icon:** Stylized coin or dollar symbol
- **District Icon:** Building or neighborhood symbol
- **Block Icon:** Land plot or street symbol
- **Question Icon:** For challenges
- **Auction Icon:** Gavel or bidding symbol
- **Special Card Icons:** Unique icons for each special card type

## Animation & Interaction

### Animations
- **Property Acquisition:** Color transition when a property is acquired
- **Bidding:** Dynamic number updates during auction
- **Timer:** Animated countdown for urgency
- **District Completion:** Special animation when a team completes a district
- **Score Update:** Animated score changes

### Sound Design
- **Background Music:** Light real estate/business-themed music
- **UI Sounds:** Clicks, selections, and confirmations
- **Game Events:** Property acquisition, auction start/end, district completion
- **Timer:** Ticking sound for last 10 seconds

## Responsive Considerations
- **Desktop:** Full map view with all information visible
- **Tablet:** Focused view with tabbed navigation for different sections
- **Mobile:** Simplified UI with bottom navigation and modals for detailed information

## Accessibility
- **Color Contrast:** Ensure all text meets WCAG AA standards
- **Text Size:** Adjustable text size option
- **Color Blind Mode:** Alternative color scheme for color-blind users
- **Screen Reader Support:** Proper labeling for all interactive elements 