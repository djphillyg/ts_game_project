import * as fs from 'fs';
import { Cell, Position } from '../types/types';

/**
 * Represents a parsed level with all the data needed to initialize game state
 */
export interface ParsedLevel {
  grid: Cell[][];
  playerPos: Position;
  boxes: Set<string>;      // Using string keys like "x,y" for Set operations
  goals: Set<string>;
  levelName: string;
}

/**
 * Handles parsing of Sokoban level files from text format
 *
 * Expected format:
 * # = wall
 * @ = player
 * $ = box
 * . = goal
 * * = box on goal
 *   = floor (space)
 */
export class LevelParser {
  /**
   * Parse a level from a string containing the level layout
   */

  //maps level characters to the base cell type (terrain only, no entities)
  // entities are tracked separately in playerPos and boxes set
  private static readonly CHAR_TO_CELL: Record<string, Cell> = {
      '#': 'wall',
      ' ': 'floor',
      '_': 'floor',
      '.': 'goal',      // Empty goal spot
      '@': 'floor',     // Player starts on floor
      '+': 'goal',      // Player starts on goal
      '$': 'floor',     // Box starts on floor
      '*': 'goal',      // Box starts on goal   
  }

  static parseFromString(content: string, levelName: string = 'Unnamed Level'): ParsedLevel {
    const lines: string[] = content.trim().split('\n')
    // we will just assume that the width and height are set for valid levels
    const grid: Cell[][] = []
    const height: number = lines.length
    const width: number = lines[0].length
    let playerPos: Position | null = null
    const boxes = new Set<string>()
    const goals = new Set<string>()
    for (let y: number = 0; y < height; y+=1) {
      const row: Cell[] = []
      const rowToReadFrom: Array<string> = lines[y].split('')
      for (let x: number = 0; x < width; x+=1) {
        const char: string = rowToReadFrom[x]
        const cellType: Cell = this.CHAR_TO_CELL[char]
        if (!cellType) {
          throw new Error(`Invalid character ${char} at line ${y+1}, column ${x+1}`)
        }
        // check for a player
        if (char === '@' || char === '+') {
          playerPos = { x, y }
        }
        // check for a box
        if (char === '$' || char === '*') {
          boxes.add(`${x},${y}`)
        }
        // check for a goal
        if (char === '.' || char === '*' || char === '+') {
          goals.add(`${x},${y}`)
        }
        // since we mapped everything to terrain, add the terrain at the end
        row[x] = cellType
      }
      grid.push(row)
    }
    if (!playerPos) {
      throw new Error('No player exists in this level, improper level')
    }

    return {
      grid,
      playerPos,
      boxes,
      goals,
      levelName
    }
  }

  /**
   * Parse a level from a file
   */
  static parseFromFile(filename: string): ParsedLevel {
    const content = fs.readFileSync(filename, 'utf-8');
    const levelName = filename.split('/').pop()?.replace('.txt', '') || 'Unknown';
    return this.parseFromString(content, levelName);
  }
}
