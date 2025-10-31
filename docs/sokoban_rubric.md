# CLI Sokoban Game - Implementation Rubric

## Priority 1: Critical (Must Have) - 35-40 minutes

### 1. Game State & Grid Representation (Priority: 10/10)
- Parse level from text format (walls `#`, player `@`, boxes `$`, goals `.`, box on goal `*`)
- Maintain grid as 2D data structure with proper TypeScript types
- Track player position, box positions, and goal positions separately
- Render current state to terminal with clear ASCII symbols
- **Why critical:** Core data structures are foundation for everything; tests TypeScript typing skills

### 2. Movement System & Validation (Priority: 10/10)
- Accept directional input (w/a/s/d or arrow keys)
- Validate moves: can't walk through walls
- Basic player movement updates grid state
- Prevent moving into boxes (for now - pushing comes next)
- **Why critical:** Game loop fundamentals; shows state management and input handling

### 3. Box Pushing Logic (Priority: 9/10)
- Push box when player moves into it (if space behind is empty)
- Update both player AND box positions atomically
- Can't push box into wall or another box
- Can't push two boxes simultaneously
- **Why critical:** This IS Sokoban - the core mechanic that tests complex grid reasoning

### 4. Win Condition Detection (Priority: 8/10)
- Check if all boxes are on goal positions
- Display victory message
- Option to restart or quit
- **Why critical:** Shows algorithmic thinking and state comparison logic

## Priority 2: Important (Should Have) - 15-20 minutes

### 5. Command Line Interface & Game Loop (Priority: 7/10)
- `node game.js --level levels/level1.txt`
- Parse level file path from arguments
- Game loop: render → input → update → check win → repeat
- Clean terminal between renders (clear screen)
- **Why important:** Professional CLI patterns and async input handling

### 6. Move Counter & Basic UI (Priority: 6/10)
- Track number of moves taken
- Display move count in UI
- Show controls/instructions
- **Why important:** User experience and persistent state tracking

### 7. Undo Functionality (Priority: 8/10)
- Press 'u' to undo last move
- Maintain move history stack
- Restore previous grid state including player and box positions
- **Why important:** Tests understanding of immutability, data structures (stack), and state management - key senior skill

### 8. Level File Loading & Validation (Priority: 7/10)
- Read level from text file
- Validate level format (exactly one player, at least one box/goal)
- Handle file not found errors gracefully
- **Why important:** File I/O, error handling, and data validation

## Priority 3: Nice to Have (Stretch Goals) - 5-15 minutes

### 9. Multiple Levels (Priority: 6/10)
- Load multiple level files
- Progress to next level on completion
- Level selection menu
- **Why nice to have:** Shows state management across sessions, but not core to grid logic

### 10. Optimal Solution Tracking (Priority: 5/10)
- Store/display par (optimal moves) for each level
- Compare player's moves to par
- **Why nice to have:** Nice UX touch, minimal complexity

### 11. Restart Current Level (Priority: 4/10)
- Press 'r' to reset current level to initial state
- **Why nice to have:** Simple feature, improves UX marginally

### 12. Better Terminal Rendering (Priority: 5/10)
- Colors using ANSI codes (walls gray, boxes brown, goals green)
- Box styling changes when on goal
- **Why nice to have:** Visual polish, teaches terminal manipulation, but not core logic

### 13. Move Validation Preview (Priority: 4/10)
- Highlight where box will move before committing
- Show invalid moves differently
- **Why nice to have:** Advanced UX, time-intensive for benefit

## Evaluation Weights:
- **Grid representation & state management:** 25%
- **Movement & pushing logic (core mechanics):** 30%
- **Code architecture & TypeScript usage:** 20%
- **Win detection & game loop:** 15%
- **Bonus features (undo, levels, UI):** 10%

## Time Breakdown Recommendation:
- **10 min:** TypeScript types, grid data structure, level parsing
- **10 min:** Basic movement & rendering
- **15 min:** Box pushing logic with all edge cases
- **5 min:** Win condition checking
- **10 min:** Command line parsing & file loading
- **5-10 min:** Undo system (high value!)
- **5 min:** Polish & error handling

## Key Technical Challenges to Showcase:

1. **Type Safety:** 
   - `type Cell = 'wall' | 'floor' | 'goal'`
   - `type Position = { x: number; y: number }`
   - Proper interfaces for GameState

2. **Immutability:**
   - Deep copy state for undo stack
   - Pure functions for move validation

3. **Algorithm Design:**
   - Efficient position checking
   - State comparison for win detection

4. **Debugging Complexity:**
   - Multi-object movement (player + box)
   - Stack trace through undo history
   - Edge case handling (corners, walls)

## Sample Level Format:
```
#####
#@$.#
#####
```

**Key Insight:** Nail the pushing logic with ALL edge cases and add undo - those two features demonstrate senior-level grid reasoning and state management more than any amount of UI polish or extra levels.