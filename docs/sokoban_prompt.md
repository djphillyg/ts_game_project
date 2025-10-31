<goal>
-implment a complete version of sokoban, with tests and full functionality and display of competancy with typescript
</goal>

<timing>
Today - (assign me like 2-3 hours)
Monday 11/3 - 4hours
Tuesday 11/4 2 hours
Wednesday 11/5 3 hours
Thursday 10/14 4 hours
</timing>

<rubric>
# CLI Sokoban Game - Implementation Rubric

## Priority 1: Critical (Must Have) 

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
</rubric>


<structure>
For the structure of the 5 outputs
TAGLINE: [a line if this piece of code was from the real housewives, examples include "Eat drink, be Mary" (characters name is mary), "i am greek, the rest of them are a tragedy" - angie k, "the only thing im guilty of is being shah-mazing" - jen shah, who famously was arraigned on federal money laundering that season]
DAY: [silly name of the day that corresponds to the code objectives]
MOTIVATIONAL QUOTE: [a tiny quote in the style of jack kornfield buddhist psychology meant to ground me as I try to do something outside my comfort zone]
OBJECTIVES: [a list of 6 objectives for me to complete that day in the allotted timespan]
GIFT: [a tiny reward for myself for completing this certain days work, it can be a walk, meditation, somethng that is easy and accessible for me to feel good about]
READ: [a little dig at me as if i was a contestant on rupauls drag race but done in a loving way to motivate me on my studies. you neeed to be fearless and read me but be able to be encouraging and toe the line]
</structure>

<format>
Return back the format in a markdown artifact file.
</format>
