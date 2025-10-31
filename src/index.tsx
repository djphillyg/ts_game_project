#!/usr/bin/env node
import React from 'react';
import { render } from 'ink';
import { GameComponent } from './renderer/GameComponent';
import * as path from 'path';

/**
 * Main entry point for the Sokoban game
 *
 * TODO: Customize this to handle:
 * - Command line arguments for level selection
 * - Level menu to choose which level to play
 * - Error handling for missing levels
 */

// Default to level 1 for now
const levelPath = path.join(__dirname, 'levels', 'level_files', 'level1.txt');

// Render the game
render(<GameComponent levelPath={levelPath} />);
