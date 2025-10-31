import React, { useState, useEffect } from 'react';
import { Box, Text, useInput, useApp } from 'ink';
import { GameEngine, GameState } from '../core/GameEngine';
import { LevelParser } from '../levels/LevelParser';

interface GameComponentProps {
  levelPath: string;
}

/**
 * Main game component for rendering Sokoban in the terminal
 */
export const GameComponent: React.FC<GameComponentProps> = ({ levelPath }) => {
  const { exit } = useApp();
  const [engine, setEngine] = useState<GameEngine | null>(null);
  const [state, setState] = useState<GameState | null>(null);
  const [message, setMessage] = useState<string>('');

  // TODO: Initialize the game
  // 1. Load level from levelPath using LevelParser.parseFromFile()
  // 2. Create new GameEngine with parsed level
  // 3. Set engine and state
  // 4. Set initial message with controls
  useEffect(() => {
    // YOUR CODE HERE
  }, [levelPath]);

  // TODO: Handle keyboard input
  // 1. Check for 'q' or 'Q' to quit (use exit())
  // 2. Check for 'r' or 'R' to restart level
  // 3. Check for arrow keys (key.upArrow, key.downArrow, etc.)
  // 4. Call engine.move() with appropriate direction
  // 5. Update state after move
  // 6. Check if level is complete with engine.isLevelComplete()
  useInput((input, key) => {
    // YOUR CODE HERE
  });

  if (!state) {
    return <Text>Loading game...</Text>;
  }

  // TODO: Render the game UI
  // 1. Display level name
  // 2. Display move count
  // 3. Render the grid (call renderGrid helper)
  // 4. Display message/instructions
  return (
    <Box flexDirection="column" padding={1}>
      {/* YOUR CODE HERE */}
      <Text>Game UI goes here</Text>
    </Box>
  );
};

/**
 * TODO: Render the game grid with proper symbols
 *
 * For each cell in the grid, determine what to display:
 * - Player on goal: '+' (green)
 * - Player: '@' (green)
 * - Box on goal: '*' (magenta/purple)
 * - Box: '$' (yellow)
 * - Goal: '.' (blue)
 * - Wall: '#' (white)
 * - Floor: ' ' (space)
 *
 * Tips:
 * - Use state.grid to iterate rows and columns
 * - Check state.playerPos to find player position
 * - Use state.boxes.has(`${x},${y}`) to check for boxes
 * - Use state.goals.has(`${x},${y}`) to check for goals
 * - Return array of <Text> components for each row
 */
function renderGrid(state: GameState): React.ReactNode {
  // YOUR CODE HERE
  return <Text>Grid rendering goes here</Text>;
}
